export interface LabelProps {
  htmlFor: string;
  label: string;
  isRequired?: boolean;
  isNoWrap?: boolean;
  bold?: boolean;
  forCheckbox?: boolean;
  withBottomMargin?: boolean;
  wrapperClassName?: string;
  className?: string;
  disabled?: boolean;
  isInlineRow?: boolean;
  size: 'medium' | 'large';
}
