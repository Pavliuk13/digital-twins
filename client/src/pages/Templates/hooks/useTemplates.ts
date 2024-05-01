import { useGetUserTemplatesQuery } from '@@api/templates';

export const useTemplates = () => {
  const { refetch, data: templates, isLoading } = useGetUserTemplatesQuery();

  return { templates, isLoading, refetch };
};
