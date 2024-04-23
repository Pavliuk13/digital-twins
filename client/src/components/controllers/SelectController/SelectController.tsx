import { memo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import _get from 'lodash/get';

import Select from '@@components/ui/Select';

import { SelectControllerProps } from './types';

function SelectController(props: SelectControllerProps) {
  const { name, ...restProps } = props;

  const {
    formState: { errors },
    control,
  } = useFormContext();

  const {
    field: { onChange },
  } = useController({
    name,
    control,
  });

  return (
    <Select
      name={name}
      error={!!_get(errors, name)}
      onChange={onChange}
      {...restProps}
    />
  );
}

export default memo(SelectController);
