export const prepareCreatePayload = (formData) => {
  return {
    ...formData,
  };
};

export const prepareUpdatePayload = (formData) => {
  return {
    ...formData,
    locationId: formData.id,
  };
};
