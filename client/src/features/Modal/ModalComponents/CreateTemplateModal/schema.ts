import * as yup from 'yup';

import { ERROR_MESSAGES } from '@@utils/validate';

import { FIELD_NAME } from './constants';

export const schema = yup.object().shape({
  [FIELD_NAME.NAME]: yup
    .string()
    .trim()
    .max(256, ERROR_MESSAGES.maxSymbols(256))
    .required(ERROR_MESSAGES.required),
  [FIELD_NAME.HARDWARE]: yup.string().required(ERROR_MESSAGES.required),
});
