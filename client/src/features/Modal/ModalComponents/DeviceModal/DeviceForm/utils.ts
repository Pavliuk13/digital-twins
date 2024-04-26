export const prepareCreatePayload = (formData) => {
  return { ...formData, userId: 2 };
};

export const prepareUpdatePayload = (formData) => {
  return { deviceId: formData.id, name: formData.name };
};
