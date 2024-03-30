import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import { styled } from '@mui/material/styles';
import musicCover from '../../../assets/images/backgrounds/song.png';

const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
});

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const CalculatorWidget = () => {
  const theme = useTheme();
  const duration = 200; // seconds
  const [position, setPosition] = useState(0); // Initialize position state to 0
  const [paused, setPaused] = useState(false); // State for playback status

  // Function to format duration
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  // Function to update position every second when not paused
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!paused && position < duration) {
        setPosition(prevPosition => prevPosition + 1);
      }
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [paused, position, duration]);

  // Colors for icons
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  return (
    <DashboardCard
      title="Music Player"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
          M
        </Fab>
      }
    >
      <>
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <WallPaper />
          <Widget>
            <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
              <Box sx={{ flex: '0 0 auto', width: 100, height: 100, marginRight: 1.5 }}>
                <img
                  alt="Shape of You"
                  src={musicCover}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                  Ed Sheeran
                </Typography>
                <Typography noWrap>
                  <b></b>
                </Typography>
                <Typography noWrap letterSpacing={-0.25}>
                  Shape of You
                </Typography>
              </Box>
            </Box>
            {/* Slider for time indicator */}
            <Slider
              aria-label="time-indicator"
              size="small"
              value={position}
              min={0}
              step={1}
              max={duration}
              onChange={(_, value) => setPosition(value)}
              sx={{
                color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 8,
                  height: 8,
                  transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                  '&::before': {
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 8px ${
                      theme.palette.mode === 'dark'
                        ? 'rgb(255 255 255 / 16%)'
                        : 'rgb(0 0 0 / 16%)'
                    }`,
                  },
                  '&.Mui-active': {
                    width: 20,
                    height: 20,
                  },
                },
                '& .MuiSlider-rail': {
                  opacity: 0.28,
                },
              }}
            />
            {/* Time indicators */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: -2,
              }}
            >
              <TinyText>{formatDuration(position)}</TinyText>
              <TinyText>-{formatDuration(duration - position)}</TinyText>
            </Box>
            {/* Playback controls */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: -1,
              }}
            >
              <IconButton aria-label="previous song">
                <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
              </IconButton>
              <IconButton
                aria-label={paused ? 'play' : 'pause'}
                onClick={() => setPaused(!paused)}
              >
                {paused ? (
                  <PlayArrowRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                ) : (
                  <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                )}
              </IconButton>
              <IconButton aria-label="next song">
                <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
              </IconButton>
            </Box>
            {/* Volume control */}
            <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
              <VolumeDownRounded htmlColor={lightIconColor} />
              <Slider
                aria-label="Volume"
                defaultValue={30}
                sx={{
                  color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                  '& .MuiSlider-track': {
                    border: 'none',
                  },
                  '& .MuiSlider-thumb': {
                    width: 24,
                    height: 24,
                    backgroundColor: '#fff',
                    '&::before': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                      boxShadow: 'none',
                    },
                  },
                }}
              />
              <VolumeUpRounded htmlColor={lightIconColor} />
            </Stack>
          </Widget>
        </Box>
      </>
    </DashboardCard>
  );
};

export default CalculatorWidget;
