import React from 'react';
import { Box, Button, Typography } from '@mui/material';
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
          sx={{ fontSize: 24, color: '#172B4D' }}
          gutterBottom
        >
          Kanban board
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Button
            component="a"
            href="https://github.com/trungk18/jira-clone-angular"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="github-link"
            variant="outlined"
            size="small"
            sx={{
              height: 30,
              px: 1.2,
              borderColor: '#DFE1E6',
              color: '#42526E',
              textTransform: 'none',
              fontSize: '0.74rem',
              fontWeight: 600,
              bgcolor: '#F4F5F7',
              '&:hover': { borderColor: '#C1C7D0', bgcolor: '#EBECF0' },
            }}
          >
            Source Code
          </Button>
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
