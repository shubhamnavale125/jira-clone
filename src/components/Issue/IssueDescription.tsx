import React, { useState, lazy, Suspense } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { updateIssue } from '../../store/slices/projectSlice';
import 'react-quill-new/dist/quill.snow.css';

// Lazy load ReactQuill to avoid SSR/build issues
const ReactQuill = lazy(() => import('react-quill-new'));

interface IssueDescriptionProps {
  issueId: string;
  description: string;
  testId?: string;
}

const IssueDescription: React.FC<IssueDescriptionProps> = ({ issueId, description, testId }) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(description);

  const handleSave = () => {
    dispatch(updateIssue({ id: issueId, changes: { description: value } }));
    setEditing(false);
  };

  const handleCancel = () => {
    setValue(description);
    setEditing(false);
  };

  return (
    <Box data-testid={testId || `issue-description-${issueId}`} sx={{ mb: 3 }}>
      {editing ? (
        <Box>
          <Suspense fallback={<CircularProgress size={20} />}>
            <ReactQuill
              value={value}
              onChange={setValue}
              theme="snow"
              style={{ minHeight: 120 }}
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ header: [1, 2, 3, false] }],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
          </Suspense>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Button
              data-testid={`save-description-${issueId}`}
              variant="contained"
              size="small"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              data-testid={`cancel-description-${issueId}`}
              variant="outlined"
              size="small"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          data-testid={`description-display-${issueId}`}
          onClick={() => setEditing(true)}
          sx={{
            cursor: 'text',
            p: 1,
            borderRadius: 1,
            minHeight: 80,
            border: '1px solid transparent',
            '&:hover': { border: '1px solid', borderColor: 'divider', bgcolor: 'action.hover' },
            '& img': { maxWidth: '100%' },
          }}
        >
          {description ? (
            <Box
              dangerouslySetInnerHTML={{ __html: description }}
              sx={{ '& p': { m: 0, mb: 1 }, '& h1, h2, h3': { my: 1 } }}
            />
          ) : (
            <Typography color="text.secondary" variant="body2">
              Add a description...
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default IssueDescription;
