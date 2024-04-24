import classNames from 'classnames';

import styles from './Spinner.module.scss';

interface SpinnerProps {
  size: 'small' | 'medium' | 'big';
  color: 'blue_500';
  top?: number;
  left?: number;
  withoutMargin?: boolean;
}

function Spinner(props: SpinnerProps) {
  const {
    top,
    left,
    size = 'small',
    color = 'blue_500',
    withoutMargin = false,
  } = props;

  const spinnerClassName = classNames(styles.spinner, {
    [styles[`spinner_size_${size}`]]: size,
    [styles[`spinner_color_${color}`]]: color,
    [styles.spinner_withoutMargin]: withoutMargin,
  });

  const loaderStyles = {
    style: {
      ...(top && { top: `${top}px` }),
      ...(left && { left: `${left}px` }),
    },
  };

  return (
    <div className={styles.wrapper} {...loaderStyles}>
      <div data-cid="spinner" className={spinnerClassName} />
    </div>
  );
}

export default Spinner;
