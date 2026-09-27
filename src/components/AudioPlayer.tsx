import React from 'react';
import { Play, Pause, Volume2, RotateCcw, SkipForward } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface AudioPlayerProps {
  src: string;
  title: string;
  artist: string;
  isPlaying: boolean;
  onPlayPauseToggle: (playing: boolean) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title,
  artist,
  onPlayPauseToggle
}) => {
  const {
    currentTrack,
    isPlaying: globalIsPlaying,
    currentTime,
    duration,
    volume,
    error,
    seekTrack,
    setVolume
  } = useAudio();

  const isCurrentActive = currentTrack?.src === src;
  const activeIsPlaying = isCurrentActive && globalIsPlaying;

  const handlePlayPauseToggle = () => {
    onPlayPauseToggle(!activeIsPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekTrack(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSkip = (seconds: number) => {
    let nextTime = currentTime + seconds;
    if (nextTime < 0) nextTime = 0;
    if (nextTime > duration) nextTime = duration;
    seekTrack(nextTime);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      className="glass-card" 
      style={{ 
        padding: '1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        borderLeft: '5px solid var(--color-secondary)',
        background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
        textAlign: 'left'
      }}
    >
      {/* Track info & visualizer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          {error && isCurrentActive ? (
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-danger)', textTransform: 'uppercase' }}>
              Audio unavailable
            </span>
          ) : (
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-secondary-dark)', textTransform: 'uppercase' }}>
              Now Playing
            </span>
          )}
          <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.1rem 0' }}>{title}</h4>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{artist}</span>
        </div>

        {/* Dynamic Waveform Visualizer */}
        {activeIsPlaying ? (
          <div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '32px' }}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '3px',
                  height: '100%',
                  backgroundColor: 'var(--color-secondary)',
                  borderRadius: '2px',
                  transform: 'scaleY(0.3)',
                  animation: 'pulse-soft 1.2s infinite ease-in-out',
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '32px' }}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '3px',
                  height: '12px',
                  backgroundColor: 'var(--border-color)',
                  borderRadius: '2px'
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Progress timeline seeker */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <input
          type="range"
          min="0"
          max={isCurrentActive ? (duration || 100) : 100}
          value={isCurrentActive ? currentTime : 0}
          onChange={isCurrentActive ? handleSeek : undefined}
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '10px',
            backgroundColor: 'var(--border-color)',
            outline: 'none',
            cursor: 'pointer',
            accentColor: 'var(--color-secondary)'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          <span>{formatTime(isCurrentActive ? currentTime : 0)}</span>
          <span>{formatTime(isCurrentActive ? duration : 0)}</span>
        </div>
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
        {/* Play/Pause/Skip buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => handleSkip(-10)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Rewind 10 seconds"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={handlePlayPauseToggle}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-secondary)',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {activeIsPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '3px' }} />}
          </button>

          <button
            onClick={() => handleSkip(10)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Fast forward 10 seconds"
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Volume controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '110px' }}>
          <Volume2 size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              width: '70px',
              height: '4px',
              borderRadius: '10px',
              backgroundColor: 'var(--border-color)',
              outline: 'none',
              cursor: 'pointer',
              accentColor: 'var(--color-secondary)'
            }}
          />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', minWidth: '24px' }}>
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
