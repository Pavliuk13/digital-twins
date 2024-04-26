import { useParams } from 'react-router-dom';

import { useGetTemplateQuery } from '@@api/templates';

export const useTemplate = () => {
  const { templateId } = useParams();

  const {
    refetch,
    data: template,
    isLoading,
  } = useGetTemplateQuery({
    params: { id: templateId },
  });

  return { template, isLoading, refetch };
};
