import { useMemo } from 'react';

import { Pin } from '@@types/pin';

export const usePin = () => {
  return useMemo(() => {
    return [
      {
        label: 'P0',
        value: Pin.P0,
      },
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
        label: 'P14',
        value: Pin.P14,
      },
      {
        label: 'P15',
        value: Pin.P15,
      },
      {
        label: 'P13',
        value: Pin.P13,
      },
      {
        label: 'P16',
        value: Pin.P16,
      },
      {
        label: 'P17',
        value: Pin.P17,
      },
      {
        label: 'P18',
        value: Pin.P18,
      },
      {
        label: 'P19',
        value: Pin.P19,
      },
      {
        label: 'P20',
        value: Pin.P21,
      },
      {
        label: 'P21',
        value: Pin.P21,
      },
      {
        label: 'P22',
        value: Pin.P22,
      },
      {
        label: 'P23',
        value: Pin.P23,
      },
      {
        label: 'P24',
        value: Pin.P24,
      },
      {
        label: 'P25',
        value: Pin.P25,
      },
      {
        label: 'P26',
        value: Pin.P26,
      },
      {
        label: 'P27',
        value: Pin.P27,
      },
      {
        label: 'P28',
        value: Pin.P28,
      },
      {
        label: 'P29',
        value: Pin.P29,
      },
      {
        label: 'P30',
        value: Pin.P30,
      },
      {
        label: 'P31',
        value: Pin.P31,
      },
      {
        label: 'P32',
        value: Pin.P32,
      },
      {
        label: 'P33',
        value: Pin.P33,
      },
    ];
  }, []);
};
