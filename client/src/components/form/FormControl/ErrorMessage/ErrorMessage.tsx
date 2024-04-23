import classNames from 'classnames';

import Image from '@@components/ui/Image';

import ErrorShapeSvg from '@@assets/icons/error_shape.svg';

import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  name?: string;
  error?: string;
  size: 'medium' | 'large';
  className?: string;
}

function ErrorMessage(props: ErrorMessageProps) {
  const { name = '', error = '', size = 'medium', className = '' } = props;

  const errorClassName = classNames(
    styles.errorWrapper,
    styles[`errorWrapper_${size}`],
    className,
  );

  return (
    <div
      data-control-error={name}
      data-cid={`error-${name}`}
      className={errorClassName}
    >
      <Image image={ErrorShapeSvg} size={12} position="left_4" />
      {error}
    </div>
  );
}

export default ErrorMessage;
