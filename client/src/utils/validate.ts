export const ERROR_MESSAGES = {
  required: 'The field cannot be empty',
  integer: 'Enter an integer value',
  email: 'Enter a valid email',
  password:
    'Password can contain at least 6 characters: Latin letters (A-Z), special characters and digits (0-9)',
  maxSymbols: (value: number) => {
    return `The value must be no more than ${value} symbols`;
  },
  minSymbols: (value: number) => {
    return `The value must be more than ${value} symbols`;
  },
};

export const REG_EXP = {
  EMAIL: /^[+\w\d.-]+@[a-zA-Z\d.-]+(\.[a-zA-Z\d.-]+)+?$/,
  PASSWORD: /^[a-zA-Z0-9`~!@#$%^&*()_\-+={}[\]|:;"'<>,.?/\\]+$/,
};
