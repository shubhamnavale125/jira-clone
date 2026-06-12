import React, { useMemo, useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IssueType } from '../../types';
import { ISSUE_TYPES } from '../../config/constants';
import { useAppDispatch } from '../../store/hooks';
import { updateIssue } from '../../store/slices/projectSlice';

interface IssueTypeSelectProps {
  issueId: string;
  type: IssueType;
  testId?: string;
}

const IssueTypeSelect: React.FC<IssueTypeSelectProps> = ({ issueId, type, testId }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const options = useMemo(() => ISSUE_TYPES.filter((item) => item.value !== type), [type]);
  const selected = ISSUE_TYPES.find((item) => item.value === type);

  const handleChange = (newType: IssueType) => {
    dispatch(updateIssue({ id: issueId, changes: { type: newType } }));
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        data-testid={testId || `issue-type-select-${issueId}`}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<ArrowDropDownIcon sx={{ fontSize: 18 }} />}
        sx={{
          minHeight: 28,
          px: 0.4,
          color: '#5E6C84',
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          '&:hover': { bgcolor: 'transparent', color: '#172B4D' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: selected?.color || '#A5ADBA',
            }}
          />
          <Typography
            sx={{ fontSize: 12, fontWeight: 700, color: '#5E6C84', textTransform: 'uppercase' }}
          >
            {type}-{issueId}
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ sx: { py: 0.5 } }}
      >
        {options.map((item) => (
          <MenuItem
            key={item.value}
            data-testid={`type-option-${item.value.toLowerCase()}`}
            onClick={() => handleChange(item.value)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />
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

export default IssueTypeSelect;
