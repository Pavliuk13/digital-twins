import { memo, useRef, useState } from 'react';
import classNames from 'classnames';

import { useClickOutside } from '@@hooks/common/useClickOutside';

import Input from '@@components/ui/Input';
import Image from '@@components/ui/Image';

import ChevronSvg from '@@assets/icons/chevron.svg';

import { SelectOption, SelectProps } from './types';

import { NOT_SELETED } from './constants';

import styles from './Select.module.scss';

function Select(props: SelectProps) {
  const {
    options = [],
    error = false,
    disabled = false,
    className = '',
    onChange,
  } = props;

  const selectRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption>(NOT_SELETED);

  const selectOptions = [NOT_SELETED, ...options];

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClick = () => {
    toggle();
  };

  useClickOutside(selectRef, () => {
    if (isOpen) {
      toggle();
    }
  });

  const selectClassName = classNames(styles.select, className);

  const chevronClassName = classNames(styles.select__chevron, {
    [styles.select__chevron_open]: isOpen,
  });

  const listClassName = classNames(styles.list, {
    [styles.list_open]: isOpen,
  });

  return (
    <div ref={selectRef} className={selectClassName}>
      <Image image={ChevronSvg} className={chevronClassName} />
      <Input
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
