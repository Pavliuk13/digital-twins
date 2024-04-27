export const prepareUpdatePayload = (formData) => {
  return {
    ...formData,
    datastreamId: formData.id,
  };
};
