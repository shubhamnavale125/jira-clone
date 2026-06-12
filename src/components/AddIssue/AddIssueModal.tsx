import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
  Avatar,
  OutlinedInput,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createIssue } from '../../store/slices/projectSlice';
import { IssueType, IssueStatus, IssuePriority, JIssue } from '../../types';
import { ISSUE_TYPES, ISSUE_PRIORITIES } from '../../config/constants';
import { generateIssueId, getLastPositionInStatus } from '../../utils/issue.utils';
import PriorityIcon from '../common/PriorityIcon';

interface AddIssueModalProps {
  open: boolean;
  onClose: () => void;
}

const AddIssueModal: React.FC<AddIssueModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.project);
  const auth = useAppSelector((s) => s.auth);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<IssueType>(IssueType.TASK);
  const [status, setStatus] = useState<IssueStatus>(IssueStatus.BACKLOG);
  const [priority, setPriority] = useState<IssuePriority>(IssuePriority.MEDIUM);
  const [reporterId, setReporterId] = useState(auth?.id || '');
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ title?: string }>({});

  const users = project?.users || [];

  const validate = () => {
    const newErrors: { title?: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate() || !project) return;

    const newIssue: JIssue = {
      id: generateIssueId(),
      title: title.trim(),
      description,
      type,
      status,
      priority,
      reporterId: reporterId || (auth?.id ?? ''),
      userIds: assigneeIds,
      comments: [],
      listPosition: getLastPositionInStatus(project.issues, status),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(createIssue(newIssue));
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setType(IssueType.TASK);
    setStatus(IssueStatus.BACKLOG);
    setPriority(IssuePriority.MEDIUM);
    setReporterId(auth?.id || '');
    setAssigneeIds([]);
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      data-testid="add-issue-modal"
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle data-testid="add-issue-title" fontWeight={600}>
        Create Issue
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Issue Type */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Issue Type</InputLabel>
              <Select
                data-testid="new-issue-type"
                value={type}
                label="Issue Type"
                onChange={(e) => setType(e.target.value as IssueType)}
              >
                {ISSUE_TYPES.map((t) => (
                  <MenuItem
                    key={t.value}
                    value={t.value}
                    data-testid={`new-type-option-${t.value.toLowerCase()}`}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: t.color }} />
                      {t.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Priority */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                data-testid="new-issue-priority"
                value={priority}
                label="Priority"
                onChange={(e) => setPriority(e.target.value as IssuePriority)}
              >
                {ISSUE_PRIORITIES.map((p) => (
                  <MenuItem
                    key={p.value}
                    value={p.value}
                    data-testid={`new-priority-option-${p.value.toLowerCase()}`}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PriorityIcon priority={p.value} size={14} />
                      {p.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Title */}
          <Grid item xs={12}>
            <TextField
              data-testid="new-issue-title-input"
              fullWidth
              label="Short summary *"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({});
              }}
              size="small"
              error={!!errors.title}
              helperText={errors.title}
              autoFocus
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              data-testid="new-issue-description"
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              size="small"
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                data-testid="new-issue-status"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value as IssueStatus)}
              >
                {Object.values(IssueStatus).map((s) => (
                  <MenuItem key={s} value={s} data-testid={`new-status-option-${s.toLowerCase()}`}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Reporter */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Reporter</InputLabel>
              <Select
                data-testid="new-issue-reporter"
                value={reporterId}
                label="Reporter"
                onChange={(e) => setReporterId(e.target.value)}
                renderValue={(v) => {
                  const user = users.find((u) => u.id === v);
                  return user ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={user.avatarUrl} sx={{ width: 20, height: 20 }} />
                      <Typography variant="caption">{user.name}</Typography>
                    </Box>
                  ) : (
                    <span>Select reporter</span>
                  );
                }}
              >
                {users.map((user) => (
                  <MenuItem
                    key={user.id}
                    value={user.id}
                    data-testid={`new-reporter-option-${user.id}`}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={user.avatarUrl} sx={{ width: 24, height: 24 }} />
                      {user.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Assignees */}
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Assignees</InputLabel>
              <Select
                data-testid="new-issue-assignees"
                multiple
                value={assigneeIds}
                onChange={(e) => setAssigneeIds(e.target.value as string[])}
                input={<OutlinedInput label="Assignees" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((id) => {
                      const user = users.find((u) => u.id === id);
                      return user ? (
                        <Chip
                          key={id}
                          avatar={<Avatar src={user.avatarUrl} />}
                          label={user.name}
                          size="small"
                          sx={{ height: 22, fontSize: '0.7rem' }}
                        />
                      ) : null;
                    })}
                  </Box>
                )}
              >
                {users.map((user) => (
                  <MenuItem
                    key={user.id}
                    value={user.id}
                    data-testid={`new-assignee-option-${user.id}`}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={user.avatarUrl} sx={{ width: 24, height: 24 }} />
                      {user.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button data-testid="cancel-add-issue" onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          data-testid="submit-add-issue"
          onClick={handleSubmit}
          variant="contained"
          disabled={!title.trim()}
        >
          Create Issue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddIssueModal;
