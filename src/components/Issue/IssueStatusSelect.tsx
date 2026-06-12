import React, { useMemo, useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IssueStatus, IssueStatusDisplay } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { updateIssue } from '../../store/slices/projectSlice';

interface IssueStatusSelectProps {
  issueId: string;
  status: IssueStatus;
  testId?: string;
}

const STATUS_VARIANTS: Record<IssueStatus, { bg: string; text: string }> = {
  [IssueStatus.BACKLOG]: { bg: '#EBECF0', text: '#5E6C84' },
  [IssueStatus.SELECTED]: { bg: '#DEEBFF', text: '#0747A6' },
  [IssueStatus.IN_PROGRESS]: { bg: '#FFF0B3', text: '#915B00' },
  [IssueStatus.DONE]: { bg: '#E3FCEF', text: '#006644' },
};

const IssueStatusSelect: React.FC<IssueStatusSelectProps> = ({ issueId, status, testId }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const options = useMemo(
    () => Object.values(IssueStatus).filter((item) => item !== status),
    [status],
  );

  const handleChange = (newStatus: IssueStatus) => {
    dispatch(updateIssue({ id: issueId, changes: { status: newStatus } }));
    setAnchorEl(null);
  };

  const current = STATUS_VARIANTS[status];

  return (
    <Box>
      <Button
        data-testid={testId || `issue-status-${issueId}`}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<ArrowDropDownIcon sx={{ fontSize: 18 }} />}
        sx={{
          height: 30,
          px: 1.2,
          bgcolor: current.bg,
          color: current.text,
          borderRadius: 1,
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          '&:hover': { bgcolor: current.bg },
        }}
      >
        {IssueStatusDisplay[status]}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ sx: { mt: 0.5, py: 0.5 } }}
      >
        {options.map((item) => (
          <MenuItem
            key={item}
            data-testid={`status-option-${item.toLowerCase()}`}
            onClick={() => handleChange(item)}
            sx={{ minWidth: 220, py: 1 }}
          >
            <Typography
              sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#5E6C84' }}
            >
              {IssueStatusDisplay[item]}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default IssueStatusSelect;
