import { ROUTES } from '@@constants/routes';

export const usePageTabs = () => {
  return [
    {
      label: 'User profile',
      route: ROUTES.SETTINGS.PROFILE,
    },
    {
      label: 'Change password',
      route: ROUTES.SETTINGS.CHANGE_PASSWORD,
    },
  ];
};
