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
import { QueryClient, QueryClientProvider } from 'react-query';

import useFetchExpenseCategories from '../fetching/useFetchExpenseCategories';
import useFetchGroups from '../fetching/useFetchGroups';
import CreateNewGroup from '../screens/CreateNewGroup';
import CreateOrJoinGroupScreen from '../screens/CreateOrJoinGroupScreen';
import EditExpenseModal from '../screens/EditExpenseModal';
import EditExpenseScreen from '../screens/EditExpenseScreen';
import ErrorScreen from '../screens/ErrorScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import GroupOverviewScreen from '../screens/GroupOverviewScreen';
import JoinGroupScreen from '../screens/JoinGroupScreen';
import SwipeActivitiesModal from '../screens/SwipeActivitiesModal';
import { useGroupsStore } from '../stores/groupsStore';
import { useNavigation } from '../stores/navigationStore';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
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

  const groupsStore = useGroupsStore();

  const activeGroupId = navigationStore.activeGroupId;

  const dong = useFetchGroups();

  const ding = useFetchExpenseCategories();

  if (dong.hasGroupsError || ding.hasCategoriesError) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={ErrorScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  if (!activeGroupId) {
    if (groupsStore.groups.length) {
      navigationStore.actions.setActiveGroupId(groupsStore.groups[0].id);
    }
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="CreateOrJoinGroup"
          component={CreateOrJoinGroupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateGroup"
          component={CreateNewGroup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JoinGroup"
          component={JoinGroupScreen}
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
        name="GroupInfo"
        component={GroupInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateExpense"
        component={EditExpenseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateGroup"
        component={CreateNewGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JoinGroup"
        component={JoinGroupScreen}
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
