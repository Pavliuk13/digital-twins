import { ReactNode } from 'react';
import classNames from 'classnames';
import _isNil from 'lodash/isNil';
import _get from 'lodash/get';

import Typography from '@@components/ui/Typography';

import { DISPLAY_NAME } from '@@constants/displayNames';

import Label from './Label';
import ErrorMessage from './ErrorMessage';

import { LabelProps } from './Label/types.ts';

import styles from './FormControl.module.scss';

interface FormControlProps {
  children: ReactNode;
  errors?: Record<string, unknown>;
  labelProps?: LabelProps;
  name: string;
  description?: string;
  size: 'medium' | 'large';
  className?: string;
  classNameContent?: string;
  errorClassName: string;
  forCheckbox?: boolean;
  withoutBottomMargin?: boolean;
  isInlineRow?: boolean;
  isFullWidth?: boolean;
  isVisible?: boolean;
}

function FormControl(props: FormControlProps) {
  const {
    children,
    size = 'medium',
    labelProps = {},
    errors = {},
    name,
    description,
    className = '',
    classNameContent = '',
    errorClassName = '',
    forCheckbox,
    withoutBottomMargin,
    isVisible = true,
    isFullWidth,
    isInlineRow,
  } = props;

  const isControlForCheckbox = !isInlineRow && forCheckbox;

  const error = _get(errors, `${name}.message`);

  const info = (
    <>
      {error && (
        <ErrorMessage
          error={error}
          name={name}
          className={errorClassName}
          size={size}
        />
      )}

      {description && (
        <Typography variant="description" color="grey_600">
          {description}
        </Typography>
      )}
    </>
  );

  return (
    <div
      data-control-name={name}
      className={classNames(className, styles.formControl, {
        [styles[`formControl_${size}`]]: size,
        [styles.withoutBottomMargin]: withoutBottomMargin,
        [styles.isFullWidth]: isFullWidth,
        [styles.isHidden]: !isVisible,
        [styles.forCheckbox]: forCheckbox,
      })}
    >
      <div
        className={classNames(styles.control, {
          [styles.isInlineRow]: isInlineRow,
          [styles.forCheckbox]: isControlForCheckbox,
        })}
      >
        {labelProps && (
          <Label
            isInlineRow={isInlineRow}
            size={size}
            forCheckbox={isControlForCheckbox}
            {...labelProps}
          />
        )}

        <div
          className={classNames(styles.field, {
            [styles.field_isInlineRow]: isInlineRow,
            [styles.field_forCheckbox]: isControlForCheckbox,
            [styles[`field_forCheckbox_${size}`]]: labelProps.withBottomMargin,
          })}
        >
          {!_isNil(children) && (
            <div className={classNames(classNameContent, styles.field)}>
              {children}
            </div>
          )}

          {isInlineRow && info}
        </div>
      </div>

      {!isInlineRow && info}
    </div>
  );
}

FormControl.displayName = DISPLAY_NAME.FORM_CONTROL;

export default FormControl;
