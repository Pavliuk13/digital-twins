import { memo, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: boolean;
}

function Input(props: InputProps) {
  const { error = false, className, ...restProps } = props;

  const inputClassName = classNames(styles.input, className, {
    [styles.input_error]: error,
  });

  return <input className={inputClassName} {...restProps} />;
}

export default memo(Input);
