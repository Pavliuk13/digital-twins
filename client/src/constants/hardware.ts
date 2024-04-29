import { Hardware } from '@@types/hardware';

export const HARDWARE_IMAGE = {
  [Hardware.Arduino]: '/src/assets/images/arduino_uno.png',
  [Hardware.Microduino]: '/src/assets/images/arduino_uno.png',
  [Hardware.ESP32]: '/src/assets/images/node_mcu.png',
  [Hardware.ESP8266]: '/src/assets/images/node_mcu.png',
  [Hardware.Raspberry]: '/src/assets/images/raspberry_pi_4.png',
};

export const EXAMPLE_ARDUINO_CODE = `
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
`;