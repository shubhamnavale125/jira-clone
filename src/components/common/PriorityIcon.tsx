import React from 'react';
import { Box, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { IssuePriority, IssuePriorityColors } from '../../types';

interface PriorityIconProps {
  priority: IssuePriority;
  size?: number;
  testId?: string;
}

const PriorityIcon: React.FC<PriorityIconProps> = ({ priority, size = 16, testId }) => {
  const color = IssuePriorityColors[priority];

  const iconMap: Record<IssuePriority, React.ReactNode> = {
    [IssuePriority.HIGHEST]: <KeyboardDoubleArrowUpIcon sx={{ fontSize: size, color }} />,
    [IssuePriority.HIGH]: <ArrowUpwardIcon sx={{ fontSize: size, color }} />,
    [IssuePriority.MEDIUM]: <RemoveIcon sx={{ fontSize: size, color }} />,
    [IssuePriority.LOW]: <ArrowDownwardIcon sx={{ fontSize: size, color }} />,
    [IssuePriority.LOWEST]: <KeyboardDoubleArrowDownIcon sx={{ fontSize: size, color }} />,
  };

  return (
    <Tooltip title={priority}>
      <Box
        data-testid={testId || `priority-icon-${priority.toLowerCase()}`}
        component="span"
        sx={{ display: 'inline-flex', alignItems: 'center' }}
      >
        {iconMap[priority]}
      </Box>
    </Tooltip>
  );
};

export default PriorityIcon;
