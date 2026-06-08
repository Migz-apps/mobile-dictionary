import { useState, useEffect, useCallback, useRef } from 'react';
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';

const PLAYBACK_STATUS_UPDATE = 'playbackStatusUpdate';

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
  const playerRef = useRef(null);
  const subscriptionRef = useRef(null);

  const isPlaying = playbackState === PLAYBACK_STATE.PLAYING;
  const isPaused = playbackState === PLAYBACK_STATE.PAUSED;
  const isLoading = playbackState === PLAYBACK_STATE.LOADING;

  const cleanupPlayer = useCallback(() => {
    if (subscriptionRef.current) {
      subscriptionRef.current.remove();
      subscriptionRef.current = null;
    }
    if (playerRef.current) {
      try {
        playerRef.current.remove();
      } catch (e) {
        console.warn('Failed to remove audio player:', e);
      }
      playerRef.current = null;
    }
  }, []);

  const stopAudio = useCallback(async () => {
    if (playerRef.current) {
      try {
        playerRef.current.pause();
        await playerRef.current.seekTo(0);
      } catch (e) {
        console.warn('Failed to stop audio:', e);
      }
    }
    cleanupPlayer();
    setCurrentUrl(null);
    setPlaybackState(PLAYBACK_STATE.IDLE);
  }, [cleanupPlayer]);

  const pauseAudio = useCallback(async () => {
    if (!playerRef.current || playbackState !== PLAYBACK_STATE.PLAYING) return;

    try {
      playerRef.current.pause();
      setPlaybackState(PLAYBACK_STATE.PAUSED);
    } catch (e) {
      console.warn('Failed to pause audio:', e);
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
          playerRef.current
        ) {
          playerRef.current.play();
          setPlaybackState(PLAYBACK_STATE.PLAYING);
          return;
        }

        await stopAudio();
        setPlaybackState(PLAYBACK_STATE.LOADING);
        setCurrentUrl(url);

        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: false,
        });

        const player = createAudioPlayer(url, { downloadFirst: true });
        playerRef.current = player;

        subscriptionRef.current = player.addListener(
          PLAYBACK_STATUS_UPDATE,
          (status) => {
            if (status.isBuffering && !status.playing) {
              setPlaybackState(PLAYBACK_STATE.LOADING);
              return;
            }

            if (status.didJustFinish) {
              setPlaybackState(PLAYBACK_STATE.IDLE);
              setCurrentUrl(null);
              cleanupPlayer();
              return;
            }

            if (status.playing) {
              setPlaybackState(PLAYBACK_STATE.PLAYING);
            } else if (status.paused) {
              setPlaybackState(PLAYBACK_STATE.PAUSED);
            }
          }
        );

        player.play();
        setPlaybackState(PLAYBACK_STATE.PLAYING);
      } catch (e) {
        console.warn('Audio playback error:', e);
        setError('Unable to play pronunciation audio.');
        setPlaybackState(PLAYBACK_STATE.IDLE);
        setCurrentUrl(null);
        cleanupPlayer();
      }
    },
    [currentUrl, playbackState, stopAudio, cleanupPlayer]
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
      stopAudio();
    };
  }, [stopAudio]);

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
