---
title: "Uso de TLS para POST desde ESP-32 a un servicio de Cloudflare"
Date: 2022-04-08
Author: davidgs
Category: IoT, Misc, Work
Tags: IoT, ESP32, TLS
Slug: using-tls-to-post-from-esp32
hero: images/wasted.jpg
reading_time:
---

## Fallo del cliente HTTP de Arduino

No sé si alguien más ha intentado esto alguna vez, pero pasé la mayor parte de una semana tratando de depurar este pequeño problema, así que pensé que tal vez le ahorraría tiempo a alguien.

Estaba tratando de usar `WiFiClientSecure` junto con `HTTPClient` para `POST` en un servidor de autenticación que está al frente de cloudflare. No importa lo que hice, recibí mensajes de error. Estaba enviando una carga JSON y seguía diciéndome que los parámetros no estaban en el JSON. Así que escribí mi propio mini servidor (usando Golang, por supuesto) para probar, y estaba obteniendo todos los datos correctamente. Mmm...

Curiosamente, los SRE a cargo del servicio *no* vieron ningún intento de mi dispositivo de conectarse al servicio. Hmmmm... Así que mi Arduino me decía que se estaba conectando, pero los datos que estaba enviando eran incorrectos. ¡Mi servidor Go me decía que los datos se habían enviado correctamente y los propietarios del servicio me decían que ni siquiera me estaba conectando!

## Probemos OpenSSL... ¡Probemos cualquier cosa!

Así que escribí un cliente OpenSSL de C directo y, por supuesto, pude conectarme a mi servidor sin problemas. Pero también pudo conectarse y autenticarse en el servidor de autenticación. Aún más curioso.

En un ataque final de desesperación, dejé caer la parte 'HTTPClient' y simplemente usé 'WiFiClientSecure' para escribir, y he aquí, ¡¡Éxito!!

## Por fin una solución

Entonces, un par de cosas a tener en cuenta si quieres probar esto:

Cuando ejecuta `openssl s_client -showcerts -connect HOST:PORT` a un servicio de cloudflare, obtendrá 2 certificados. El primer certificado es el certificado de cloudflare. NO UTILICE ESTE. Quiere el *segundo* certificado.

```cpp
    const char C8SSLCA[] PROGMEM =  R"EOF(
    ------BEGIN CERTIFICATE-----
    MIIDzTCCArWgAwIBAgIQCjeHZF5ftIwiTv0b7RQMPDANBgkqhkiG9w0BAQsFADBa
    MQswCQYDVQQGEwJJRTESMBAGA1UEChMJQmFsdGltb3JlMRMwEQYDVQQLEwpDeWJl
    clRydXN0MSIwIAYDVQQDExlCYWx0aW1vcmUgQ3liZXJUcnVzdCBSb290MB4XDTIw
    ...
    goE6y/SJXQ7vTQ1unBuCJN0yJV0ReFEQPaA1IwQvZW+cwdFD19Ae8zFnWSfda9J1
    CZMRJCQUzym+5iPDuI9yP+kHyCREU3qzuWFloUwOxkgAyXVjBYdwRVKD05WdRerw
    6DEdfgkfCv4+3ao8XnTSrLE=
    -----END CERTIFICATE-----
    )EOF";
```

Entonces:

```cpp
    WiFiClientSecure *client = new WiFiClientSecure;
    if(client) {
      client->setCACert(C8SSLCA);
    }
```

para establecer el certificado en `WiFiClientSecure`

Todos los ejemplos harán que obtenga un 'HTTPClient' para hacer el trabajo, ¡pero no se deje engañar! El `HTTPClient` de alguna manera te fallará.

Haz esto en su lugar:

```cpp
    Serial.print("[HTTP] POST...\n");
    client->connect("host.com", PORT);
    int tries = 0;
    while (!client->connected()) {
        Serial.printf("*** Can't connect. ***\n-------\n");
        delay(500);
        Serial.print(".");
        client->connect("host.com", PORT);
        tries++;
        if(tries > 10){
            return;
        }
    }
    Serial.printf("Connected!\n-------\n");
    client->print("POST /oauth/token HTTP/1.0\r\n"); // or whatever your path is
    client->print("Host: host.com\r\n"); // this must match the host you used in connect()
    client->print("User-Agent: ESP8266\r\n"); // or make up your own
    client->print("Content-Length: ");
    client->print(pBuff.length());
    client->print("\r\n");
    client->print("Content-Type: application/json\r\n");
    client->print("Accept-encoding: *\r\n");
    client->print("\r\n");
    client->print(pBuff); // this is a String
    uint32_t to = millis() + 10000;
    if (client->connected()) {
        Serial.println("Reading response ...");
        do { // wait until there is data
            int avail = client->available();
            if(avail > 0){
                break;
            }
            Serial.print(".");
            delay(500);
         } while (millis() < to); // but not forever
        Serial.println();
        to = millis() + 5000;
        do {
            char tmp[512]; // you might need more
            memset(tmp, 0, 512);
            int rlen = client->read((uint8_t*)tmp, sizeof(tmp) - 1);
            if (rlen < 0) {
                break; // we've reached the end
            }
            Serial.print(tmp);
        } while (millis() < to);
        Serial.println("Finished reading");
    }
    client->stop();
    Serial.printf("\nDone!\n-------\n\n");
```

Básicamente, todo lo que está haciendo aquí es hacer el trabajo del 'HTTPClient' ya que, al menos hasta donde puedo decir, falla en hacer su trabajo en este caso.

Espero que esto le ahorre a alguien más 4 días de frustración porque ya son 4 días de mi vida.
