import { useMemo } from 'react';

import Image from '@@components/ui/Image';

import SmartLabSvg from '@@assets/icons/smart_lab.svg';
import SquaresFilledSvg from '@@assets/icons/squares_filled.svg';
import DevicesSvg from '@@assets/icons/devices.svg';
import UsersSvg from '@@assets/icons/users.svg';
import UserCircleSvg from '@@assets/icons/user_circle.svg';
import LogoutSvg from '@@assets/icons/logout.svg';

import { ROUTES } from '@@constants/routes';

import { MENU_GROUP } from './constants';

export const useMenu = () => {
  return useMemo(() => {
    return {
      [MENU_GROUP.general]: [
        {
          title: 'Locations',
          icon: () => <Image image={SmartLabSvg} size={16} />,
          group: MENU_GROUP.general,
          route: ROUTES.LOCATIONS,
        },
        {
          title: 'Organizations',
          icon: () => <Image image={SquaresFilledSvg} size={16} />,
          group: MENU_GROUP.general,
          route: ROUTES.ORGANIZATIONS,
        },
        {
          title: 'Devices',
          icon: () => <Image image={DevicesSvg} size={16} />,
          group: MENU_GROUP.general,
          route: ROUTES.DEVICES,
        },
        {
          title: 'Members',
          icon: () => <Image image={UsersSvg} size={16} />,
          group: MENU_GROUP.general,
          route: ROUTES.MEMBERS,
        },
      ],

      [MENU_GROUP.settings]: [
        {
          title: 'Profile & Settings',
          icon: () => <Image image={UserCircleSvg} size={16} />,
          group: MENU_GROUP.settings,
          route: ROUTES.SETTINGS.PROFILE,
        },
        {
          title: 'Log out',
          icon: () => <Image image={LogoutSvg} size={16} />,
          group: MENU_GROUP.settings,
        },
      ],
    };
  });
};
