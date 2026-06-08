import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@lexi_history';

export async function saveHistory(history) {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.warn('Failed to save history:', error);
  }
}

export async function loadHistory() {
  try {
    const stored = await AsyncStorage.getItem(HISTORY_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Failed to load history:', error);
    return [];
  }
}

export async function clearHistory() {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.warn('Failed to clear history:', error);
  }
}
