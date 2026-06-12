import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../components/Navigation/Sidebar';
import NavbarTop from '../components/Navigation/NavbarTop';
import NavbarLeft from '../components/Navigation/NavbarLeft';
import SnowfallOverlay from '../components/common/SnowfallOverlay';

const ProjectLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      data-testid="project-layout"
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <NavbarLeft />

      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        mobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen((prev) => !prev)}
      />

      {/* Main content area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
          position: 'relative',
        }}
      >
        <SnowfallOverlay />

        {/* Top navbar */}
        <NavbarTop
          onMobileMenuToggle={() => setMobileOpen((prev) => !prev)}
          showDesktopActions={false}
        />

        {/* Page content */}
        <Box
          component="main"
          data-testid="main-content"
          sx={{
            flex: 1,
            overflow: 'auto',
            p: { xs: 2, sm: 3 },
            bgcolor: '#FAFBFC',
            position: 'relative',
            zIndex: 1,
            '& > *': {
              position: 'relative',
              zIndex: 3,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectLayout;
