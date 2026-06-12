import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppSelector } from '../store/hooks';
import IssueDetail from '../components/Issue/IssueDetail';
import Breadcrumbs from '../components/common/Breadcrumbs';

const IssueDetailPage: React.FC = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const navigate = useNavigate();
  const project = useAppSelector((s) => s.project);
  const issue = project?.issues.find((i) => i.id === issueId);

  if (!issueId) {
    return (
      <Box data-testid="issue-not-found" sx={{ p: 3 }}>
        <Typography>Issue not found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      data-testid="issue-detail-page"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs
          items={[
            { label: 'Projects', path: '/project' },
            { label: project?.name || 'Project', path: '/project/board' },
            { label: 'Board', path: '/project/board' },
            { label: issue?.title || issueId },
          ]}
        />
        <Button
          data-testid="back-to-board-btn"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/project/board')}
          variant="text"
          size="small"
          sx={{ mb: 1, textTransform: 'none', color: 'text.secondary' }}
        >
          Back to Board
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}
      >
        <IssueDetail issueId={issueId} onDeleted={() => navigate('/project/board')} />
      </Box>
    </Box>
  );
};

export default IssueDetailPage;
