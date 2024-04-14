import React from 'react';

declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;

  const src: string;
  export default src;
}

declare global {
  type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;
}
