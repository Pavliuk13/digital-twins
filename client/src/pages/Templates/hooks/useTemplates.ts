export const useTemplates = () => {
  const handleAddTemplate = () => {
    console.log('addTemplate');
  };

  return { templates: [], onAddTemplate: handleAddTemplate };
};
