import React from 'react';
import { Dialog, Box, useTheme, useMediaQuery } from '@mui/material';
import IssueDetail from './IssueDetail';

interface IssueModalProps {
  open: boolean;
  issueId: string;
  onClose: () => void;
}

const IssueModal: React.FC<IssueModalProps> = ({ open, issueId, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      data-testid={`issue-modal-${issueId}`}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: fullScreen ? '100%' : '88vh',
          maxHeight: '920px',
          width: fullScreen ? '100%' : 1040,
          overflow: 'hidden',
        },
      }}
    >
      <Box sx={{ height: '100%', overflow: 'hidden', px: fullScreen ? 0 : 1.5 }}>
        <IssueDetail issueId={issueId} onClose={onClose} onDeleted={onClose} />
      </Box>
    </Dialog>
  );
};

export default IssueModal;
