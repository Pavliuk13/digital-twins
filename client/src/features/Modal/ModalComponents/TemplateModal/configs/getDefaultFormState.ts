import { ConnectionType, Template } from '@@types/template';

import { FIELD_NAME } from '../constants';

export const getDefaultFormState = (data?: Template) => {
  return {
    ...(data?.id && { [FIELD_NAME.ID]: data?.id }),
    [FIELD_NAME.NAME]: data?.[FIELD_NAME.NAME] || '',
    [FIELD_NAME.HARDWARE]: data?.[FIELD_NAME.HARDWARE] || '',
    [FIELD_NAME.CONNECTION_TYPE]: ConnectionType.WiFi,
    [FIELD_NAME.DESCRIPTION]: data?.[FIELD_NAME.DESCRIPTION] || '',
  };
};
