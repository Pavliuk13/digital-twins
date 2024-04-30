import { useGetUserTemplatesQuery } from '@@api/templates';

export const useTemplates = () => {
  const {
    refetch,
    data: templates,
    isLoading,
  } = useGetUserTemplatesQuery(
    { params: { id: 2 } },
    { refetchOnMountOrArgChange: true },
  );

  return { templates, isLoading, refetch };
};
