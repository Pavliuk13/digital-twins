import { Location } from '@@types/locations';

import { FIELD_NAME } from '../constants';

export const getDefaultFormState = (data: Location = {}) => {
  return {
    ...(data?.id && { [FIELD_NAME.ID]: data?.id }),
    [FIELD_NAME.NAME]: data?.[FIELD_NAME.NAME] || '',
    [FIELD_NAME.ADDRESS]: data?.[FIELD_NAME.ADDRESS] || '',
    [FIELD_NAME.ZIP]: data?.[FIELD_NAME.ZIP] || '',
    [FIELD_NAME.STATE]: data?.[FIELD_NAME.STATE] || '',
    [FIELD_NAME.CITY]: data?.[FIELD_NAME.CITY] || '',
    [FIELD_NAME.COUNTRY]: data?.[FIELD_NAME.COUNTRY] || '',
  };
};
