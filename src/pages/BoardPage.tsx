import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import Breadcrumbs from '../components/common/Breadcrumbs';
import BoardFilter from '../components/Board/BoardFilter';
import BoardDnd from '../components/Board/BoardDnd';

const BoardPage: React.FC = () => {
  const project = useAppSelector((s) => s.project);

  return (
    <Box
      data-testid="board-page"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 1.5 }}>
        <Breadcrumbs
          items={[
            { label: 'Projects', path: '/project' },
            { label: project?.name || 'Project', path: '/project/board' },
            { label: 'Kanban Board' },
          ]}
        />
        <Typography
          data-testid="board-title"
          variant="h5"
          fontWeight={500}
          sx={{ fontSize: 22, color: '#172B4D' }}
          gutterBottom
        >
          Kanban Board
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {/* Social links */}
          <Box
            component="a"
            href="https://github.com/trungk18/jira-clone-angular"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="github-link"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.75rem',
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' },
            }}
          >
            ⭐ Source Code
          </Box>
        </Box>
      </Box>

      {/* Filter */}
      <BoardFilter />

      {/* Board */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <BoardDnd />
      </Box>
    </Box>
  );
};

export default BoardPage;
