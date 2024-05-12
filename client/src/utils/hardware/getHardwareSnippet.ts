export const getHardwareSnippet = ({ topic }) => {
  return `
  #include <WiFi.h>
  #include <PubSubClient.h>
  #include <ArduinoJson.h>
  
  // credentials for Wi-fi
  const char* ssid = "yourSsid";
  const char* password = "yourPassword";
  // port and address of mqtt broker
  const char* mqttServer = "broker.emqx.io";
  const int mqttPort = 1883;
  // topic name
  const char* mqttTopic = "${topic}";
  // device status topic name
  const char* statusTopic = "device/status";
  // topic for sending statistic
  const char* statsTopic = "device/stats";
  // topic for sending error logs
  const char* errorsTopic = "device/errors";
  // unique indentifier
  const char* guid = "yourDeviceGuid";
  // credentials for broker
  const char *mqtt_username = "emqx";
  const char *mqtt_password = "public";
  
  
  unsigned long lastMsg = 0;
  int lightSwitchCount = 0;
  
  WiFiClient espClient;
  PubSubClient client(espClient);
  
  enum Status {
      Online,
      Offline
  };
  
  void sendErrorLog(const String& errorMessage, const String& errorDescription) {
      DynamicJsonDocument doc(512);
      doc["Id"] = guid;
      doc["Error"] = errorMessage;
      doc["Description"] = errorDescription;
  
      char buffer[512];
      serializeJson(doc, buffer);
  
      client.publish(errorsTopic, buffer);
  }
  
  
  void sendStatus(Status status) {
      DynamicJsonDocument doc(256);
      doc["Id"] = guid;
      doc["Status"] = status;
  
      char buffer[256];
      serializeJson(doc, buffer);
  
      client.publish(statusTopic, buffer);
  }
  
  void setup_wifi() {
      delay(10);
      WiFi.begin(ssid, password);
      unsigned long startAttemptTime = millis();
  
      while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000) {
          delay(500);
          Serial.print(".");
      }
  
      if (WiFi.status() != WL_CONNECTED) {
          sendErrorLog("WiFi Connection Failed", "Could not connect to WiFi within 10 seconds");
      } else {
          Serial.println("WiFi connected");
      }
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
      DeserializationError error = deserializeJson(doc, payload, length);
      if (error) {
          sendErrorLog("JSON Parsing Error", "Failed to parse incoming message: " + String(error.c_str()));
          return;
      }
  
      if (!doc.containsKey("Pin") || !doc.containsKey("Value")) {
          sendErrorLog("JSON content error", "Missing required values: Pin, Value");
          return;
      }
  
      int pin = doc["Pin"];
      bool value = doc["Value"];
  
      if (value) {
          lightSwitchCount++;
      }
  
      pinMode(pin, OUTPUT);
      digitalWrite(pin, value ? HIGH : LOW);
  
      Serial.println("Pin: " + String(pin) + " Value: " + value);
  }
  
  void setup() {
      Serial.begin(9600);
      setup_wifi();
  
      client.setServer(mqttServer, mqttPort);
      client.setCallback(callback);
  
      String client_id = "digital-twins";
  
      while (!client.connected()) {
          Serial.println("Connecting to MQTT Broker...");
          if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
              Serial.println("Connected");
              sendStatus(Status::Online);
          } else {
              sendErrorLog("MQTT Connection Failed", "Failed to connect to MQTT Broker with state " + String(client.state()));
              delay(2000);
          }
      }
  
      client.subscribe(mqttTopic);
  }
  
  void loop() {
      client.loop();
  
      unsigned long now = millis();
      if (now - lastMsg > 60000) {
          lastMsg = now;
  
          float heapUsed = ESP.getHeapSize() - ESP.getFreeHeap();
          float heapUsage = (heapUsed / ESP.getHeapSize()) * 100;
          float uptime = millis() / 1000.0;
          int rssi = WiFi.RSSI();
  
          DynamicJsonDocument doc(1024);
          doc["Id"] = guid;
          doc["Uptime"] = uptime;
          doc["HeapUsage"] = heapUsage;
          doc["Rssi"] = rssi;
          doc["LightSwitchCount"] = lightSwitchCount;
          lightSwitchCount = 0;
  
          char jsonBuffer[512];
          serializeJson(doc, jsonBuffer);
  
          client.publish(statsTopic, jsonBuffer);
      }
  }
    `;
};
