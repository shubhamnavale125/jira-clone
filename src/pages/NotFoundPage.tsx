import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      data-testid="not-found-page"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 2,
        color: 'text.secondary',
      }}
    >
      <DashboardIcon sx={{ fontSize: 80, opacity: 0.3 }} />
      <Typography variant="h5" fontWeight={600}>
        Page Not Found
      </Typography>
      <Typography variant="body2">The page you are looking for does not exist.</Typography>
      <Button
        data-testid="go-to-board-btn"
        variant="contained"
        onClick={() => navigate('/project/board')}
      >
        Go to Board
      </Button>
    </Box>
  );
};

export default NotFoundPage;
