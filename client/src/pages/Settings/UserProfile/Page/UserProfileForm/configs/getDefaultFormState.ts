import { FIELD_NAMES } from '../constants';

export const getDefaultFormState = () => {
  return {
    [FIELD_NAMES.EMAIL]: '',
    [FIELD_NAMES.PASSWORD]: '',
  };
};
