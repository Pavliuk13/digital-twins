export enum Hardware {
  Arduino,
  ESP32,
  ESP8266,
  Microduino,
  Raspberry,
}

export enum ConnectionType {
  Ethernet = '0',
  WiFi = '1',
  Satellite = '2',
  GSM = '3',
}

export interface Template {
  id: number;
  name: string;
  hardware: Hardware;
  connectionType: ConnectionType;
  description: string;
  organizationId: number;
  createdBy: number;
  // TODO
  datastreams: [];
  devices: [];
}
