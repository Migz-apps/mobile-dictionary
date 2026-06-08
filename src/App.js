import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { colors } from './utils/theme';
import { DictionaryProvider } from './context/DictionaryContext';
import AppNavigator from './navigation/AppNavigator';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <View style={styles.root}>
      <ErrorBoundary>
        <DictionaryProvider>
          <StatusBar style="light" />
          <AppNavigator />
        </DictionaryProvider>
      </ErrorBoundary>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
