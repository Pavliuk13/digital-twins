export const ROUTES = {
  INDEX: '/',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  ACCEPT_INVITATION: '/accept-invitation',
  TEMPLATES: {
    INDEX: '/templates',
    HOME_ROUTE: '/templates/:templateId/home',
    HOME: '/home',
    DATASTREAMS_ROUTE: '/templates/:templateId/datastreams',
    DATASTREAMS: '/datastreams',
    DASHBOARD_ROUTE: '/templates/:templateId/dashboard',
    DASHBOARD: '/dashboard',
  },
  LOCATIONS: '/locations',
  DEVICES: '/devices',
  DEVICE: '/devices/:deviceId',
  MEMBERS: '/members',
  SETTINGS: {
    PROFILE: '/settings/profile',
    CHANGE_PASSWORD: '/settings/change-password',
  },
  NOT_FOUND: '/*',
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
  ROUTES.ACCEPT_INVITATION,
];
