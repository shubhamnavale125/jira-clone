import React, { useMemo, useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IssuePriority } from '../../types';
import { ISSUE_PRIORITIES } from '../../config/constants';
import { useAppDispatch } from '../../store/hooks';
import { updateIssue } from '../../store/slices/projectSlice';
import PriorityIcon from '../common/PriorityIcon';

interface IssuePrioritySelectProps {
  issueId: string;
  priority: IssuePriority;
  testId?: string;
}

const IssuePrioritySelect: React.FC<IssuePrioritySelectProps> = ({ issueId, priority, testId }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const current = ISSUE_PRIORITIES.find((p) => p.value === priority);
  const options = useMemo(
    () => ISSUE_PRIORITIES.filter((item) => item.value !== priority),
    [priority],
  );

  const handleChange = (newPriority: IssuePriority) => {
    dispatch(updateIssue({ id: issueId, changes: { priority: newPriority } }));
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        data-testid={testId || `issue-priority-${issueId}`}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<ArrowDropDownIcon sx={{ fontSize: 18 }} />}
        sx={{
          height: 30,
          px: 1.2,
          bgcolor: '#F4F5F7',
          color: '#172B4D',
          borderRadius: 1,
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'none',
          '&:hover': { bgcolor: '#EBECF0' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
          <PriorityIcon priority={priority} size={18} />
          <Typography
            sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#5E6C84' }}
          >
            {current?.label}
          </Typography>
        </Box>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ sx: { mt: 0.5, py: 0.5 } }}
      >
        {options.map((item) => (
          <MenuItem
            key={item.value}
            data-testid={`priority-option-${item.value.toLowerCase()}`}
            onClick={() => handleChange(item.value)}
            sx={{ minWidth: 220, py: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <PriorityIcon priority={item.value} size={18} />
              <Typography
                sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#5E6C84' }}
              >
                {item.label}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default IssuePrioritySelect;
