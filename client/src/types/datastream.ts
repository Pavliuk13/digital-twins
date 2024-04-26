import { PinMode, Pin } from '@@types/pin';

export interface Datastream {
  id: number;
  name: string;
  alias: string;
  pin: Pin;
  pinMode: PinMode;
  templateId: number;
}
