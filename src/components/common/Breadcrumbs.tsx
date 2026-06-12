import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  testId?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, testId }) => {
  return (
    <MuiBreadcrumbs
      data-testid={testId || 'breadcrumbs'}
      aria-label="breadcrumb"
      sx={{ mb: 1, fontSize: '0.8rem', color: 'text.secondary' }}
    >
      {items.map((item, idx) =>
        item.path ? (
          <Link
            key={idx}
            component={RouterLink}
            to={item.path}
            underline="hover"
            color="inherit"
            sx={{ fontSize: '0.8rem' }}
          >
            {item.label}
          </Link>
        ) : (
          <Typography key={idx} color="text.primary" sx={{ fontSize: '0.8rem' }}>
            {item.label}
          </Typography>
        ),
      )}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
