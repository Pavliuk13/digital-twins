import { useMemo } from 'react';

import { useGetDatastreamsQuery } from '@@api/datastreams';

import { Template } from '@@types/template';

export const useDatastream = (templateId: Template['id']) => {
  const { data = [] } = useGetDatastreamsQuery({ params: { templateId } });

  return useMemo(() => {
    return data.map((datastream) => ({
      label: datastream.name,
      value: datastream.id,
    }));
  }, [data]);
};
