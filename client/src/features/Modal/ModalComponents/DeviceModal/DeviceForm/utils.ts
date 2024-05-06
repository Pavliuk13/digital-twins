export const prepareCreatePayload = (formData) => {
  return { ...formData };
};

export const prepareUpdatePayload = (formData) => {
  return {
    deviceId: formData.id,
    name: formData.name,
    azureDigitalTwinUrl: formData.azureDigitalTwinUrl,
  };
};
