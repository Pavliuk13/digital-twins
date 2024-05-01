# Digital Twins
A diploma work for Kyiv Politechnic Institute

# Backend
Requirements: **.NET 6 SDK**

Commands for migrations using CLI:
1. Create migration:
```
dotnet ef migrations add {MigrationName} --project DigitalTwins.DAL --startup-project DigitalTwins.API
```
2. Update database:
```
dotnet ef database update --project DigitalTwins.DAL --startup-project DigitalTwins.API
```
# Database
 RDBMS: **Microsoft SQL Server**
 
 Connection string for local database:
```
  "ConnectionStrings": {
    "DigitalTwinDBConnection": "Server=(localdb)\\MSSQLLocalDB;Database=DigitalTwinDB;Trusted_Connection=True;"
  }
```

Scheme: https://drawsql.app/teams/bsa2021/diagrams/digital-twin

# MQTT

This project is using MQTT protocol and EMQX as message broker.
Docker command for downloading EMQX broker:
1. Pull exqx:
```
docker pull emqx/emqx
```
2. Run exqx:
```
docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx
```

Sample of code for Arduino project using subscribtion to MQTT topic:
```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

const char* ssid = "yourSSID";
const char* password = "yourPASSWORD";
const char* mqttServer = "mqttBrokerAddress";
const int mqttPort = 1883;
const char* mqttTopic = "yourTopic";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
    Serial.begin(9600);
    setup_wifi();
    client.setServer(mqttServer, mqttPort);
    client.setCallback(callback);

    while (!client.connected()) {
        Serial.println("Connecting to MQTT Broker...");
        if (client.connect("ESP32Client")) {
            Serial.println("Connected");
        } else {
            Serial.print("Failed with state ");
            Serial.print(client.state());
            delay(2000);
        }
    }

    client.subscribe(mqttTopic);
}

void setup_wifi() {
    delay(10);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
}

void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);

    Serial.print("Message:");
    for (int i = 0; i < length; i++) {
        Serial.print((char)payload[i]);
    }
    Serial.println();

    DynamicJsonDocument doc(1024);
    deserializeJson(doc, payload, length);
    int pin = doc["Pin"];
    bool value = doc["Value"];
    String guid = doc["Guid"].as<String>();

    pinMode(pin, OUTPUT);
    digitalWrite(pin, value ? HIGH : LOW);

    Serial.println("Pin: " + String(pin) + " Value: " + value);
}

void loop() {
    client.loop();
}
```

# Frontend

Commands to run the client using the CLI:
1. Install all dependencies:
```
yarn install
```
2. Run client:
```
yarn dev
```


## Authors

- [Vasyl Pavliuk](https://github.com/Pavliuk13)
- [Vitalii Kovalov](https://github.com/KovalovV)

