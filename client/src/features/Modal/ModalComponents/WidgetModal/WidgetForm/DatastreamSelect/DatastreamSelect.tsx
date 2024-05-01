import { memo } from 'react';

import SelectController from '@@components/controllers/SelectController';

import { Template } from '@@types/template';

import { useDatastream } from './hooks';

interface DatastreamSelectProps {
  name: string;
  templateId: Template['id'];
}

function DatastreamSelect(props: DatastreamSelectProps) {
  const { name, templateId, ...restProps } = props;

  const options = useDatastream(templateId);

  return <SelectController name={name} options={options} {...restProps} />;
}

export default memo(DatastreamSelect);
