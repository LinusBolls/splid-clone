/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { ColorSchemeName } from 'react-native';

import CreateNewGroup from '../screens/CreateNewGroup';
import EditExpenseModal from '../screens/EditExpenseModal';
import EditExpenseScreen from '../screens/EditExpenseScreen';
import GroupOverviewScreen from '../screens/GroupOverviewScreen';
import SwipeActivitiesModal from '../screens/SwipeActivitiesModal';
import { useNavigation } from '../stores/navigationStore';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

maybeCompleteAuthSession();

function RootNavigator() {
  const navigationStore = useNavigation();

  const activeGroupId = navigationStore.activeGroupId;

  if (!activeGroupId) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="CreateGroup"
          component={CreateNewGroup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={GroupOverviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateExpense"
        component={EditExpenseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Modal"
          component={EditExpenseModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SwipeActivitiesModal"
          component={SwipeActivitiesModal}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}
