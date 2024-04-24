export const ERROR_MESSAGES = {
  required: 'The field cannot be empty',
  integer: 'Enter an integer value',
  email: 'Enter a valid email',
  maxSymbols: (value: number) =>
    `The value must be no more than ${value} symbols`,
};

export const REG_EXP = {
  EMAIL: /^[+\w\d.-]+@[a-zA-Z\d.-]+(\.[a-zA-Z\d.-]+)+?$/,
  PASSWORD: /^[a-zA-Z0-9`~!@#$%^&*()_\-+={}[\]|:;"'<>,.?/\\]+$/,
};
