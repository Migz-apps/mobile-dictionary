import React from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, typography } from '../utils/theme';
import WordHeader from '../components/WordHeader';
import MeaningCard from '../components/MeaningCard';

export default function WordDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { wordData } = route.params;

  if (!wordData) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Definition</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <WordHeader word={wordData.word} phonetics={wordData.phonetics} />

        {wordData.meanings?.map((meaning, index) => (
          <MeaningCard
            key={`${meaning.partOfSpeech}-${index}`}
            partOfSpeech={meaning.partOfSpeech}
            definitions={meaning.definitions}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: colors.primary,
    fontWeight: '300',
    marginTop: -2,
  },
  headerTitle: {
    color: colors.textSecondary,
    fontWeight: '600',
    ...typography.sectionHeader,
    fontSize: 12,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
});
