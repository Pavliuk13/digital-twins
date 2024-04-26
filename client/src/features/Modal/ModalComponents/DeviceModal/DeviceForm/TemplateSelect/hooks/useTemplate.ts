import { useGetUserTemplatesQuery } from '@@api/templates';

export const useTemplate = () => {
  const { data: templates } = useGetUserTemplatesQuery({
    params: { id: 2 },
  });

  if (!templates) {
    return [];
  }

  return templates.map((template) => ({
    label: template.name,
    value: template.id,
  }));
};
