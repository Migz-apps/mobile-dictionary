import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { colors, typography } from '../utils/theme';
import { useDictionaryContext } from '../context/DictionaryContext';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

export default function SearchScreen({ navigation }) {
  const { loading, error, searchWord, searchHistory, lastSearchedWord } =
    useDictionaryContext();

  const handleSearch = useCallback(
    async (word) => {
      const result = await searchWord(word);
      if (result) {
        navigation.navigate('WordDetail', { wordData: result });
      }
    },
    [searchWord, navigation]
  );

  const handleRetry = useCallback(() => {
    if (lastSearchedWord) {
      handleSearch(lastSearchedWord);
    }
  }, [lastSearchedWord, handleSearch]);

  const recentSearches = searchHistory.slice(0, 5);

  return (
    <View style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('History')}
            style={styles.menuButton}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.title}>LexiDict</Text>
          <View style={styles.menuButton} />
        </View>

        <SearchBar onSubmit={handleSearch} />

        {recentSearches.length > 0 && !loading && !error && (
          <View style={styles.recentContainer}>
            <Text style={styles.recentLabel}>Recent</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
            >
              {recentSearches.map((word) => (
                <TouchableOpacity
                  key={word}
                  style={styles.chip}
                  onPress={() => handleSearch(word)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.chipText}>{word}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.content}>
          {loading && <LoadingSpinner />}
          {!loading && error && (
            <ErrorState
              title={error.title}
              message={error.message}
              onRetry={error.type !== 'validation' ? handleRetry : undefined}
            />
          )}
          {!loading && !error && <EmptyState />}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 22,
    color: colors.textPrimary,
  },
  title: {
    fontSize: 22,
    color: colors.primary,
    ...typography.title,
  },
  recentContainer: {
    marginTop: 20,
    paddingLeft: 24,
  },
  recentLabel: {
    color: colors.textSecondary,
    marginBottom: 10,
    ...typography.sectionHeader,
    fontSize: 11,
  },
  chipsRow: {
    paddingRight: 24,
    flexDirection: 'row',
  },
  chip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    marginRight: 8,
  },
  chipText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
});
