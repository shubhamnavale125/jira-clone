import React from 'react';
import { Avatar, Tooltip, Box } from '@mui/material';
import { JUser } from '../../types';

interface UserAvatarProps {
  user: JUser;
  size?: number;
  showTooltip?: boolean;
  onClick?: () => void;
  selected?: boolean;
  testId?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 32,
  showTooltip = true,
  onClick,
  selected = false,
  testId,
}) => {
  const avatar = (
    <Avatar
      data-testid={testId || `avatar-${user.id}`}
      src={user.avatarUrl}
      alt={user.name}
      onClick={onClick}
      sx={{
        width: size,
        height: size,
        cursor: onClick ? 'pointer' : 'default',
        border: selected ? '2px solid #0052CC' : 'none',
        boxSizing: 'border-box',
        transition: 'box-shadow 0.15s ease, opacity 0.15s ease',
        '&:hover': onClick ? { boxShadow: '0 0 0 2px #0052CC', opacity: 0.95 } : {},
      }}
    />
  );

  if (showTooltip) {
    return (
      <Tooltip title={user.name} arrow>
        <Box component="span" sx={{ display: 'inline-block' }}>
          {avatar}
        </Box>
      </Tooltip>
    );
  }

  return avatar;
};

export default UserAvatar;
