import { FIELD_NAME } from '../constants';

export const getDefaultFormState = () => {
  return {
    [FIELD_NAME.NAME]: '',
    [FIELD_NAME.EMAIL]: '',
  };
};
