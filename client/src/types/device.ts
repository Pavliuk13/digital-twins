import { User } from '@@types/user';
import { Hardware } from '@@types/hardware';

export interface Device {
  id: number;
  uGuid: string;
  templateId: number;
  template: {
    id: number;
    hardware: Hardware;
    name: string;
  };
  user: User;
  name: string;
  createdBy: User['id'];
  status: number;
}

export interface CreateDeviceArgs {
  name: Device['name'];
  templateId: number;
  userId: User['id'];
}
