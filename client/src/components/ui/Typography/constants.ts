import React from 'react';

export const VARIANTS_MAP: Record<string, keyof React.JSX.IntrinsicElements> = {
  h1: 'h1',
  subheading1: 'h6',
  subheading2: 'h6',
  body: 'p',
  bodyRegular: 'p',
  bodyBold: 'p',
  note: 'span',
  description: 'span',
};
