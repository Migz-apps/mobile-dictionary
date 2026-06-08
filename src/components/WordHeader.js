import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../utils/theme';
import {
  extractAudioPronunciations,
  getPrimaryPhoneticText,
} from '../utils/audio';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import PronunciationButton from './PronunciationButton';

export default function WordHeader({ word, phonetics }) {
  const { toggleAudio, playbackState, currentUrl, error } = useAudioPlayer();

  const pronunciations = useMemo(
    () => extractAudioPronunciations(phonetics),
    [phonetics]
  );

  const primaryPhonetic = useMemo(
    () => getPrimaryPhoneticText(pronunciations, phonetics),
    [pronunciations, phonetics]
  );

  const hasAudio = pronunciations.length > 0;
  const hasMultiple = pronunciations.length > 1;

  const handleToggle = (url) => {
    toggleAudio(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.word}>{word}</Text>
        {hasAudio && !hasMultiple && (
          <PronunciationButton
            url={pronunciations[0].url}
            playbackState={playbackState}
            currentUrl={currentUrl}
            onPress={handleToggle}
          />
        )}
      </View>

      {hasMultiple ? (
        <View style={styles.pronunciationList}>
          {pronunciations.map((item, index) => (
            <View key={item.url} style={styles.pronunciationRow}>
              <View style={styles.phoneticInfo}>
                {item.text ? (
                  <Text style={styles.phonetic}>{item.text}</Text>
                ) : (
                  <Text style={styles.phoneticFallback}>
                    Pronunciation {index + 1}
                  </Text>
                )}
              </View>
              <PronunciationButton
                url={item.url}
                playbackState={playbackState}
                currentUrl={currentUrl}
                onPress={handleToggle}
                size={40}
              />
            </View>
          ))}
        </View>
      ) : (
        primaryPhonetic && (
          <Text style={styles.phoneticBelow}>{primaryPhonetic}</Text>
        )
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  word: {
    flex: 1,
    fontSize: 36,
    color: colors.textPrimary,
    ...typography.title,
  },
  phoneticBelow: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    ...typography.body,
  },
  pronunciationList: {
    marginTop: 16,
  },
  pronunciationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  phoneticInfo: {
    flex: 1,
    marginRight: 12,
  },
  phonetic: {
    fontSize: 16,
    color: colors.textSecondary,
    ...typography.body,
  },
  phoneticFallback: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  errorText: {
    marginTop: 8,
    fontSize: 13,
    color: colors.error,
  },
});
