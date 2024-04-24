import { memo } from 'react';
import classNames from 'classnames';

import { ButtonProps } from './types';

import styles from './Button.module.scss';

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
