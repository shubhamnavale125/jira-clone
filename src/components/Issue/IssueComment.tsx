import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, TextField, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { JComment, JUser } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { updateComment, deleteComment } from '../../store/slices/projectSlice';
import { timeAgo } from '../../utils/date.utils';

interface IssueCommentProps {
  comment: JComment;
  issueId: string;
  users: JUser[];
  isCurrentUser: boolean;
  testId?: string;
}

const IssueComment: React.FC<IssueCommentProps> = ({
  comment,
  issueId,
  users,
  isCurrentUser,
  testId,
}) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.body);
  const author = users.find((u) => u.id === comment.userId);

  const handleSave = () => {
    if (editValue.trim()) {
      dispatch(updateComment({ issueId, commentId: comment.id, body: editValue.trim() }));
    }
    setEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment({ issueId, commentId: comment.id }));
  };

  return (
    <Box data-testid={testId || `comment-${comment.id}`} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
      <Avatar
        src={author?.avatarUrl}
        alt={author?.name}
        sx={{ width: 32, height: 32, flexShrink: 0, mt: 0.25 }}
      />
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Typography variant="caption" fontWeight={600}>
            {author?.name || 'Unknown'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {timeAgo(comment.createdAt)}
          </Typography>
        </Box>

        {editing ? (
          <Box>
            <TextField
              data-testid={`edit-comment-input-${comment.id}`}
              fullWidth
              multiline
              rows={3}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              size="small"
              autoFocus
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                data-testid={`save-comment-${comment.id}`}
                variant="contained"
                size="small"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                data-testid={`cancel-edit-comment-${comment.id}`}
                variant="outlined"
                size="small"
                onClick={() => {
                  setEditing(false);
                  setEditValue(comment.body);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography
              data-testid={`comment-body-${comment.id}`}
              variant="body2"
              sx={{
                p: 1.5,
                bgcolor: 'grey.100',
                borderRadius: 1,
                whiteSpace: 'pre-wrap',
              }}
            >
              {comment.body}
            </Typography>
            {isCurrentUser && (
              <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                <IconButton
                  data-testid={`edit-comment-btn-${comment.id}`}
                  size="small"
                  onClick={() => setEditing(true)}
                  sx={{ p: 0.25 }}
                >
                  <EditIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                </IconButton>
                <IconButton
                  data-testid={`delete-comment-btn-${comment.id}`}
                  size="small"
                  onClick={handleDelete}
                  sx={{ p: 0.25 }}
                >
                  <DeleteOutlineIcon sx={{ fontSize: 14, color: 'error.main' }} />
                </IconButton>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default IssueComment;
