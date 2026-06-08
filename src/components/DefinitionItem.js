import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../utils/theme';

export default function DefinitionItem({ definition, example, index }) {
  return (
    <View style={styles.container}>
      <Text style={styles.definition}>
        <Text style={styles.number}>{index + 1}. </Text>
        {definition}
      </Text>
      {example ? (
        <View style={styles.exampleContainer}>
          <Text style={styles.example}>"{example}"</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  definition: {
    fontSize: 15,
    color: colors.textPrimary,
    ...typography.body,
  },
  number: {
    color: colors.primary,
    fontWeight: '600',
  },
  exampleContainer: {
    marginTop: 8,
    marginLeft: 16,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: colors.secondary,
  },
  example: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
