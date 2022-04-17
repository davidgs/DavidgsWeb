---
title: "Using TLS to POST from ESP-32 to a Cloudflare service"
Date: 2022-04-08
Author: davidgs
Category: IoT, Misc, Work
Tags: IoT, ESP32, TLS
Slug: using-tls-to-post-from-esp32
hero: images/wasted.jpg
reading_time:
---

## Arduino HTTPClient Failure

I don't know if anyone else has ever tried this, but I just spent the better part of a week trying to debug this little problem, so I thought maybe I'd save someone some time.

I was trying to use `WiFiClientSecure` along with `HTTPClient` to `POST` to an authentication server that is fronted by cloudflare. No matter what I did, I got error messages. I was sending a JSON payload, and it kept telling me that the parameters weren't in the JSON. So I wrote my own mini server (using Golang, of course) to test against, and it was getting all the data correctly. Hmm...

The SREs in charge of the service were, oddly, *not* seeing any attempts by my device to connect to the service. Hmmmm ... So my Arduino was telling me it was connecting, but the data I was sending was wrong. My Go server was telling me the data was sent correctly, and the owners of the service were telling me I wasn't even connecting!

## Let's try OpenSSL ... Let's try anything!

So I wrote a straight-C OpenSSL client and it was able to connect to my server just fine, of course. But it was also able to connect, and authenticate, to the authentication server. Even more curious.

In a final fit of desperation, I dropped the `HTTPClient` part and just used the `WiFiClientSecure` to do writes, and lo and behold, Success!!

## A solution at last

So a couple of things to note if you want to try this:

When you run `openssl s_client -showcerts -connect HOST:PORT` to a cloudflare service, you will get back 2 certs. The first cert is cloudflare's cert. DO NOT USE THIS ONE. You want the *second* cert.

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

Then:

```cpp
    WiFiClientSecure *client = new WiFiClientSecure;
    if(client) {
      client->setCACert(C8SSLCA);
    }
```

to set the cert in the `WiFiClientSecure`

All the examples will have you then get a `HTTPClient` to do the work, but don't fall for it! The `HTTPClient` will somehow fail you.

Do this instead:

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

Basically, all you're doing here is doing the work of the `HTTPClient` since, at least as far as I can tell, it fails to do it's job in this instance.

I hope this saves someone else 4 days of frustration because there's 4 days of my life in it already.