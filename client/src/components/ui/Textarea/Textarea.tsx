import { memo } from 'react';
import classNames from 'classnames';

import { TextareaProps } from './types';

import styles from './Textarea.module.scss';

function Textarea(props: TextareaProps) {
  const { error = false, className, ...restProps } = props;

  const textareaClassName = classNames(styles.textarea, className, {
    [styles.textarea_error]: error,
  });

  return <textarea className={textareaClassName} {...restProps} />;
}

export default memo(Textarea);
