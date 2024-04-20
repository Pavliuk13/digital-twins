import { useMemo } from 'react';

import Image from '@@components/ui/Image';

import SmartLabSvg from '@@assets/icons/smart_lab.svg';
import SquaresFilledSvg from '@@assets/icons/squares_filled.svg';
import DevicesSvg from '@@assets/icons/devices.svg';
import UsersSvg from '@@assets/icons/users.svg';
import UserCircleSvg from '@@assets/icons/user_circle.svg';
import LogoutSvg from '@@assets/icons/logout.svg';
import TemplateSvg from '@@assets/icons/template.svg';

import { ROUTES } from '@@constants/routes';

import { MENU_GROUP } from './constants';

export const useMenu = () => {
  return useMemo(() => {
    return {
      [MENU_GROUP.DEVELOP]: [
        {
          title: 'Templates',
          icon: () => <Image image={TemplateSvg} size={16} fill="grey_200" />,
          route: ROUTES.TEMPLATES,
        },
      ],

      [MENU_GROUP.GENERAL]: [
        {
          title: 'Locations',
          icon: () => <Image image={SmartLabSvg} size={16} />,
          route: ROUTES.LOCATIONS,
        },
        {
          title: 'Organizations',
          icon: () => <Image image={SquaresFilledSvg} size={16} />,
          route: ROUTES.ORGANIZATIONS,
        },
        {
          title: 'Devices',
          icon: () => <Image image={DevicesSvg} size={16} />,
          route: ROUTES.DEVICES,
        },
        {
          title: 'Members',
          icon: () => <Image image={UsersSvg} size={16} />,
          route: ROUTES.MEMBERS,
        },
      ],

      [MENU_GROUP.SETTINGS]: [
        {
          title: 'Profile & Settings',
          icon: () => <Image image={UserCircleSvg} size={16} />,
          route: ROUTES.SETTINGS.PROFILE,
        },
        {
          title: 'Log out',
          icon: () => <Image image={LogoutSvg} size={16} />,
        },
      ],
    };
  });
};
