import { useMemo } from 'react';

import { Hardware } from '@@types/template';

export const useHardware = () => {
  return useMemo(() => {
    return [
      {
        label: 'Arduino',
        value: Hardware.Arduino,
      },
      {
        label: 'ESP32',
        value: Hardware.ESP32,
      },
      {
        label: 'ESP8266',
        value: Hardware.ESP8266,
      },
      {
        label: 'Microduino',
        value: Hardware.Microduino,
      },
      {
        label: 'Raspberry',
        value: Hardware.Raspberry,
      },
    ];
  }, []);
};
