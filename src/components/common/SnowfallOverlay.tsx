import React, { useMemo } from 'react';
import { Box } from '@mui/material';

type Flake = {
  left: number;
  duration: number;
  delay: number;
  fontSize: number;
  opacity: number;
  driftX: number;
  swayMs: number;
};

const SNOWFLAKE_COUNT = 160;

const createFlakes = (): Flake[] =>
  Array.from({ length: SNOWFLAKE_COUNT }, (_, index) => {
    const seed = index + 1;

    return {
      left: (seed * 13.7) % 100,
      duration: 12 + (seed % 19),
      delay: -1 * (seed % 31),
      fontSize: 10 + (seed % 11),
      opacity: 0.14 + ((seed % 18) * 0.035),
      driftX: -8 + ((seed * 7) % 17),
      swayMs: 1800 + ((seed * 151) % 2300),
    };
  });

const SnowfallOverlay: React.FC = () => {
  const flakes = useMemo(createFlakes, []);

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 2,
        '@keyframes snowfall-fall': {
          '0%': {
            transform: 'translate3d(0, -16px, 0)',
          },
          '100%': {
            transform: 'translate3d(var(--drift-x), 105vh, 0)',
          },
        },
        '@keyframes snowfall-sway': {
          '0%': {
            marginLeft: '-2px',
          },
          '50%': {
            marginLeft: '2px',
          },
          '100%': {
            marginLeft: '-2px',
          },
        },
        '@media (prefers-reduced-motion: reduce)': {
          display: 'none',
        },
      }}
    >
      {flakes.map((flake, index) => (
        <Box
          key={index}
          sx={{
            '--drift-x': `${flake.driftX}px`,
            position: 'absolute',
            left: `${flake.left}%`,
            top: '-24px',
            color: '#A3B1BC',
            fontSize: `${flake.fontSize}px`,
            lineHeight: 1,
            opacity: flake.opacity,
            animation: `${flake.duration}s linear ${flake.delay}s infinite snowfall-fall, ${flake.swayMs}ms ease-in-out 0s infinite snowfall-sway`,
            willChange: 'transform',
          }}
        >
          {'❅'}
        </Box>
      ))}
    </Box>
  );
};

export default SnowfallOverlay;
