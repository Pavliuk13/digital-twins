import { FIELD_NAMES } from '../constants';

export const getDefaultFormState = () => {
  return {
    [FIELD_NAMES.NEW_PASSWORD]: '',
    [FIELD_NAMES.REPEAT_NEW_PASSWORD]: '',
  };
};
