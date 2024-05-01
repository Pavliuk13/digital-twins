import { Device } from '@@types/device';
import { Widget } from '@@types/widget';

export interface Data {
  device: Device;
  deviceWidgets: Widget[];
}
