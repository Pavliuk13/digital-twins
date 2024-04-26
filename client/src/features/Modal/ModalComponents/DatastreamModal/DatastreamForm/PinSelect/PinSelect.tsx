import { memo } from 'react';

import SelectController from '@@components/controllers/SelectController';

import { usePin } from './hooks';

interface PinSelectProps {
  name: string;
}

function PinSelect(props: PinSelectProps) {
  const { name, ...restProps } = props;

  const options = usePin();

  return <SelectController name={name} options={options} {...restProps} />;
}

export default memo(PinSelect);
