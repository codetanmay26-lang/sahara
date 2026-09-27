import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface AudioTrack {
  id?: string;
  src: string;
  title: string;
  artist?: string;
  category?: string;
}

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  error: string | null;
  playTrack: (track: AudioTrack) => void;
  pauseTrack: () => void;
  stopTrack: () => void;
  seekTrack: (time: number) => void;
  setVolume: (vol: number) => void;
  clearError: () => void;
  replayTrack: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Instantiate a single global Audio instance at module level to guarantee exactly one active engine.
const globalAudio = new Audio();

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [error, setError] = useState<string | null>(null);

  const removeListenersRef = useRef<(() => void) | null>(null);
  const addListenersRef = useRef<(() => void) | null>(null);
  const currentTrackRef = useRef<AudioTrack | null>(null);

  const safePlay = () => {
    setError(null);
    const playPromise = globalAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        if (err.name !== 'AbortError') {
          console.warn('Playback start failed:', err);
          setError('Audio unavailable');
          setIsPlaying(false);
        }
      });
    }
  };

  useEffect(() => {
    // Set initial volume
    globalAudio.volume = volume;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(globalAudio.currentTime);
    const handleDurationChange = () => setDuration(globalAudio.duration || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handleError = (e: any) => {
      console.error('Global Audio Element Error:', e);
      setError('Audio unavailable');
      setIsPlaying(false);
    };
    const handleLoadedMetadata = () => {
      setDuration(globalAudio.duration || 0);
    };
    const handleCanPlay = () => {
      setError(null);
    };
    const handleProgress = () => {};
    const handleWaiting = () => {};
    const handlePlaying = () => setIsPlaying(true);

    const removeAllListeners = () => {
      globalAudio.removeEventListener('play', handlePlay);
      globalAudio.removeEventListener('pause', handlePause);
      globalAudio.removeEventListener('timeupdate', handleTimeUpdate);
      globalAudio.removeEventListener('durationchange', handleDurationChange);
      globalAudio.removeEventListener('ended', handleEnded);
      globalAudio.removeEventListener('error', handleError);
      globalAudio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      globalAudio.removeEventListener('canplay', handleCanPlay);
      globalAudio.removeEventListener('progress', handleProgress);
      globalAudio.removeEventListener('waiting', handleWaiting);
      globalAudio.removeEventListener('playing', handlePlaying);
    };

    const addAllListeners = () => {
      globalAudio.addEventListener('play', handlePlay);
      globalAudio.addEventListener('pause', handlePause);
      globalAudio.addEventListener('timeupdate', handleTimeUpdate);
      globalAudio.addEventListener('durationchange', handleDurationChange);
      globalAudio.addEventListener('ended', handleEnded);
      globalAudio.addEventListener('error', handleError);
      globalAudio.addEventListener('loadedmetadata', handleLoadedMetadata);
      globalAudio.addEventListener('canplay', handleCanPlay);
      globalAudio.addEventListener('progress', handleProgress);
      globalAudio.addEventListener('waiting', handleWaiting);
      globalAudio.addEventListener('playing', handlePlaying);
    };

    removeListenersRef.current = removeAllListeners;
    addListenersRef.current = addAllListeners;

    addAllListeners();

    return () => {
      globalAudio.pause();
      removeAllListeners();
    };
  }, []);

  const playTrack = (track: AudioTrack) => {
    setError(null);

    const isSameTrack = currentTrackRef.current?.src === track.src;

    if (isSameTrack) {
      if (globalAudio.paused) {
        setIsPlaying(true);
        safePlay();
      }
      return;
    }

    try {
      // PLAY RULE: Stop current playback, remove old listeners, load new source, play.
      globalAudio.pause();
      globalAudio.currentTime = 0;

      if (removeListenersRef.current) {
        removeListenersRef.current();
      }

      globalAudio.src = track.src;
      globalAudio.load();

      if (addListenersRef.current) {
        addListenersRef.current();
      }

      setCurrentTrack(track);
      currentTrackRef.current = track;
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(true);

      safePlay();
    } catch (err) {
      console.error('Error playing track:', err);
      setError('Audio unavailable');
      setIsPlaying(false);
    }
  };

  const pauseTrack = () => {
    // PAUSE RULE: Pause audio instantly, freeze progress, preserve timestamp, not restart or create new process.
    globalAudio.pause();
    setIsPlaying(false);
  };

  const stopTrack = () => {
    globalAudio.pause();
    globalAudio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const seekTrack = (time: number) => {
    if (!isNaN(time) && isFinite(time)) {
      globalAudio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const replayTrack = () => {
    // REPLAY RULE: pause, currentTime = 0, play.
    globalAudio.pause();
    globalAudio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(true);
    safePlay();
  };

  const setVolume = (vol: number) => {
    const clampedVol = Math.max(0, Math.min(1, vol));
    setVolumeState(clampedVol);
    globalAudio.volume = clampedVol;
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        error,
        playTrack,
        pauseTrack,
        stopTrack,
        seekTrack,
        setVolume,
        clearError,
        replayTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
