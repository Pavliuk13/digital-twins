import { memo, DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Textarea.module.scss';

export interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: boolean;
}

function Textarea(props: TextareaProps) {
  const { error = false, className, ...restProps } = props;

  const textareaClassName = classNames(styles.textarea, className, {
    [styles.textarea_error]: error,
  });

  return <textarea className={textareaClassName} {...restProps} />;
}

export default memo(Textarea);
