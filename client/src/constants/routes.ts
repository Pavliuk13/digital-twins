export const ROUTES = {
  INDEX: '/',
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
  ORGANIZATIONS: '/organizations',
  DEVICES: '/devices',
  MEMBERS: '/members',
  SETTINGS: { PROFILE: '/settings/profile' },
  NOT_FOUND: '/*',
} as const;
