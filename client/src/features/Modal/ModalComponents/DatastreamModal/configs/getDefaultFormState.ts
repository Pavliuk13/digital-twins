import { Template } from '@@types/template';
import { PinMode } from '@@types/pin';

import { FIELD_NAME } from '../constants';

interface Options {
  templateId?: Template['id'];
}

export const getDefaultFormState = (data: Template = {}, options: Options) => {
  const { templateId } = options;

  return {
    ...(data?.id && { [FIELD_NAME.ID]: data?.id }),
    [FIELD_NAME.NAME]: data?.[FIELD_NAME.NAME] || '',
    [FIELD_NAME.ALIAS]: data?.[FIELD_NAME.ALIAS] || '',
    [FIELD_NAME.PIN]: data?.[FIELD_NAME.PIN] || '',
    [FIELD_NAME.PIN_MODE]: data?.[FIELD_NAME.PIN_MODE] || PinMode.Input,
    [FIELD_NAME.TEMPLATE_ID]:
      data?.[FIELD_NAME.TEMPLATE_ID] || templateId || '',
  };
};
