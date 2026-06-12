import React from 'react';
import { Box, TextField, Button, Stack, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  setSearchTerm,
  toggleUserId,
  toggleOnlyMyIssue,
  toggleIgnoreResolved,
  resetFilters,
} from '../../store/slices/filterSlice';
import UserAvatar from '../common/UserAvatar';

const BoardFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((s) => s.filter);
  const project = useAppSelector((s) => s.project);

  const hasActiveFilters =
    filter.searchTerm || filter.userIds.length > 0 || filter.onlyMyIssue || filter.ignoreResolved;

  return (
    <Box
      data-testid="board-filter"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: 1.2 },
        flexWrap: 'wrap',
        mb: 2,
        mt: 2,
      }}
    >
      {/* Search */}
      <TextField
        data-testid="board-search-input"
        placeholder="Search issues"
        value={filter.searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        size="small"
        sx={{
          width: { xs: '100%', sm: 160 },
          '& .MuiOutlinedInput-root': { height: 36, bgcolor: 'white' },
          '& .MuiInputBase-input': { fontSize: 13 },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* User Avatars */}
      <Stack
        direction="row"
        spacing={-0.3}
        data-testid="filter-users"
        sx={{ mr: 0.5, alignItems: 'center', minHeight: 40, overflow: 'visible' }}
      >
        {project?.users.map((user) => (
          <Box
            key={user.id}
            onClick={() => dispatch(toggleUserId(user.id))}
            sx={{
              width: 36,
              height: 36,
              minWidth: 36,
              minHeight: 36,
              flex: '0 0 36px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'transform 120ms ease',
              zIndex: filter.userIds.includes(user.id) ? 2 : 1,
              boxShadow: filter.userIds.includes(user.id) ? '0 0 0 3px #1255b9' : 'none',
              '&:hover': { transform: 'translateY(-5px)' },
            }}
          >
            <UserAvatar user={user} size={36} selected={false} testId={`filter-user-${user.id}`} />
          </Box>
        ))}
      </Stack>

      {/* Only My Issues */}
      <Button
        data-testid="only-my-issues-btn"
        variant={filter.onlyMyIssue ? 'contained' : 'text'}
        size="small"
        onClick={() => dispatch(toggleOnlyMyIssue())}
        sx={{
          height: 32,
          px: 1.7,
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'none',
          whiteSpace: 'nowrap',
          borderColor: '#DFE1E6',
          color: filter.onlyMyIssue ? 'white' : '#172B4D',
          bgcolor: filter.onlyMyIssue ? '#0052CC' : 'transparent',
          '&:hover': {
            bgcolor: filter.onlyMyIssue ? '#0052CC' : '#EBECF0',
          },
        }}
      >
        Only My Issues
      </Button>

      {/* Ignore Resolved */}
      <Button
        data-testid="ignore-resolved-btn"
        variant={filter.ignoreResolved ? 'contained' : 'text'}
        size="small"
        onClick={() => dispatch(toggleIgnoreResolved())}
        sx={{
          height: 32,
          px: 1.7,
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'none',
          whiteSpace: 'nowrap',
          borderColor: '#DFE1E6',
          color: filter.ignoreResolved ? 'white' : '#172B4D',
          bgcolor: filter.ignoreResolved ? '#0052CC' : 'transparent',
          '&:hover': {
            bgcolor: filter.ignoreResolved ? '#0052CC' : '#EBECF0',
          },
        }}
      >
        Ignore Resolved
      </Button>

      {/* Clear All */}
      {hasActiveFilters && (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.4, minHeight: 40 }}>
          <Box sx={{ width: '1px', height: 32, bgcolor: '#DFE1E6', mr: 1.2 }} />
          <Button
            data-testid="clear-filters-btn"
            variant="outlined"
            size="small"
            onClick={() => dispatch(resetFilters())}
            startIcon={<ClearIcon fontSize="small" />}
            sx={{
              height: 32,
              px: 1.2,
              minWidth: 'fit-content',
              fontSize: '0.74rem',
              fontWeight: 600,
              lineHeight: 1,
              textTransform: 'none',
              whiteSpace: 'nowrap',
              color: '#42526E',
              borderColor: '#DFE1E6',
              bgcolor: '#F4F5F7',
              '& .MuiButton-startIcon': { mr: 0.6 },
              '&:hover': { borderColor: '#C1C7D0', bgcolor: '#EBECF0' },
            }}
          >
            Clear all
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BoardFilter;
