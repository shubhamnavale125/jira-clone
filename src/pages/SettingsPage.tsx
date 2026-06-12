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

      <Typography data-testid="settings-title" variant="h5" fontWeight={500} gutterBottom>
        Project Settings
      </Typography>
      <Box sx={{ mt: 1.5 }}>
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
              placeholder="Project Name"
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
              placeholder="Project Description"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
          <Button
            data-testid="save-settings-btn"
            variant="contained"
            onClick={handleSave}
            disabled={!name.trim()}
            sx={{ textTransform: 'none' }}
          >
            Save
          </Button>
          <Button
            data-testid="cancel-settings-btn"
            variant="text"
            onClick={() => {
              if (project) {
                setName(project.name);
                setUrl(project.url);
                setCategory(project.category);
                setDescription(project.description);
              }
            }}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage;
