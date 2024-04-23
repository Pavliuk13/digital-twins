export type SelectOption = {
  label: string;
  value: string;
};

export interface SelectProps {
  options: SelectOption[];
  error?: boolean;
  disabled?: boolean;
  classname?: string;
}
