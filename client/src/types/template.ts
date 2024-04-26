import { Device } from '@@types/device';
import { Hardware } from '@@types/hardware';
import { Datastream } from '@@types/datastream';

export enum ConnectionType {
  Ethernet = 'Ethernet',
  WiFi = 'WiFi',
  Satellite = 'Satellite',
  GSM = 'GSM',
}

export interface Template {
  id: number;
  name: string;
  hardware: Hardware;
  connectionType: ConnectionType;
  description: string;
  organizationId: number;
  createdBy: number;
  datastreams: Datastream[];
  devices: Device[];
}
