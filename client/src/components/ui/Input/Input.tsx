import { memo } from 'react';
import classNames from 'classnames';

import { InputProps } from './types';

import styles from './Input.module.scss';

function Input(props: InputProps) {
  const { error = false, className, ...restProps } = props;

  const inputClassName = classNames(styles.input, className, {
    [styles.input_error]: error,
  });

  return <input className={inputClassName} {...restProps} />;
}

export default memo(Input);
