import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../utils/theme';
import { PLAYBACK_STATE } from '../hooks/useAudioPlayer';

export default function PronunciationButton({
  url,
  playbackState,
  currentUrl,
  onPress,
  size = 44,
}) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const hasAudio = Boolean(url);
  const isActive = hasAudio && currentUrl === url;
  const isPlaying = isActive && playbackState === PLAYBACK_STATE.PLAYING;
  const isPaused = isActive && playbackState === PLAYBACK_STATE.PAUSED;
  const isLoading = isActive && playbackState === PLAYBACK_STATE.LOADING;

  useEffect(() => {
    if (isPlaying) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.35,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
    pulseAnim.setValue(1);
  }, [isPlaying, pulseAnim]);

  const handlePress = () => {
    if (!hasAudio) return;
    onPress(url);
  };

  const icon = isPlaying ? '⏸' : isPaused ? '▶' : '🔊';

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      {isPlaying && (
        <Animated.View
          style={[
            styles.pulseRing,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
      )}
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          isPaused && styles.buttonPaused,
          !hasAudio && styles.buttonDisabled,
        ]}
        onPress={handlePress}
        activeOpacity={hasAudio ? 0.8 : 1}
        disabled={!hasAudio || isLoading}
        accessibilityLabel={
          !hasAudio
            ? 'Pronunciation unavailable'
            : isPlaying
            ? 'Pause pronunciation'
            : isPaused
              ? 'Resume pronunciation'
              : 'Play pronunciation'
        }
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.textPrimary} />
        ) : (
          <Text style={[styles.icon, size < 40 && styles.iconSmall]}>{icon}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseRing: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.primary,
    opacity: 0.4,
  },
  button: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPaused: {
    backgroundColor: colors.secondary,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
    opacity: 0.65,
  },
  icon: {
    fontSize: 18,
  },
  iconSmall: {
    fontSize: 14,
  },
});
