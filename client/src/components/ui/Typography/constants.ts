import React from 'react';

export const VARIANTS_MAP: Record<string, keyof React.JSX.IntrinsicElements> = {
  h0: 'h1',
  h1: 'h1',
  h1Bold: 'h1',
  h2: 'h2',
  h2Bold: 'h2',
  h3: 'h3',
  subheading1: 'h6',
  subheading2: 'h6',
  label: 'label',
  body: 'p',
  bodyBold: 'p',
  bodyCompact: 'p',
  bodyCompactBold: 'p',
  caption: 'span',
  note: 'span',
};
