export const prepareCreatePayload = (formData) => {
  return {
    ...formData,
    organizationId: 2,
    userId: 2,
  };
};

export const prepareUpdatePayload = (formData) => {
  return {
    ...formData,
    locationId: formData.id,
  };
};
