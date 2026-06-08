import { useState, useEffect, useCallback, useRef } from 'react';

export const PLAYBACK_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
  PLAYING: 'playing',
  PAUSED: 'paused',
};

export function useAudioPlayer() {
  const [playbackState, setPlaybackState] = useState(PLAYBACK_STATE.IDLE);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [error, setError] = useState(null);
  const soundRef = useRef(null);

  const isPlaying = playbackState === PLAYBACK_STATE.PLAYING;
  const isPaused = playbackState === PLAYBACK_STATE.PAUSED;
  const isLoading = playbackState === PLAYBACK_STATE.LOADING;

  const unloadSound = useCallback(async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.unloadAsync();
      } catch (e) {
        console.warn('Failed to unload sound:', e);
      }
      soundRef.current = null;
    }
  }, []);

  const stopAudio = useCallback(async () => {
    if (soundRef.current) {
      try {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
          await soundRef.current.stopAsync();
        }
      } catch (e) {
        console.warn('Failed to stop sound:', e);
      }
    }
    await unloadSound();
    setCurrentUrl(null);
    setPlaybackState(PLAYBACK_STATE.IDLE);
  }, [unloadSound]);

  const pauseAudio = useCallback(async () => {
    if (!soundRef.current || playbackState !== PLAYBACK_STATE.PLAYING) return;
    try {
      await soundRef.current.pauseAsync();
      setPlaybackState(PLAYBACK_STATE.PAUSED);
    } catch (e) {
      console.warn('Failed to pause sound:', e);
    }
  }, [playbackState]);

  const playAudio = useCallback(
    async (url) => {
      if (!url) return;

      try {
        setError(null);

        if (
          currentUrl === url &&
          playbackState === PLAYBACK_STATE.PAUSED &&
          soundRef.current
        ) {
          await soundRef.current.playAsync();
          setPlaybackState(PLAYBACK_STATE.PLAYING);
          return;
        }

        await stopAudio();
        setPlaybackState(PLAYBACK_STATE.LOADING);
        setCurrentUrl(url);

        const { Audio } = await import('expo-av');

        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        const { sound } = await Audio.Sound.createAsync(
          { uri: url },
          { shouldPlay: true }
        );

        soundRef.current = sound;
        setPlaybackState(PLAYBACK_STATE.PLAYING);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isLoaded) return;

          if (status.didJustFinish) {
            setPlaybackState(PLAYBACK_STATE.IDLE);
            setCurrentUrl(null);
            unloadSound();
          } else if (status.isPlaying) {
            setPlaybackState(PLAYBACK_STATE.PLAYING);
          } else if (status.isBuffering) {
            setPlaybackState(PLAYBACK_STATE.LOADING);
          }
        });
      } catch (e) {
        console.warn('Audio playback error:', e);
        setError('Unable to play pronunciation audio.');
        setPlaybackState(PLAYBACK_STATE.IDLE);
        setCurrentUrl(null);
        await unloadSound();
      }
    },
    [currentUrl, playbackState, stopAudio, unloadSound]
  );

  const toggleAudio = useCallback(
    async (url) => {
      if (!url) return;

      if (currentUrl === url && playbackState === PLAYBACK_STATE.PLAYING) {
        await pauseAudio();
        return;
      }

      if (currentUrl === url && playbackState === PLAYBACK_STATE.PAUSED) {
        await playAudio(url);
        return;
      }

      await playAudio(url);
    },
    [currentUrl, playbackState, pauseAudio, playAudio]
  );

  useEffect(() => {
    return () => {
      unloadSound();
    };
  }, [unloadSound]);

  return {
    playAudio,
    pauseAudio,
    stopAudio,
    toggleAudio,
    playbackState,
    isPlaying,
    isPaused,
    isLoading,
    currentUrl,
    error,
  };
}
