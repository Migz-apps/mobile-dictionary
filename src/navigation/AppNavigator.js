import React, { useMemo, useState } from 'react';
import SearchScreen from '../screens/SearchScreen';
import WordDetailScreen from '../screens/WordDetailScreen';
import HistoryScreen from '../screens/HistoryScreen';

const INITIAL_ROUTE = { name: 'Search', params: {} };

export default function AppNavigator() {
  const [stack, setStack] = useState([INITIAL_ROUTE]);
  const currentRoute = stack[stack.length - 1];

  const navigation = useMemo(
    () => ({
      navigate: (name, params = {}) => {
        setStack((previousStack) => {
          if (name === 'Search') {
            return [INITIAL_ROUTE];
          }

          return [...previousStack, { name, params }];
        });
      },
      goBack: () => {
        setStack((previousStack) => {
          if (previousStack.length <= 1) {
            return [INITIAL_ROUTE];
          }

          return previousStack.slice(0, -1);
        });
      },
    }),
    []
  );

  if (currentRoute.name === 'WordDetail') {
    return (
      <WordDetailScreen
        navigation={navigation}
        route={{ params: currentRoute.params }}
      />
    );
  }

  if (currentRoute.name === 'History') {
    return <HistoryScreen navigation={navigation} />;
  }

  return <SearchScreen navigation={navigation} />;
}
