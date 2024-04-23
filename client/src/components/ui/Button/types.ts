import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'outline';
  color: 'blue_500' | 'grey_200';
  fullWidth?: boolean;
}
