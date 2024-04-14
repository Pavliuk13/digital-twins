import React, { memo, forwardRef, SVGProps } from 'react';
import classNames from 'classnames';

import { SvgComponent } from '@@types/declaration';

import styles from './Image.module.scss';

export type ImagePositions =
  | 'left_2'
  | 'left_4'
  | 'left_8'
  | 'left_10'
  | 'left_12'
  | 'left_16'
  | 'right_2'
  | 'right_4'
  | 'right_8'
  | 'right_12'
  | 'right_16';

export type ImageSize =
  | 6
  | 8
  | 10
  | 12
  | 14
  | 16
  | 20
  | 24
  | 26
  | 28
  | 32
  | 36
  | 48;

export interface ImageProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  size?: ImageSize;
  fill?: 'white_1000' | 'blue_500' | 'currentColor';
  className?: string;
  dataCid?: string | null;
  position?: ImagePositions;
  image?: SvgComponent | null;
  cursor?: 'default' | 'pointer' | 'not-allowed' | 'wait';
}

const ImageWithRef = forwardRef<SVGSVGElement, ImageProps>(
  function Image(props, ref): React.JSX.Element | null {
    const {
      image,
      className,
      fill,
      dataCid = null,
      position,
      size,
      cursor = 'default',
      ...svgProps
    } = props;

    const Component = image;

    if (!Component) {
      return null;
    }

    const imageCls = classNames(styles.image, className, {
      [styles[`image_size_${size}`]]: size,
      [styles[`image_fill_${fill}`]]: fill,
      [styles[`image_position_${position}`]]: position,
      [styles[`image_cursor_${cursor}`]]: cursor,
    });

    return (
      <Component
        ref={ref}
        className={imageCls}
        data-cid={dataCid}
        {...svgProps}
      />
    );
  },
);

export default memo(ImageWithRef);
