import { Device } from '@@types/device';
import { Pin } from '@@types/pin';
import { Hardware } from '@@types/hardware';

export interface MqttTask {
  boardName: Hardware;
  pin: Pin;
  value: string | number | boolean;
  guid: Device['uGuid'];
}
