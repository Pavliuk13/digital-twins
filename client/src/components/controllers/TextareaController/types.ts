import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

export interface TextareaControllerProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}
