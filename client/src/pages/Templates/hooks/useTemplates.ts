import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';

import { useGetUserTemplatesQuery } from '@@api/templates';

import { CreateTemplateModalName } from '@@constants/modal';

export const useTemplates = () => {
  const {
    refetch,
    data: templates,
    isLoading,
  } = useGetUserTemplatesQuery({
    params: { id: 2 },
  });

  const dispatch = useDispatch();

  const handleAddTemplate = () => {
    dispatch(
      showModal(CreateTemplateModalName, {
        onSubmit: () => {
          refetch();
        },
      }),
    );
  };

  return { templates, isLoading, onAddTemplate: handleAddTemplate };
};
