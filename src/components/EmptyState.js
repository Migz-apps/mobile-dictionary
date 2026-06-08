import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../utils/theme';

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📖</Text>
      <Text style={styles.text}>Search for any English word to get started</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 20,
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    ...typography.body,
  },
});
