import React, { useMemo, useState } from 'react';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { JUser } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { updateIssue } from '../../store/slices/projectSlice';

interface IssueAssigneesSelectProps {
  issueId: string;
  userIds: string[];
  users: JUser[];
  testId?: string;
}

const IssueAssigneesSelect: React.FC<IssueAssigneesSelectProps> = ({
  issueId,
  userIds,
  users,
  testId,
}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const assignees = useMemo(() => users.filter((u) => userIds.includes(u.id)), [users, userIds]);
  const selectableUsers = useMemo(
    () => users.filter((u) => !userIds.includes(u.id)),
    [users, userIds],
  );

  const setUsers = (newIds: string[]) => {
    dispatch(updateIssue({ id: issueId, changes: { userIds: newIds } }));
  };

  const addUser = (id: string) => {
    setUsers([...userIds, id]);
    setAnchorEl(null);
  };

  const removeUser = (id: string) => {
    setUsers(userIds.filter((item) => item !== id));
  };

  return (
    <Box data-testid={testId || `issue-assignees-${issueId}`}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
        {assignees.map((user) => (
          <Box
            key={user.id}
            sx={{
              height: 30,
              px: 1,
              mr: 0.8,
              mb: 0.8,
              borderRadius: 1,
              bgcolor: '#F4F5F7',
              display: 'flex',
              alignItems: 'center',
              gap: 0.8,
            }}
          >
            <Avatar src={user.avatarUrl} alt={user.name} sx={{ width: 20, height: 20 }} />
            <Typography sx={{ fontSize: 12 }}>{user.name}</Typography>
            <IconButton
              size="small"
              onClick={() => removeUser(user.id)}
              sx={{ p: 0.2, color: '#7A869A' }}
            >
              <CloseIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Button
        data-testid={`add-assignee-${issueId}`}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        startIcon={<AddIcon sx={{ fontSize: 14 }} />}
        sx={{
          height: 28,
          px: 1,
          color: '#0052CC',
          fontSize: 12,
          textTransform: 'none',
          '&:hover': { bgcolor: '#DEEBFF' },
        }}
      >
        Add Assignee
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ sx: { mt: 0.5, py: 0.5 } }}
      >
        {selectableUsers.map((user) => (
          <MenuItem
            key={user.id}
            data-testid={`assignee-option-${user.id}`}
            onClick={() => addUser(user.id)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src={user.avatarUrl} alt={user.name} sx={{ width: 24, height: 24 }} />
              <Typography sx={{ fontSize: 13 }}>{user.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default IssueAssigneesSelect;
