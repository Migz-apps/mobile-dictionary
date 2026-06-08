import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../utils/theme';
import SearchScreen from '../screens/SearchScreen';
import WordDetailScreen from '../screens/WordDetailScreen';
import HistoryDrawer from '../screens/HistoryDrawer';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="WordDetail" component={WordDetailScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <HistoryDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {
          width: 280,
          backgroundColor: colors.surface,
        },
        drawerType: 'front',
        overlayColor: 'rgba(0, 0, 0, 0.6)',
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen name="Main" component={StackNavigator} />
    </Drawer.Navigator>
  );
}
