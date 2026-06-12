import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { JIssue } from '../../types';
import { ISSUE_TYPES } from '../../config/constants';
import PriorityIcon from '../common/PriorityIcon';

interface IssueResultProps {
  issue: JIssue;
  onSelect?: () => void;
  testId?: string;
}

const IssueResult: React.FC<IssueResultProps> = ({ issue, onSelect, testId }) => {
  const navigate = useNavigate();
  const typeConfig = ISSUE_TYPES.find((t) => t.value === issue.type);

  const handleClick = () => {
    navigate(`/project/issue/${issue.id}`);
    onSelect?.();
  };

  return (
    <Box
      data-testid={testId || `issue-result-${issue.id}`}
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 1.5,
        cursor: 'pointer',
        borderRadius: 1,
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: typeConfig?.color || '#ccc',
          flexShrink: 0,
        }}
      />
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <Typography variant="body2" noWrap>
          {issue.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
          <Typography variant="caption" color="text.secondary">
            {issue.type}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ·
          </Typography>
          <PriorityIcon priority={issue.priority} size={12} />
          <Typography variant="caption" color="text.secondary">
            {issue.priority}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default IssueResult;
