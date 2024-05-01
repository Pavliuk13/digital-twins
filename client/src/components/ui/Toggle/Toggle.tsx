import { memo, useState } from 'react';
import classNames from 'classnames';

import styles from './Toggle.module.scss';

interface ToggleProps {
  name: string;
  value: boolean;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (value: boolean) => void;
}

function Toggle(props: ToggleProps) {
  const {
    name,
    value = false,
    error,
    disabled,
    className = '',
    onChange,
  } = props;

  const [isChecked, setIsChecked] = useState(value);

  const toggleClassName = classNames(styles.toggle, className, {
    [styles.toggle_error]: error,
  });

  const handleChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
    onChange?.(!isChecked);
  };

  return (
    <label htmlFor={name} className={toggleClassName}>
      <input
        id={name}
        name={name}
        type="checkbox"
        value={isChecked}
        disabled={disabled}
        onChange={handleChange}
      />
      <div className={styles.slider} />
    </label>
  );
}

export default memo(Toggle);
