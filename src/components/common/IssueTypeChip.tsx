import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import { IssueType } from '../../types';
import { ISSUE_TYPES } from '../../config/constants';

interface IssueTypeChipProps {
  type: IssueType;
  size?: 'small' | 'medium';
  testId?: string;
}

const IssueTypeChip: React.FC<IssueTypeChipProps> = ({ type, size = 'small', testId }) => {
  const config = ISSUE_TYPES.find((t) => t.value === type);
  if (!config) return null;

  return (
    <Tooltip title={config.label}>
      <Chip
        data-testid={testId || `issue-type-${type.toLowerCase()}`}
        label={config.label}
        size={size}
        sx={{
          backgroundColor: `${config.color}20`,
          color: config.color,
          fontWeight: 600,
          fontSize: '0.7rem',
          height: size === 'small' ? 20 : 24,
          '& .MuiChip-label': { px: 1 },
        }}
      />
    </Tooltip>
  );
};

export default IssueTypeChip;
