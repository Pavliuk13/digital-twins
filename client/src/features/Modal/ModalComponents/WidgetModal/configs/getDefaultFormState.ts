import { Widget } from '@@types/widget';

import { FIELD_NAME } from '../constants';

export const getDefaultFormState = (data: Widget = {}) => {
  return {
    ...(data?.id && { [FIELD_NAME.ID]: data?.id }),
    [FIELD_NAME.TITLE]: data?.[FIELD_NAME.TITLE] || '',
    [FIELD_NAME.DATASTREAM_ID]: data?.[FIELD_NAME.DATASTREAM_ID] || '',
  };
};
