import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Tooltip,
  Avatar,
  useTheme,
  useMediaQuery,
  Collapse,
  IconButton,
  Chip,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArticleIcon from '@mui/icons-material/Article';
import BarChartIcon from '@mui/icons-material/BarChart';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAppSelector } from '../../store/hooks';
import { SIDEBAR_LINKS } from '../../config/sidebarLinks';

const DRAWER_WIDTH = 240;
const MINI_DRAWER_WIDTH = 56;

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <DashboardIcon />,
  settings: <SettingsIcon />,
  rocket_launch: <RocketLaunchIcon />,
  filter_list: <FilterListIcon />,
  article: <ArticleIcon />,
  bar_chart: <BarChartIcon />,
  widgets: <WidgetsIcon />,
};

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, mobileOpen, onMobileToggle }) => {
  const project = useAppSelector((s) => s.project);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerWidth = open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH;

  const drawerContent = (
    <Box
      data-testid="sidebar"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: '#F4F5F7',
        color: '#172B4D',
      }}
    >
      {/* Project Header */}
      <Box sx={{ p: open ? 2 : 1, display: 'flex', alignItems: 'center', gap: 1, minHeight: 64 }}>
        <Avatar
          data-testid="project-avatar"
          src="https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_256/v1593097745/angular-vietnam-transparent_iwfwxa.png"
          sx={{
            bgcolor: 'transparent',
            width: 45,
            height: 45,
            fontSize: '1rem',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {project?.name?.charAt(0) || 'J'}
        </Avatar>
        <Collapse in={open} orientation="horizontal" unmountOnExit>
          <Box>
            <Typography
              data-testid="project-name"
              variant="body2"
              fontWeight={700}
              color="#172B4D"
              noWrap
              sx={{ maxWidth: 160 }}
            >
              {project?.name || 'Jira Clone'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B778C' }}>
              Software project
            </Typography>
          </Box>
        </Collapse>
      </Box>

      <Divider sx={{ borderColor: '#DFE1E6' }} />

      {/* Nav Links */}
      <List sx={{ flex: 1, py: 1 }}>
        {SIDEBAR_LINKS.map((link) => {
          const isAllowed = Boolean(link.path);
          const isActive = isAllowed && location.pathname === link.path;
          return (
            <Tooltip
              key={link.label}
              title={!open ? link.label : !isAllowed ? 'Not implemented' : ''}
              placement="right"
            >
              <ListItem disablePadding>
                <ListItemButton
                  component={isAllowed ? NavLink : 'div'}
                  to={isAllowed ? link.path : undefined}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={isMobile ? onMobileToggle : undefined}
                  disabled={!isAllowed}
                  sx={{
                    minHeight: 44,
                    px: open ? 2 : 1.5,
                    justifyContent: open ? 'flex-start' : 'center',
                    borderRadius: 1,
                    mx: 0.5,
                    color: isAllowed ? '#172B4D' : '#7A869A',
                    bgcolor: isActive ? '#DEEBFF' : 'transparent',
                    '&:hover': { bgcolor: '#EBECF0', color: '#172B4D' },
                    '&.active': { bgcolor: '#DEEBFF', color: '#0052CC' },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: open ? 36 : 'auto',
                      color: 'inherit',
                      justifyContent: 'center',
                    }}
                  >
                    {iconMap[link.icon] || <DashboardIcon />}
                  </ListItemIcon>
                  <Collapse in={open} orientation="horizontal" unmountOnExit>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, width: '100%' }}>
                      <ListItemText
                        primary={link.label}
                        primaryTypographyProps={{
                          fontSize: '0.85rem',
                          fontWeight: isActive ? 600 : 400,
                          noWrap: true,
                        }}
                      />
                      {!isAllowed && (
                        <Chip
                          label="Not implemented"
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.58rem',
                            textTransform: 'uppercase',
                            bgcolor: '#DFE1E6',
                            color: '#42526E',
                            '& .MuiChip-label': { px: 0.7, fontWeight: 700 },
                          }}
                        />
                      )}
                    </Box>
                  </Collapse>
                </ListItemButton>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>

      <Divider sx={{ borderColor: '#DFE1E6' }} />

      {/* Toggle Button */}
      <Box sx={{ p: 1, display: 'flex', justifyContent: open ? 'flex-end' : 'center' }}>
        <Tooltip title={open ? 'Collapse sidebar' : 'Expand sidebar'} placement="right">
          <IconButton
            data-testid="sidebar-toggle"
            onClick={onToggle}
            size="small"
            sx={{ color: '#6B778C', '&:hover': { color: '#172B4D', bgcolor: '#EBECF0' } }}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
