import { ConnectionType } from '@@types/template';

export const FIELD_NAME = {
  ID: 'id',
  NAME: 'name',
  TEMPLATE_ID: 'templateId',
  AZURE_DIGITAL_TWIN_URL: 'azureDigitalTwinUrl',
} as const;

export const CONNECTION_TYPE = {
  [ConnectionType.WiFi]: 'WiFi',
};
