import { memo, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'outline';
  color: 'blue_500' | 'grey_200' | 'red_500';
  fullWidth?: boolean;
}

function Button(props: ButtonProps) {
  const {
    size = 'small',
    variant = 'primary',
    color = 'blue_500',
    fullWidth = false,
    disabled,
    className,
    children,
    ...restProps
  } = props;

  const buttonClassName = classNames(
    styles.root,
    styles[`size_${size}`],
    styles[`variant_${variant}_${color}`],
    className,
    {
      [styles.fullWidth]: fullWidth,
    },
  );

  return (
    <button disabled={disabled} className={buttonClassName} {...restProps}>
      {children}
    </button>
  );
}

export default memo(Button);
