import { SelectOption } from '@@types/ui';

export interface SelectProps {
  name: string;
  value: string;
  options: SelectOption[];
  error?: boolean;
  disabled?: boolean;
  classname?: string;
}
