---
title: "TLS gebruiken om te POST van ESP-32 naar een Cloudflare-service"
Date: 2022-04-08
Author: davidgs
Category: IoT, Misc, Work
Tags: IoT, ESP32, TLS
Slug: using-tls-to-post-from-esp32
hero: images/wasted.jpg
reading_time:
---

## Arduino HTTPClient-fout

Ik weet niet of iemand anders dit ooit heeft geprobeerd, maar ik heb het grootste deel van een week besteed aan het oplossen van dit kleine probleem, dus ik dacht dat ik misschien iemand wat tijd kon besparen.

Ik probeerde `WiFiClientSecure` samen met `HTTPClient` te gebruiken voor `POST` naar een authenticatieserver die wordt geleid door cloudflare. Wat ik ook deed, ik kreeg foutmeldingen. Ik stuurde een JSON-payload en hij bleef me vertellen dat de parameters niet in de JSON stonden. Dus ik schreef mijn eigen miniserver (uiteraard met Golang) om tegen te testen, en het kreeg alle gegevens correct. Hm...

De SRE's die verantwoordelijk waren voor de service, zagen * vreemd genoeg * geen pogingen van mijn apparaat om verbinding te maken met de service. Hmmmm ... Dus mijn Arduino vertelde me dat hij verbinding aan het maken was, maar de gegevens die ik aan het verzenden was, waren verkeerd. Mijn Go-server vertelde me dat de gegevens correct waren verzonden en de eigenaren van de service vertelden me dat ik niet eens verbinding maakte!

## Laten we OpenSSL proberen ... Laten we alles proberen!

Dus ik schreef een straight-C OpenSSL-client en die kon natuurlijk prima verbinding maken met mijn server. Maar het was ook in staat om verbinding te maken en te authenticeren met de authenticatieserver. Nog nieuwsgieriger.

In een laatste vlaag van wanhoop liet ik het 'HTTPClient'-gedeelte vallen en gebruikte gewoon de 'WiFiClientSecure' om te schrijven, en zie, succes!!

## Eindelijk een oplossing

Dus een paar dingen om op te letten als je dit wilt proberen:

Als je `openssl s_client -showcerts -connect HOST:PORT` uitvoert naar een cloudflare-service, krijg je 2 certificaten terug. Het eerste certificaat is het certificaat van cloudflare. GEBRUIK DEZE NIET. U wilt het *tweede* certificaat.

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

Dan:

```cpp
    WiFiClientSecure *client = new WiFiClientSecure;
    if(client) {
      client->setCACert(C8SSLCA);
    }
```

om het certificaat in de `WiFiClientSecure` . in te stellen

Alle voorbeelden zorgen ervoor dat je een `HTTPClient` krijgt om het werk te doen, maar trap er niet in! De `HTTPClient` zal je op de een of andere manier in de steek laten.

Doe dit in plaats daarvan:

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

Kortom, alles wat je hier doet, is het werk van de `HTTPClient` doen, want, voor zover ik weet, doet het in dit geval zijn werk niet.

Ik hoop dat dit iemand anders 4 dagen frustratie bespaart want er zitten al 4 dagen van mijn leven in.
