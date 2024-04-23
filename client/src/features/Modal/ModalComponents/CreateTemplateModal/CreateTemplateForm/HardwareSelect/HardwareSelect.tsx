import { memo } from 'react';

import SelectController from '@@components/controllers/SelectController';

import { useHardware } from './hooks';

interface HardwareSelectProps {}

function HardwareSelect(props: HardwareSelectProps) {
  const { name, ...restProps } = props;

  const options = useHardware();

  return <SelectController name={name} options={options} {...restProps} />;
}

export default memo(HardwareSelect);
