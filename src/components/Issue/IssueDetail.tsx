import React, { useState } from 'react';
import { Box, Grid, Typography, Divider, Skeleton, IconButton, Tooltip, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useAppSelector } from '../../store/hooks';
import IssueTitle from './IssueTitle';
import IssueDescription from './IssueDescription';
import IssueStatusSelect from './IssueStatusSelect';
import IssuePrioritySelect from './IssuePrioritySelect';
import IssueTypeSelect from './IssueTypeSelect';
import IssueReporterSelect from './IssueReporterSelect';
import IssueAssigneesSelect from './IssueAssigneesSelect';
import IssueComments from './IssueComments';
import IssueDeleteModal from './IssueDeleteModal';
import { formatDate } from '../../utils/date.utils';

interface IssueDetailProps {
  issueId: string;
  onClose?: () => void;
  onDeleted?: () => void;
  testId?: string;
}

const IssueDetail: React.FC<IssueDetailProps> = ({ issueId, onClose, onDeleted, testId }) => {
  const project = useAppSelector((s) => s.project);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const issue = project?.issues.find((i) => i.id === issueId);
  const users = project?.users || [];

  if (!issue) {
    return (
      <Box data-testid="issue-loader" sx={{ p: 3 }}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} variant="text" height={40} sx={{ mb: 1 }} />
        ))}
      </Box>
    );
  }

  return (
    <Box
      data-testid={testId || `issue-detail-${issueId}`}
      sx={{ height: '100%', overflowY: 'auto' }}
    >
      {/* Top bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pr: 2,
          pt: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IssueTypeSelect issueId={issue.id} type={issue.type} />
          <Typography variant="caption" color="text.secondary">
            {issue.id}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          <Tooltip title="Feedback">
            <Button
              data-testid={`feedback-${issueId}`}
              component="a"
              href="https://github.com/trungk18/jira-clone-angular/issues/new"
              target="_blank"
              rel="noreferrer"
              size="small"
              startIcon={<FeedbackIcon fontSize="small" />}
              sx={{
                textTransform: 'none',
                fontSize: '0.78rem',
                color: '#42526E',
                minWidth: 0,
                px: 1,
              }}
            >
              Give Feedback
            </Button>
          </Tooltip>
          <Tooltip title="Delete issue">
            <IconButton
              data-testid={`delete-issue-btn-${issueId}`}
              size="small"
              color="error"
              onClick={() => setDeleteOpen(true)}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {onClose && (
            <Tooltip title="Close">
              <IconButton data-testid={`close-issue-${issueId}`} size="small" onClick={onClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* Content */}
      <Grid container spacing={0} sx={{ height: 'calc(100% - 54px)' }}>
        {/* Left column – main content */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            p: { xs: 2, md: 3 },
            overflowY: { md: 'auto' },
            borderRight: { md: '1px solid' },
            borderColor: { md: '#F0F1F3' },
          }}
        >
          <IssueTitle issueId={issue.id} title={issue.title} />
          <Typography sx={{ mt: 1, mb: 1, fontSize: 15, fontWeight: 500, color: '#172B4D' }}>
            Description
          </Typography>
          <IssueDescription issueId={issue.id} description={issue.description} />
          <Typography sx={{ mt: 2, mb: 1, fontSize: 15, fontWeight: 500, color: '#172B4D' }}>
            Comments
          </Typography>
          <IssueComments issueId={issue.id} comments={issue.comments || []} users={users} />
        </Grid>

        {/* Right column – metadata */}
        <Grid item xs={12} md={5} sx={{ p: { xs: 2, md: 3 }, pt: { md: 2.5 } }}>
          <Box sx={{ mb: 1.5 }}>
            <Typography
              sx={{
                display: 'block',
                mb: 0.6,
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#6B778C',
              }}
            >
              STATUS
            </Typography>
            <IssueStatusSelect issueId={issue.id} status={issue.status} />
          </Box>

          <Box sx={{ mb: 1.5 }}>
            <Typography
              sx={{
                display: 'block',
                mb: 0.6,
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#6B778C',
              }}
            >
              REPORTER
            </Typography>
            <IssueReporterSelect issueId={issue.id} reporterId={issue.reporterId} users={users} />
          </Box>

          <Box sx={{ mb: 1.5 }}>
            <Typography
              sx={{
                display: 'block',
                mb: 0.6,
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#6B778C',
              }}
            >
              ASSIGNEES
            </Typography>
            <IssueAssigneesSelect issueId={issue.id} userIds={issue.userIds} users={users} />
          </Box>

          <Box sx={{ mb: 1.5 }}>
            <Typography
              sx={{
                display: 'block',
                mb: 0.6,
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#6B778C',
              }}
            >
              PRIORITY
            </Typography>
            <IssuePrioritySelect issueId={issue.id} priority={issue.priority} />
          </Box>

          <Divider sx={{ my: 2, borderColor: '#F0F1F3' }} />

          <Box>
            <Typography variant="caption" color="text.secondary">
              Created {formatDate(issue.createdAt)}
            </Typography>
            <br />
            <Typography variant="caption" color="text.secondary">
              Updated {formatDate(issue.updatedAt)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <IssueDeleteModal
        open={deleteOpen}
        issueId={issue.id}
        issueTitle={issue.title}
        onClose={() => setDeleteOpen(false)}
        onDeleted={onDeleted || onClose}
      />
    </Box>
  );
};

export default IssueDetail;
