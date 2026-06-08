import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, radii } from '../utils/theme';
import DefinitionItem from './DefinitionItem';

export default function MeaningCard({ partOfSpeech, definitions }) {
  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{partOfSpeech}</Text>
      </View>
      <View style={styles.divider} />
      {definitions.map((def, index) => (
        <DefinitionItem
          key={index}
          index={index}
          definition={def.definition}
          example={def.example}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radii.pill,
    marginBottom: 12,
  },
  badgeText: {
    color: colors.primary,
    fontWeight: '600',
    textTransform: 'lowercase',
    ...typography.sectionHeader,
    letterSpacing: 1,
    fontSize: 11,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 16,
  },
});
