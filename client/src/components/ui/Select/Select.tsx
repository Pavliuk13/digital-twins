import { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { useClickOutside } from '@@hooks/common/useClickOutside';

import Input from '@@components/ui/Input';
import Image from '@@components/ui/Image';

import ChevronSvg from '@@assets/icons/chevron.svg';

import { SelectOption } from '@@types/ui';

import { NOT_SELECTED } from './constants';

import styles from './Select.module.scss';

export interface SelectProps {
  name: string;
  value: string;
  options: SelectOption[];
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

function Select(props: SelectProps) {
  const {
    name,
    value,
    options = [],
    error = false,
    disabled = false,
    className = '',
    onChange,
  } = props;

  const selectRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption>(NOT_SELECTED);

  const selectOptions = [NOT_SELECTED, ...options];

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClick = () => {
    toggle();
  };

  const selectClassName = classNames(styles.select, className);

  const chevronClassName = classNames(styles.select__chevron, {
    [styles.select__chevron_open]: isOpen,
  });

  const listClassName = classNames(styles.list, {
    [styles.list_open]: isOpen,
  });

  useEffect(() => {
    if (value && options.length) {
      setSelected(options.find((option) => option.value === value));
    }
  }, [options]);

  useClickOutside(selectRef, () => {
    if (isOpen) {
      toggle();
    }
  });

  return (
    <div ref={selectRef} className={selectClassName}>
      <Image image={ChevronSvg} className={chevronClassName} />
      <Input
        name={name}
        readOnly
        disabled={disabled}
        error={error}
        value={selected.label}
        onClick={handleClick}
      />

      <div className={listClassName}>
        {selectOptions.map((option) => {
          const handleOptionClick = () => {
            setSelected(option);
            onChange(option.value);
            toggle();
          };

          return (
            <div
              key={option.value}
              onClick={handleOptionClick}
              className={styles.list__option}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Select);
