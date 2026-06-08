import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../utils/theme';

export default function HistoryItem({ word, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(word)} activeOpacity={0.7}>
      <Text style={styles.icon}>🔍</Text>
      <Text style={styles.word}>{word}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  icon: {
    fontSize: 14,
    marginRight: 12,
    opacity: 0.5,
  },
  word: {
    fontSize: 16,
    color: colors.textPrimary,
    ...typography.body,
  },
});
