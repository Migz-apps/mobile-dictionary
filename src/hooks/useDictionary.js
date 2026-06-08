import { useState, useEffect, useCallback } from 'react';
import { fetchWord } from '../api/dictionary';
import { validateWord } from '../utils/validators';
import { saveHistory, loadHistory, clearHistory as clearStoredHistory } from '../utils/storage';

export function useDictionary() {
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [lastSearchedWord, setLastSearchedWord] = useState('');

  useEffect(() => {
    loadHistory().then(setSearchHistory);
  }, []);

  const updateHistory = useCallback(async (word) => {
    const normalized = word.toLowerCase();

    setSearchHistory((prev) => {
      const filtered = prev.filter((w) => w.toLowerCase() !== normalized);
      const updated = [word, ...filtered];
      saveHistory(updated);
      return updated;
    });
  }, []);

  const searchWord = useCallback(
    async (word) => {
      const trimmed = (word || '').trim();
      setLastSearchedWord(trimmed);

      const validation = validateWord(trimmed);
      if (!validation.valid) {
        setError({
          type: 'validation',
          title: 'Invalid Input',
          message: validation.error,
        });
        setWordData(null);
        return null;
      }

      setLoading(true);
      setError(null);
      setWordData(null);

      try {
        const data = await fetchWord(trimmed);
        const entry = Array.isArray(data) ? data[0] : data;
        setWordData(entry);
        await updateHistory(entry.word || trimmed);
        return entry;
      } catch (err) {
        if (err.response?.status === 404) {
          setError({
            type: 'not_found',
            title: 'Word Not Found',
            message: `We couldn't find '${trimmed}'. Check the spelling and try again.`,
          });
        } else if (err.code === 'ECONNABORTED' || !err.response) {
          setError({
            type: 'network',
            title: 'Connection Error',
            message: 'Please check your internet connection and try again.',
          });
        } else {
          setError({
            type: 'unknown',
            title: 'Something went wrong',
            message: 'An unexpected error occurred.',
          });
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    [updateHistory]
  );

  const clearHistory = useCallback(async () => {
    await clearStoredHistory();
    setSearchHistory([]);
  }, []);

  return {
    wordData,
    loading,
    error,
    searchWord,
    searchHistory,
    clearHistory,
    lastSearchedWord,
  };
}
