import { ConnectionType } from '@@types/template';

export const preparePayload = (formData) => {
  return { ...formData, connectionType: ConnectionType.WiFi, userId: 2 };
};
