import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../utils/theme';
import { useDictionaryContext } from '../context/DictionaryContext';
import HistoryItem from '../components/HistoryItem';

export default function HistoryDrawer(props) {
  const navigation = useNavigation();
  const { searchHistory, searchWord, clearHistory } = useDictionaryContext();

  const handleItemPress = useCallback(
    async (word) => {
      const result = await searchWord(word);
      navigation.closeDrawer();
      if (result) {
        navigation.navigate('Main', {
          screen: 'WordDetail',
          params: { wordData: result },
        });
      } else {
        navigation.navigate('Main', { screen: 'Search' });
      }
    },
    [searchWord, navigation]
  );

  const handleClearAll = useCallback(async () => {
    await clearHistory();
  }, [clearHistory]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
        style={styles.drawer}
      >
        <View style={styles.branding}>
          <Text style={styles.logo}>📚</Text>
          <Text style={styles.appName}>LexiDict</Text>
          <Text style={styles.tagline}>Your personal dictionary</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Search History</Text>
          {searchHistory.length > 0 && (
            <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
              <Text style={styles.clearButton}>Clear all</Text>
            </TouchableOpacity>
          )}
        </View>

        {searchHistory.length === 0 ? (
          <Text style={styles.emptyText}>
            No search history yet. Look up a word to get started!
          </Text>
        ) : (
          <View>
            {searchHistory.map((item, index) => (
              <HistoryItem
                key={`${item}-${index}`}
                word={item}
                onPress={handleItemPress}
              />
            ))}
          </View>
        )}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  drawer: {
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
  },
  branding: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 16,
  },
  logo: {
    fontSize: 36,
    marginBottom: 8,
  },
  appName: {
    fontSize: 24,
    color: colors.primary,
    ...typography.title,
  },
  tagline: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.textSecondary,
    ...typography.sectionHeader,
    fontSize: 11,
  },
  clearButton: {
    fontSize: 13,
    color: colors.error,
    fontWeight: '500',
  },
  emptyText: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
});
