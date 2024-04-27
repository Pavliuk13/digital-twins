import { SelectOption } from '@@types/ui';

export interface SelectControllerProps {
  name: string;
  value: string;
  options: SelectOption[];
  error?: boolean;
  disabled?: boolean;
  classname?: string;
}
