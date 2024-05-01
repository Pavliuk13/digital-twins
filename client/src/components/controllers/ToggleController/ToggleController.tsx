import { memo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import _get from 'lodash/get';

import Toggle from '@@components/ui/Toggle';

export interface ToggleControllerProps {
  name: string;
  value: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

function ToggleController(props: ToggleControllerProps) {
  const { name, ...restProps } = props;

  const {
    formState: { errors },
    control,
  } = useFormContext();

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <Toggle
      name={name}
      value={value}
      error={!!_get(errors, name)}
      onChange={onChange}
      {...restProps}
    />
  );
}

export default memo(ToggleController);
