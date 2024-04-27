export type ModalPosition = 'center' | 'right' | 'bottom';

export type ModalSize =
  | 'size_320'
  | 'size_480'
  | 'size_550'
  | 'size_680'
  | 'size_800'
  | 'size_925';

export interface SelectOption {
  label: string;
  value: string;
}

export interface TabOption {
  label: string;
  route: string;
}
