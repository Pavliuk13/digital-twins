import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
}
