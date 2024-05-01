import * as yup from 'yup';

import { ERROR_MESSAGES, REG_EXP } from '@@utils/validate';

import { FIELD_NAMES } from './constants';

export const schema = yup.object().shape({
  [FIELD_NAMES.NEW_PASSWORD]: yup
    .string()
    .trim()
    .min(6, ERROR_MESSAGES.minSymbols(6))
    .max(256, ERROR_MESSAGES.maxSymbols(256))
    .matches(REG_EXP.PASSWORD, ERROR_MESSAGES.password)
    .required(ERROR_MESSAGES.required),
  [FIELD_NAMES.REPEAT_NEW_PASSWORD]: yup
    .string()
    .trim()
    .required(ERROR_MESSAGES.required)
    .oneOf([yup.ref(FIELD_NAMES.NEW_PASSWORD)], 'Your passwords do not match.'),
});
