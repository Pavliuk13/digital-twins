import { useMemo } from 'react';

import { Hardware } from '@@types/template';

export const useHardwareImage = (hardware: Hardware) => {
  const hardwareImage = useMemo(() => {
    return {
      [Hardware.Arduino]: '/src/assets/images/arduino_uno.png',
      [Hardware.Microduino]: '/src/assets/images/arduino_uno.png',
      [Hardware.ESP32]: '/src/assets/images/node_mcu.png',
      [Hardware.ESP8266]: '/src/assets/images/node_mcu.png',
      [Hardware.Raspberry]: '/src/assets/images/raspberry_pi_4.png',
    };
  }, []);

  return hardwareImage[hardware];
};
