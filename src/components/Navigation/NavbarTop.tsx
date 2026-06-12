import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Tooltip, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import UserAvatar from '../common/UserAvatar';
import { useAppSelector } from '../../store/hooks';
import SearchDrawer from '../Search/SearchDrawer';
import AddIssueModal from '../AddIssue/AddIssueModal';

interface NavbarTopProps {
  onMobileMenuToggle: () => void;
  showDesktopActions?: boolean;
}

const NavbarTop: React.FC<NavbarTopProps> = ({ onMobileMenuToggle, showDesktopActions = true }) => {
  const auth = useAppSelector((s) => s.auth);
  const [searchOpen, setSearchOpen] = useState(false);
  const [addIssueOpen, setAddIssueOpen] = useState(false);

  return (
    <>
      <AppBar
        data-testid="navbar-top"
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: (theme) => theme.zIndex.drawer - 1,
          display: { xs: 'block', md: showDesktopActions ? 'block' : 'none' },
        }}
      >
        <Toolbar sx={{ minHeight: '48px !important', px: { xs: 1, sm: 2 } }}>
          {/* Mobile menu toggle */}
          <IconButton
            data-testid="mobile-menu-btn"
            edge="start"
            onClick={onMobileMenuToggle}
            sx={{ mr: 1, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo (mobile only) */}
          <Box
            component="span"
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#0052CC',
              mr: 2,
            }}
          >
            Jira Clone
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Search */}
          <Tooltip title="Search issues">
            <IconButton
              data-testid="search-btn"
              onClick={() => setSearchOpen(true)}
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>

          {/* Create Issue */}
          <Tooltip title="Create issue">
            <IconButton
              data-testid="create-issue-btn"
              onClick={() => setAddIssueOpen(true)}
              size="small"
              sx={{ color: 'text.secondary', mx: 0.5 }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>

          {/* User Avatar */}
          {auth && (
            <Box sx={{ ml: 0.5 }}>
              <UserAvatar user={auth} size={30} showTooltip testId="current-user-avatar" />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AddIssueModal open={addIssueOpen} onClose={() => setAddIssueOpen(false)} />
    </>
  );
};

export default NavbarTop;
