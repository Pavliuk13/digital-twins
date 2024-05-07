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
