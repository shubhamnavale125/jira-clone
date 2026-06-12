import React, { useState, useRef, useEffect } from 'react';
import { TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { updateIssue } from '../../store/slices/projectSlice';

interface IssueTitleProps {
  issueId: string;
  title: string;
  testId?: string;
}

const IssueTitle: React.FC<IssueTitleProps> = ({ issueId, title, testId }) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(title);
  }, [title]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleSave = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== title) {
      dispatch(updateIssue({ id: issueId, changes: { title: trimmed } }));
    } else {
      setValue(title);
    }
    setEditing(false);
  };

  if (editing) {
    return (
      <TextField
        data-testid={testId || `issue-title-input-${issueId}`}
        inputRef={inputRef}
        fullWidth
        multiline
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
          }
          if (e.key === 'Escape') {
            setValue(title);
            setEditing(false);
          }
        }}
        variant="outlined"
        size="small"
        sx={{ mb: 1 }}
        inputProps={{ style: { fontSize: '1.1rem', fontWeight: 600 } }}
      />
    );
  }

  return (
    <Typography
      data-testid={testId || `issue-title-display-${issueId}`}
      variant="h6"
      fontWeight={600}
      onClick={() => setEditing(true)}
      sx={{
        cursor: 'text',
        mb: 1,
        p: 0.5,
        borderRadius: 1,
        '&:hover': { bgcolor: 'action.hover' },
        lineHeight: 1.4,
      }}
    >
      {value}
    </Typography>
  );
};

export default IssueTitle;
