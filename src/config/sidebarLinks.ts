import { NavLink } from '../types';

export const SIDEBAR_LINKS: NavLink[] = [
  { label: 'Kanban Board', icon: 'dashboard', path: '/project/board' },
  { label: 'Project Settings', icon: 'settings', path: '/project/settings' },
  { label: 'Releases', icon: 'rocket_launch' },
  { label: 'Issues and filters', icon: 'filter_list' },
  { label: 'Pages', icon: 'article' },
  { label: 'Reports', icon: 'bar_chart' },
  { label: 'Components', icon: 'widgets' },
];
