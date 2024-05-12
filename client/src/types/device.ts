import { User } from '@@types/user';
import { Hardware } from '@@types/hardware';

export enum Status {
  off,
  on,
}

export interface Device {
  id: number;
  uGuid: string;
  topicName: string;
  azureDigitalTwinUrl: string;
  templateId: number;
  template: {
    id: number;
    hardware: Hardware;
    name: string;
  };
  user: User;
  name: string;
  createdBy: User['id'];
  status: Status;
}

export interface CreateDeviceArgs {
  name: Device['name'];
  templateId: number;
  userId: User['id'];
}

export interface DeviceStatLog {
  id: number;
  statsTime: string;
  uptime: number;
  heapUsage: number;
  rssi: number;
  deviceId: Device['id'];
}

export interface DeviceErrorLog {
  id: number;
  name: string;
  description: string;
  dateTime: string;
  deviceId: Device['id'];
}
