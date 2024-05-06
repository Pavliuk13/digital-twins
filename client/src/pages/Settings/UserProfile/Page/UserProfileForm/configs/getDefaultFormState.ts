import { FIELD_NAMES } from '../constants';

export const getDefaultFormState = (user) => {
  return {
    [FIELD_NAMES.EMAIL]: user.email || '',
    [FIELD_NAMES.NAME]: user.name || '',
  };
};
