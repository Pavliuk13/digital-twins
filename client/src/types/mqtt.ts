import { Device } from '@@types/device';
import { Widget } from '@@types/widget';

export interface MqttTask {
  deviceId: Device['id'];
  widgetId: Widget['id'];
  value: string | number | boolean;
}
