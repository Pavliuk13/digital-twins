import { useParams } from 'react-router-dom';

import { useGetTemplateWidgetsQuery } from '@@api/widgets';

export const useTemplateWidgets = () => {
  const { templateId } = useParams();

  const {
    refetch,
    data: templateWidgets,
    isLoading,
  } = useGetTemplateWidgetsQuery({
    params: { templateId },
  });

  return { templateWidgets, isLoading, refetch };
};
