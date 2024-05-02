import { ConnectionType } from '@@types/template';

export const prepareCreatePayload = (formData) => {
  return { ...formData, connectionType: ConnectionType.WiFi };
};

export const prepareUpdatePayload = (formData) => {
  return {
    ...formData,
    templateId: formData.id,
    connectionType: ConnectionType.WiFi,
  };
};
