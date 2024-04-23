import { ConnectionType } from '@@types/template';

export const FIELD_NAME = {
  NAME: 'name',
  HARDWARE: 'hardware',
  CONNECTION_TYPE: 'connectionType',
  DESCRIPTION: 'description',
} as const;

export const CONNECTION_TYPE = {
  [ConnectionType.WiFi]: 'WiFi',
};
