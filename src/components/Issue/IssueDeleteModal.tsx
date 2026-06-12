import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useAppDispatch } from '../../store/hooks';
import { deleteIssue } from '../../store/slices/projectSlice';

interface IssueDeleteModalProps {
  open: boolean;
  issueId: string;
  issueTitle: string;
  onClose: () => void;
  onDeleted?: () => void;
  testId?: string;
}

const IssueDeleteModal: React.FC<IssueDeleteModalProps> = ({
  open,
  issueId,
  issueTitle,
  onClose,
  onDeleted,
  testId,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteIssue(issueId));
    onClose();
    onDeleted?.();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      data-testid={testId || `delete-issue-modal-${issueId}`}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningAmberIcon color="warning" />
        Delete Issue
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          Are you sure you want to delete <strong>&quot;{issueTitle}&quot;</strong>?
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          This action cannot be undone. All comments will be deleted as well.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          data-testid={`cancel-delete-${issueId}`}
          onClick={onClose}
          variant="outlined"
          size="small"
        >
          Cancel
        </Button>
        <Button
          data-testid={`confirm-delete-${issueId}`}
          onClick={handleDelete}
          variant="contained"
          color="error"
          size="small"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IssueDeleteModal;
