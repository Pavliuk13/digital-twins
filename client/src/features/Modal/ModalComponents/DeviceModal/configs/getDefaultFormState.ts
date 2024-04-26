import { Device } from '@@types/device';
import { Template } from '@@types/template';

import { FIELD_NAME } from '../constants';

interface Options {
  templateId?: Template['id'];
}

export const getDefaultFormState = (data?: Device, options: Options) => {
  const { templateId } = options;

  return {
    ...(data?.id && { [FIELD_NAME.ID]: data?.id }),
    [FIELD_NAME.NAME]: data?.name || '',
    [FIELD_NAME.TEMPLATE_ID]:
      data?.[FIELD_NAME.TEMPLATE_ID] || templateId || '',
  };
};
