import * as yup from 'yup';

import { ERROR_MESSAGES, REG_EXP } from '@@utils/validate';

import { FIELD_NAMES } from './constants';

export const schema = yup.object().shape({
  [FIELD_NAMES.EMAIL]: yup
    .string()
    .trim()
    .max(256, ERROR_MESSAGES.maxSymbols(256))
    .matches(REG_EXP.EMAIL, ERROR_MESSAGES.email)
    .required(ERROR_MESSAGES.required),
  [FIELD_NAMES.NAME]: yup
    .string()
    .trim()
    .max(256, ERROR_MESSAGES.maxSymbols(256))
    .required(ERROR_MESSAGES.required),
});
