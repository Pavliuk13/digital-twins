import classNames from 'classnames';

import { LabelProps } from './types';

import styles from './Label.module.scss';

function Label(props: LabelProps) {
  const {
    htmlFor,
    label,
    isRequired,
    isNoWrap,
    bold,
    forCheckbox,
    withBottomMargin,
    wrapperClassName = '',
    className = '',
    disabled,
    isInlineRow,
    size = 'medium',
  } = props;

  const labelClassName = classNames(styles.label, className, {
    [styles.required]: isRequired,
    [styles.disabled]: disabled,
    [styles.bold]: bold,
    [styles.noWrap]: isNoWrap,
    [styles.forCheckbox]: forCheckbox,
    [styles[`label_${size}`]]: size,
    [styles.marginRight]: isInlineRow,
  });

  const labelWrapperClassName = classNames(
    styles.labelWrapper,
    wrapperClassName,
    {
      [styles[`withBottomMargin_${size}`]]: withBottomMargin,
    },
  );

  if (!label) {
    return null;
  }

  return (
    <div className={labelWrapperClassName}>
      <label className={labelClassName} htmlFor={htmlFor}>
        {label}
      </label>
    </div>
  );
}

export default Label;
