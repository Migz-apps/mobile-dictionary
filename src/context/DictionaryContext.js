import React, { createContext, useContext } from 'react';
import { useDictionary } from '../hooks/useDictionary';

const DictionaryContext = createContext(null);

export function DictionaryProvider({ children }) {
  const dictionary = useDictionary();
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionaryContext() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionaryContext must be used within DictionaryProvider');
  }
  return context;
}
