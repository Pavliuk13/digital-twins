import { memo, DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import _get from 'lodash/get';

import Textarea from '@@components/ui/Textarea';

export interface TextareaControllerProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

function TextareaController(props: TextareaControllerProps) {
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
    <Textarea
      name={name}
      value={value}
      error={!!_get(errors, name)}
      onChange={onChange}
      {...restProps}
    />
  );
}

export default memo(TextareaController);
