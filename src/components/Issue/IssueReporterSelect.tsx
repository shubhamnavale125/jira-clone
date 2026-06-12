import React, { useMemo, useState } from 'react';
import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { JUser } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { updateIssue } from '../../store/slices/projectSlice';

interface IssueReporterSelectProps {
  issueId: string;
  reporterId: string;
  users: JUser[];
  testId?: string;
}

const IssueReporterSelect: React.FC<IssueReporterSelectProps> = ({
  issueId,
  reporterId,
  users,
  testId,
}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const reporter = users.find((u) => u.id === reporterId);
  const options = useMemo(
    () => users.filter((item) => item.id !== reporterId),
    [users, reporterId],
  );

  const handleChange = (newId: string) => {
    dispatch(updateIssue({ id: issueId, changes: { reporterId: newId } }));
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        data-testid={testId || `issue-reporter-${issueId}`}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<ArrowDropDownIcon sx={{ fontSize: 18 }} />}
        sx={{
          height: 30,
          px: 1,
          bgcolor: '#F4F5F7',
          color: '#172B4D',
          borderRadius: 1,
          textTransform: 'none',
          '&:hover': { bgcolor: '#EBECF0' },
        }}
      >
        {reporter ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Avatar src={reporter.avatarUrl} alt={reporter.name} sx={{ width: 20, height: 20 }} />
            <Typography sx={{ fontSize: 12, color: '#172B4D' }}>{reporter.name}</Typography>
          </Box>
        ) : (
          <Typography sx={{ fontSize: 12, color: '#6B778C' }}>Select reporter</Typography>
        )}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ sx: { mt: 0.5, py: 0.5 } }}
      >
        {options.map((user) => (
          <MenuItem
            key={user.id}
            value={user.id}
            data-testid={`reporter-option-${user.id}`}
            onClick={() => handleChange(user.id)}
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

export default IssueReporterSelect;
