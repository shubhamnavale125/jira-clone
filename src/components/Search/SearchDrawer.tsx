import React, { useState, useMemo } from 'react';
import {
  Drawer,
  Box,
  TextField,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../../store/hooks';
import IssueResult from './IssueResult';

interface SearchDrawerProps {
  open: boolean;
  onClose: () => void;
}

const SearchDrawer: React.FC<SearchDrawerProps> = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const project = useAppSelector((s) => s.project);

  const results = useMemo(() => {
    if (!project || !searchTerm.trim()) return project?.issues.slice(0, 5) || [];
    const term = searchTerm.toLowerCase();
    return project.issues.filter((i) => i.title.toLowerCase().includes(term)).slice(0, 10);
  }, [project, searchTerm]);

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      data-testid="search-drawer"
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 360 },
          p: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Search Issues
        </Typography>
        <IconButton data-testid="search-drawer-close" onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <TextField
        data-testid="search-input"
        fullWidth
        placeholder="Search issues..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoFocus
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        {searchTerm ? `${results.length} result(s) found` : 'Recent issues'}
      </Typography>
      <Divider sx={{ mb: 1 }} />

      {results.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary" variant="body2">
            No issues found
          </Typography>
        </Box>
      ) : (
        results.map((issue) => <IssueResult key={issue.id} issue={issue} onSelect={handleClose} />)
      )}
    </Drawer>
  );
};

export default SearchDrawer;
