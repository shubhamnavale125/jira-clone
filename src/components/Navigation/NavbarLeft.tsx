import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import DataObjectIcon from '@mui/icons-material/DataObject';
import UserAvatar from '../common/UserAvatar';
import { useAppSelector } from '../../store/hooks';
import SearchDrawer from '../Search/SearchDrawer';
import AddIssueModal from '../AddIssue/AddIssueModal';

const NavbarLeft: React.FC = () => {
  const auth = useAppSelector((s) => s.auth);
  const [searchOpen, setSearchOpen] = useState(false);
  const [addIssueOpen, setAddIssueOpen] = useState(false);

  return (
    <>
      <Box
        data-testid="navbar-left"
        sx={{
          width: 64,
          bgcolor: '#0747A6',
          color: 'white',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          gap: 1,
          flexShrink: 0,
        }}
      >
        <Tooltip title="Jira Clone" placement="right">
          <IconButton
            data-testid="left-logo-btn"
            size="small"
            sx={{
              width: 34,
              height: 34,
              bgcolor: '#1C63CE',
              color: 'white',
              '&:hover': { bgcolor: '#2E74DE' },
            }}
          >
            <DataObjectIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Search" placement="right">
          <IconButton
            data-testid="search-btn"
            onClick={() => setSearchOpen(true)}
            sx={{ color: 'white', '&:hover': { bgcolor: '#1C63CE' } }}
          >
            <SearchIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Create Issue" placement="right">
          <IconButton
            data-testid="create-issue-btn"
            onClick={() => setAddIssueOpen(true)}
            sx={{ color: 'white', '&:hover': { bgcolor: '#1C63CE' } }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Box sx={{ flex: 1 }} />

        {auth && (
          <Box sx={{ mb: 0.5 }}>
            <UserAvatar user={auth} size={26} showTooltip testId="current-user-avatar" />
          </Box>
        )}

        <Tooltip title="About" placement="right">
          <IconButton
            data-testid="about-btn"
            sx={{ color: 'white', '&:hover': { bgcolor: '#1C63CE' } }}
          >
            <HelpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AddIssueModal open={addIssueOpen} onClose={() => setAddIssueOpen(false)} />
    </>
  );
};

export default NavbarLeft;
