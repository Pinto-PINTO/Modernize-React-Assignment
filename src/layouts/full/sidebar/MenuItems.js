import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Sub Pages',
  },
  {
    id: uniqueId(),
    title: 'USA Population',
    icon: IconTypography,
    href: '/usa-population',
  },
  {
    id: uniqueId(),
    title: 'Fake Store',
    icon: IconAperture,
    href: '/fake-store',
  },
  {
    id: uniqueId(),
    title: 'Regions',
    icon: IconCopy,
    href: '/regions',
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Logout',
    icon: IconLogin,
    href: '/auth/login',
  },
];

export default Menuitems;
