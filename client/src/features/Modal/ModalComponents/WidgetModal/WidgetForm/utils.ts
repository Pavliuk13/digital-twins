import _omit from 'lodash/omit';

import { FIELD_NAME } from '../constants';

export const prepareUpdatePayload = (formData) => {
  return {
    ..._omit(formData, [FIELD_NAME.ID]),
    widgetId: formData.id,
  };
};
