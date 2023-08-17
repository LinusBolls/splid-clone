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
import uuid from 'react-native-uuid';

import ExpensesContext from '../contexts/expenses.context';
import EditExpenseModal from '../screens/EditExpenseModal';
import EditExpenseScreen from '../screens/EditExpenseScreen';
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
  return (
    <ExpensesContext.Provider
      value={{
        expenses: [
          {
            id: uuid.v4() as string,

            title: '',

            price: 3,
          },
        ],
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={EditExpenseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="Modal"
            component={EditExpenseModal}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </ExpensesContext.Provider>
  );
}
