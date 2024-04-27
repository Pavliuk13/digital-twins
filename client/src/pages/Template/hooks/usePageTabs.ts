import { Template } from '@@types/template';

import { ROUTES } from '@@constants/routes';

export const usePageTabs = (id: Template['id']) => {
  return [
    {
      label: 'Home',
      route: `${ROUTES.TEMPLATES.INDEX}/${id}${ROUTES.TEMPLATES.HOME}`,
    },
    {
      label: 'Datastreams',
      route: `${ROUTES.TEMPLATES.INDEX}/${id}${ROUTES.TEMPLATES.DATASTREAMS}`,
    },
    {
      label: 'Dashboard',
      route: `${ROUTES.TEMPLATES.INDEX}/${id}${ROUTES.TEMPLATES.DASHBOARD}`,
    },
  ];
};
