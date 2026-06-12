import React, { useState } from 'react';
import { Box, Avatar, TextField, Button, Typography } from '@mui/material';
import { JComment, JUser } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addComment } from '../../store/slices/projectSlice';
import IssueComment from './IssueComment';

interface IssueCommentsProps {
  issueId: string;
  comments: JComment[];
  users: JUser[];
  testId?: string;
}

const IssueComments: React.FC<IssueCommentsProps> = ({ issueId, comments, users, testId }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);
  const [adding, setAdding] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleAdd = () => {
    if (!newComment.trim() || !auth) return;
    const comment: JComment = {
      id: `comment-${Date.now()}`,
      body: newComment.trim(),
      issueId,
      userId: auth.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addComment({ issueId, comment }));
    setNewComment('');
    setAdding(false);
  };

  return (
    <Box data-testid={testId || `issue-comments-${issueId}`} sx={{ mt: 2 }}>
      {/* Add Comment */}
      {adding ? (
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Avatar
            src={auth?.avatarUrl}
            alt={auth?.name}
            sx={{ width: 32, height: 32, flexShrink: 0, mt: 0.25 }}
          />
          <Box sx={{ flex: 1 }}>
            <TextField
              data-testid={`new-comment-input-${issueId}`}
              fullWidth
              multiline
              rows={3}
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              size="small"
              autoFocus
              sx={{ mb: 1 }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleAdd();
                }
              }}
            />
            <Typography variant="caption" color="text.secondary">
              <strong>Pro tip:</strong> press Cmd/Ctrl + Enter to comment
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                data-testid={`submit-comment-${issueId}`}
                variant="contained"
                size="small"
                onClick={handleAdd}
                disabled={!newComment.trim()}
              >
                Save
              </Button>
              <Button
                data-testid={`cancel-comment-${issueId}`}
                variant="outlined"
                size="small"
                onClick={() => {
                  setAdding(false);
                  setNewComment('');
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Button
          data-testid={`add-comment-btn-${issueId}`}
          variant="text"
          size="small"
          onClick={() => setAdding(true)}
          sx={{ fontSize: '0.75rem', textTransform: 'none', px: 0.5 }}
        >
          Add Comment
        </Button>
      )}

      {/* Existing Comments */}
      <Box sx={{ mt: 1.5 }}>
        {(comments || []).map((comment) => (
          <IssueComment
            key={comment.id}
            comment={comment}
            issueId={issueId}
            users={users}
            isCurrentUser={comment.userId === auth?.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default IssueComments;
