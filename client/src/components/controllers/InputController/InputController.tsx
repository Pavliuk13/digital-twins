import { memo, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import _get from 'lodash/get';

import Input from '@@components/ui/Input';

export interface InputControllerProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

function InputController(props: InputControllerProps) {
  const { name, type = 'text', ...restProps } = props;

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
    <Input
      name={name}
      type={type}
      value={value}
      error={!!_get(errors, name)}
      onChange={onChange}
      {...restProps}
    />
  );
}

export default memo(InputController);
