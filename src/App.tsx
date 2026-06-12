import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ProjectLayout from './layouts/ProjectLayout';
import BoardPage from './pages/BoardPage';
import SettingsPage from './pages/SettingsPage';
import IssueDetailPage from './pages/IssueDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0052CC',
      light: '#4C9AFF',
      dark: '#0747A6',
    },
    secondary: {
      main: '#6554C0',
    },
    background: {
      default: '#FAFBFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#172B4D',
      secondary: '#6B778C',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/project/board" replace />} />
          <Route path="/project" element={<ProjectLayout />}>
            <Route index element={<Navigate to="board" replace />} />
            <Route path="board" element={<BoardPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="issue/:issueId" element={<IssueDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/project/board" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
