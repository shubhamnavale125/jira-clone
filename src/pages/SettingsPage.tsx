import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Alert,
  Divider,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateProject } from '../store/slices/projectSlice';
import { ProjectCategory } from '../types';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { PROJECT_CATEGORIES } from '../config/constants';

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.project);

  const [name, setName] = useState(project?.name || '');
  const [url, setUrl] = useState(project?.url || '');
  const [category, setCategory] = useState(project?.category || ProjectCategory.SOFTWARE);
  const [description, setDescription] = useState(project?.description || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setUrl(project.url);
      setCategory(project.category);
      setDescription(project.description);
    }
  }, [project]);

  const handleSave = () => {
    dispatch(updateProject({ name, url, category, description }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box data-testid="settings-page" sx={{ maxWidth: 720 }}>
      <Breadcrumbs
        items={[
          { label: 'Projects', path: '/project' },
          { label: project?.name || 'Project' },
          { label: 'Settings' },
        ]}
      />

      <Typography data-testid="settings-title" variant="h5" fontWeight={700} gutterBottom>
        Project Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage your project details and configuration.
      </Typography>

      {saved && (
        <Alert data-testid="settings-saved-alert" severity="success" sx={{ mb: 2 }}>
          Project settings saved successfully!
        </Alert>
      )}

      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: 3 }}>
        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              data-testid="settings-name-input"
              fullWidth
              label="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              helperText="This is the name of your project."
            />
          </Grid>

          {/* URL */}
          <Grid item xs={12}>
            <TextField
              data-testid="settings-url-input"
              fullWidth
              label="Project URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              size="small"
              placeholder="https://github.com/..."
              helperText="Optional: Link to the repository or website."
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Project Category</InputLabel>
              <Select
                data-testid="settings-category-select"
                value={category}
                label="Project Category"
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
              >
                {PROJECT_CATEGORIES.map((cat) => (
                  <MenuItem
                    key={cat}
                    value={cat}
                    data-testid={`category-option-${cat.toLowerCase()}`}
                  >
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              data-testid="settings-description-input"
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              size="small"
              helperText="Describe your project in a few sentences."
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            data-testid="save-settings-btn"
            variant="contained"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            Save Changes
          </Button>
          <Button
            data-testid="cancel-settings-btn"
            variant="outlined"
            onClick={() => {
              if (project) {
                setName(project.name);
                setUrl(project.url);
                setCategory(project.category);
                setDescription(project.description);
              }
            }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
