import { ConnectionType } from '@@types/template';

export const FIELD_NAME = {
  ID: 'id',
  NAME: 'name',
  TEMPLATE_ID: 'templateId',
} as const;

export const CONNECTION_TYPE = {
  [ConnectionType.WiFi]: 'WiFi',
};
