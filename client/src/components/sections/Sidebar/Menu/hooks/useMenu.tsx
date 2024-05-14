import { useMemo } from 'react';

import api from '@@api/rtk';
import { doSignOut } from '@@api/auth';

import { useDispatch } from '@@store/index';

import Image from '@@components/ui/Image';

import SmartLabSvg from '@@assets/icons/smart_lab.svg';
import DevicesSvg from '@@assets/icons/devices.svg';
import UsersSvg from '@@assets/icons/users.svg';
import UserCircleSvg from '@@assets/icons/user_circle.svg';
import LogoutSvg from '@@assets/icons/logout.svg';
import TemplateSvg from '@@assets/icons/template.svg';

import { ROUTES } from '@@constants/routes';

import { MENU_GROUP } from './constants';

export const useMenu = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return {
      [MENU_GROUP.DEVELOP]: [
        {
          title: 'Templates',
          icon: () => <Image image={TemplateSvg} size={16} fill="grey_200" />,
          route: ROUTES.TEMPLATES.INDEX,
        },
      ],

      [MENU_GROUP.GENERAL]: [
        {
          title: 'Devices',
          icon: () => <Image image={DevicesSvg} size={16} />,
          route: ROUTES.DEVICES,
        },
        {
          title: 'Locations',
          icon: () => <Image image={SmartLabSvg} size={16} />,
          route: ROUTES.LOCATIONS,
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
          onClick: async () => {
            dispatch(api.util.resetApiState());
            await doSignOut();
            window.location.reload();
          },
        },
      ],
    };
  });
};
