import { useMemo } from 'react';

import { Pin } from '@@types/pin';

export const usePin = () => {
  return useMemo(() => {
    return [
      {
        label: 'P1',
        value: Pin.P1,
      },
      {
        label: 'P2',
        value: Pin.P2,
      },
      {
        label: 'P3',
        value: Pin.P3,
      },
      {
        label: 'P4',
        value: Pin.P4,
      },
      {
        label: 'P5',
        value: Pin.P5,
      },
      {
        label: 'P6',
        value: Pin.P6,
      },
      {
        label: 'P7',
        value: Pin.P7,
      },
      {
        label: 'P8',
        value: Pin.P8,
      },
      {
        label: 'P9',
        value: Pin.P9,
      },
      {
        label: 'P10',
        value: Pin.P10,
      },
      {
        label: 'P11',
        value: Pin.P11,
      },
      {
        label: 'P12',
        value: Pin.P12,
      },

      {
        label: 'P13',
        value: Pin.P13,
      },
      {
        label: 'A0',
        value: Pin.A0,
      },
      {
        label: 'A0',
        value: Pin.A0,
      },
      {
        label: 'A1',
        value: Pin.A1,
      },
      {
        label: 'A2',
        value: Pin.A2,
      },
      {
        label: 'A3',
        value: Pin.A3,
      },
      {
        label: 'A4',
        value: Pin.A4,
      },
    ];
  }, []);
};
