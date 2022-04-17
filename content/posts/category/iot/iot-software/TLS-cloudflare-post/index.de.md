---
title: „Verwenden von TLS zum POST von ESP-32 an einen Cloudflare-Dienst“
Date: 2022-04-08
Author: davidgs
Category: IoT, Misc, Work
Tags: IoT, ESP32, TLS
Slug: using-tls-to-post-from-esp32
hero: images/wasted.jpg
reading_time:
---

## Arduino HTTPClient-Fehler

Ich weiß nicht, ob jemand anderes das jemals versucht hat, aber ich habe gerade den größten Teil einer Woche damit verbracht, dieses kleine Problem zu debuggen, also dachte ich, vielleicht würde ich jemandem etwas Zeit sparen.

Ich habe versucht, „WiFiClientSecure“ zusammen mit „HTTPClient“ zu verwenden, um „POST“ an einen Authentifizierungsserver zu senden, dem Cloudflare gegenübersteht. Egal was ich tat, ich bekam Fehlermeldungen. Ich habe eine JSON-Nutzlast gesendet, und es wurde mir immer wieder mitgeteilt, dass die Parameter nicht in JSON enthalten sind. Also schrieb ich meinen eigenen Miniserver (natürlich mit Golang), um ihn zu testen, und er bekam alle Daten korrekt. Hmm...

Die für den Dienst verantwortlichen SREs sahen seltsamerweise *keine* Versuche meines Geräts, sich mit dem Dienst zu verbinden. Hmmmm ... Mein Arduino hat mir also gesagt, dass es eine Verbindung herstellt, aber die Daten, die ich gesendet habe, waren falsch. Mein Go-Server sagte mir, dass die Daten korrekt gesendet wurden, und die Besitzer des Dienstes sagten mir, dass ich nicht einmal eine Verbindung herstellte!

## Versuchen wir OpenSSL ... Versuchen wir alles!

Also habe ich einen Straight-C-OpenSSL-Client geschrieben, der sich natürlich problemlos mit meinem Server verbinden konnte. Aber es war auch in der Lage, sich mit dem Authentifizierungsserver zu verbinden und sich zu authentifizieren. Noch neugieriger.

In einem letzten Anfall von Verzweiflung ließ ich den `HTTPClient`-Teil fallen und benutzte einfach den `WiFiClientSecure`, um zu schreiben, und siehe da, Erfolg!!

## Endlich eine Lösung

Also ein paar Dinge, die Sie beachten sollten, wenn Sie dies versuchen möchten:

Wenn Sie „openssl s_client -showcerts -connect HOST:PORT“ zu einem Cloudflare-Dienst ausführen, erhalten Sie 2 Zertifikate zurück. Das erste Zertifikat ist das Zertifikat von Cloudflare. VERWENDEN SIE DIESEN NICHT. Sie wollen das *zweite* Zertifikat.

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

Dann:

```cpp
    WiFiClientSecure *client = new WiFiClientSecure;
    if(client) {
      client->setCACert(C8SSLCA);
    }
```

um das Zertifikat im `WiFiClientSecure` zu setzen

Bei allen Beispielen erhalten Sie dann einen `HTTPClient`, der die Arbeit erledigt, aber fallen Sie nicht darauf herein! Der `HTTPClient` wird Sie irgendwie im Stich lassen.

Tun Sie dies stattdessen:

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

Im Grunde erledigen Sie hier nur die Arbeit des `HTTPClient`, da er, zumindest soweit ich das beurteilen kann, in diesem Fall seine Aufgabe nicht erfüllt.

Ich hoffe, das erspart jemand anderem 4 Tage Frustration, denn es sind bereits 4 Tage meines Lebens darin.
