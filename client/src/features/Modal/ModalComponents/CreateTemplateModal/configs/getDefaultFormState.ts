import { ConnectionType } from '@@types/template';

import { CONNECTION_TYPE, FIELD_NAME } from '../constants';

export const getDefaultFormState = () => {
  return {
    [FIELD_NAME.NAME]: '',
    [FIELD_NAME.HARDWARE]: '',
    [FIELD_NAME.CONNECTION_TYPE]: CONNECTION_TYPE[ConnectionType.WiFi],
    [FIELD_NAME.DESCRIPTION]: '',
  };
};
