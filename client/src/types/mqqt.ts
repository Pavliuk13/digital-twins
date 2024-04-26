import { Device } from '@@types/device';
import { Pin } from '@@types/pin';
import { Datastream } from '@@types/datastream';

export interface MqqtTask {
  boardName: Datastream['alias'];
  pin: Pin;
  value: string | number | boolean;
  guid: Device['uGuid'];
}
