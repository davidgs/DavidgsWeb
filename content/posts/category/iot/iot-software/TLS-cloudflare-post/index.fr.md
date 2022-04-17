---
title: "Utilisation de TLS pour POSTer d'ESP-32 vers un service Cloudflare"
Date: 2022-04-08
Author: davidgs
Category: IoT, Misc, Work
Tags: IoT, ESP32, TLS
Slug: using-tls-to-post-from-esp32
hero: images/wasted.jpg
reading_time:
---

## Échec du client HTTP Arduino

Je ne sais pas si quelqu'un d'autre a déjà essayé cela, mais je viens de passer la majeure partie d'une semaine à essayer de déboguer ce petit problème, alors j'ai pensé que je ferais peut-être gagner du temps à quelqu'un.

J'essayais d'utiliser `WiFiClientSecure` avec `HTTPClient` pour `POST` sur un serveur d'authentification dirigé par cloudflare. Peu importe ce que j'ai fait, j'ai eu des messages d'erreur. J'envoyais une charge utile JSON, et il n'arrêtait pas de me dire que les paramètres n'étaient pas dans le JSON. J'ai donc écrit mon propre mini serveur (en utilisant Golang, bien sûr) pour tester, et il obtenait toutes les données correctement. Hmm...

Curieusement, les SRE en charge du service ne voyaient *aucune* tentative de connexion de mon appareil au service. Hmmmm ... Donc, mon Arduino me disait qu'il se connectait, mais les données que j'envoyais étaient fausses. Mon serveur Go me disait que les données étaient correctement envoyées et les propriétaires du service me disaient que je ne me connectais même pas !

## Essayons OpenSSL... Essayons n'importe quoi !

J'ai donc écrit un client OpenSSL en C et il a pu se connecter à mon serveur très bien, bien sûr. Mais il a également pu se connecter et s'authentifier auprès du serveur d'authentification. Encore plus curieux.

Dans un dernier accès de désespoir, j'ai laissé tomber la partie `HTTPClient` et j'ai juste utilisé le `WiFiClientSecure` pour faire des écritures, et voilà, succès !!

## Enfin une solution

Donc, quelques points à noter si vous voulez essayer ceci :

Lorsque vous exécutez `openssl s_client -showcerts -connect HOST:PORT` sur un service cloudflare, vous récupérez 2 certificats. Le premier certificat est le certificat de cloudflare. NE PAS UTILISER CELUI-CI. Vous voulez le *deuxième* certificat.

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

Puis:

```cpp
    WiFiClientSecure *client = new WiFiClientSecure;
    if(client) {
      client->setCACert(C8SSLCA);
    }
```

pour définir le certificat dans le `WiFiClientSecure`

Tous les exemples vous feront alors obtenir un `HTTPClient` pour faire le travail, mais ne tombez pas dans le panneau ! Le `HTTPClient` vous échouera d'une manière ou d'une autre.

Faites ceci à la place :

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

Fondamentalement, tout ce que vous faites ici est de faire le travail du `HTTPClient` puisque, du moins pour autant que je sache, il ne parvient pas à faire son travail dans ce cas.

J'espère que cela évitera à quelqu'un d'autre 4 jours de frustration car il y a déjà 4 jours de ma vie.
