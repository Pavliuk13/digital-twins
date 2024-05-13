import { FIELD_NAMES } from '../constants';

export const getDefaultFormState = (data) => {
  return {
    [FIELD_NAMES.EMAIL]: data?.[FIELD_NAMES.EMAIL] || '',
    [FIELD_NAMES.NAME]: data?.[FIELD_NAMES.NAME] || '',
    [FIELD_NAMES.PASSWORD]: '',
  };
};
