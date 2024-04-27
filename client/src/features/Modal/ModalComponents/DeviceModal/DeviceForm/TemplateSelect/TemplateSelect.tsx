import { memo } from 'react';

import SelectController from '@@components/controllers/SelectController';

import { useTemplate } from './hooks';

interface TemplateSelectProps {
  name: string;
  disabled?: boolean;
}

function TemplateSelect(props: TemplateSelectProps) {
  const { name, ...restProps } = props;

  const options = useTemplate();

  return <SelectController name={name} options={options} {...restProps} />;
}

export default memo(TemplateSelect);
