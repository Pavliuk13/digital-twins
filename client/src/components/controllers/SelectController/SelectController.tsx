import { memo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import _get from 'lodash/get';

import Select from '@@components/ui/Select';

import { SelectOption } from '@@types/ui';

export interface SelectControllerProps {
  name: string;
  value: string;
  options: SelectOption[];
  error?: boolean;
  disabled?: boolean;
  classname?: string;
}

function SelectController(props: SelectControllerProps) {
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
    <Select
      name={name}
      value={value}
      error={!!_get(errors, name)}
      onChange={onChange}
      {...restProps}
    />
  );
}

export default memo(SelectController);
