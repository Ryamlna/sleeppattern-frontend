import { DashboardIcon, RecapIcon, BookIcon, SettingsIcon } from './Icons';

// Daftar menu yang dipakai bersama oleh Sidebar (desktop) dan MobileNav (HP)
export const NAV_ITEMS = [
  { key: 'dashboard', to: '/dashboard', labelKey: 'nav.dashboard', Icon: DashboardIcon },
  { key: 'recap', to: '/recap', labelKey: 'nav.recap', Icon: RecapIcon },
  { key: 'edukasi', to: '/edukasi', labelKey: 'nav.education', Icon: BookIcon },
  { key: 'pengaturan', to: '/pengaturan', labelKey: 'nav.settings', Icon: SettingsIcon },
];
