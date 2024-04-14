import React, { memo, ReactNode } from 'react';
import classNames from 'classnames';

import { VARIANTS_MAP } from './constants';

import styles from './Typography.module.scss';

interface TypographyProps {
  variant?: 'h1' | 'body' | 'bodyBold';
  component?: keyof React.JSX.IntrinsicElements;
  children: ReactNode;
  color?: 'white_1000';
  bottomOffset?: 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24;
  block?: boolean;
  inline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  dataCid?: string;
}

function Typography(props: TypographyProps): React.JSX.Element {
  const {
    variant = 'body',
    component = null,
    children,
    color = 'grey_100',
    bottomOffset = 0,
    block = false,
    inline = false,
    className,
    style,
    dataCid,
  } = props;

  const Variant = component ?? VARIANTS_MAP[variant];

  return (
    <Variant
      className={classNames(
        className,
        styles.typography,
        styles[`typography_${variant}`],
        styles[`typography_color_${color}`],
        styles[`typography_bottomOffset_${bottomOffset}`],
        {
          [styles.typography_block]: block,
          [styles.typography_inline]: inline,
        },
      )}
      style={style}
      data-cid={dataCid}
    >
      {children}
    </Variant>
  );
}

export default memo(Typography);
