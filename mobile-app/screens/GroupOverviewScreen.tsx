import dayjs from 'dayjs';
import { Pressable, Text, View } from 'react-native';

import ActivityList, { ExpenseActivity } from '../components/ActivityList';
import { useExpenseCategoriesStore } from '../stores/expenseCategoriesStore';
import { useExpensesStore } from '../stores/expensesStore';
import { useGroupMembersStore } from '../stores/groupMembersStore';
import { useGroupsStore } from '../stores/groupsStore';
import { useNavigation } from '../stores/navigationStore';

export default function GroupOverviewScreen({ navigation }: any) {
  const { activeGroupId } = useNavigation();

  const groupsStore = useGroupsStore();
  const expensesStore = useExpensesStore();
  const membersStore = useGroupMembersStore();

  const expenseCategoriesStore = useExpenseCategoriesStore();

  const expenses = expensesStore.expenses.filter(
    (i) => i.groupId === activeGroupId
  );

  const navigationStore = useNavigation();

  const activities = expenses.map<ExpenseActivity>((i) => {
    const subexpenses = i.subExpenseIds.map(
      (id) => expensesStore.subexpenses.find((j) => j.id === id)!
    );
    const categories = i.categoryIds.map(
      (id) => expenseCategoriesStore.categories.find((j) => j.id === id)!
    );

    const sponsorIds = i.sponsorShares.reduce<string[]>(
      (memberIds, i) => [...memberIds, i.memberId],
      []
    );
    const gainerIds = subexpenses.reduce<string[]>(
      (memberIds, i) => [...memberIds, ...i.shares.map((j) => j.memberId)],
      []
    );

    const sponsors = sponsorIds
      .map((id) => membersStore.members.find((j) => j.id === id)!)
      .filter(
        (sponsor, index, self) =>
          index === self.findIndex((s) => s?.id === sponsor?.id)
      )
      .filter((i) => i != null);

    const gainers = gainerIds
      .map((id) => membersStore.members.find((j) => j.id === id)!)
      .filter(
        (sponsor, index, self) =>
          index === self.findIndex((s) => s?.id === sponsor?.id)
      )
      .filter((i) => i != null);

    const totalAmount = subexpenses.reduce((sum, k) => sum + k.price, 0);

    return {
      ...i,
      totalAmount,
      amountForYou: totalAmount,
      categories: categories.map((i) => ({ id: i.id, title: i.displayName })),
      sponsors: sponsors.map((i) => ({
        id: i.id,
        displayName: i.displayName || 'Unknown',
      })),
      gainers: gainers.map((i) => ({
        id: i.id,
        displayName: i.displayName || 'Unknown',
      })),
    };
  });

  return (
    <View
      style={{
        minHeight: '100%',
        paddingHorizontal: 16,

        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          height: 16,
        }}
      ></View>
      <View
        style={{
          height: 48,
        }}
      ></View>
      <Pressable onPress={() => navigation.navigate('CreateExpense')}>
        <Text style={{}}>New expense</Text>
      </Pressable>
      <ActivityList
        activities={activities}
        onActivityClick={(activity) => {
          navigationStore.actions.setActiveExpenseId(activity.id);

          navigation.navigate('SwipeActivitiesModal');
        }}
      />
    </View>
  );
}

// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// const FirstTab = () => <View style={[styles.scene, { backgroundColor: 'lightblue' }]} />;
// const SecondTab = () => <View style={[styles.scene, { backgroundColor: 'lightpink' }]} />;
// const ThirdTab = () => <View style={[styles.scene, { backgroundColor: 'lightgreen' }]} />;

// const TabsExample = () => {
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'first', title: 'First' },
//     { key: 'second', title: 'Second' },
//     { key: 'third', title: 'Third' },
//   ]);

//   const renderScene = SceneMap({
//     first: FirstTab,
//     second: SecondTab,
//     third: ThirdTab,
//   });

//   const renderTabBar = props => (
//     <TabBar
//       {...props}
//       indicatorStyle={{ backgroundColor: 'blue' }} // Line color under the active tab
//       style={{ backgroundColor: 'white' }} // Tab bar background color
//       labelStyle={{ color: 'black' }} // Tab label color
//     />
//   );

//   return (
//     <TabView
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       renderTabBar={renderTabBar}
//       onIndexChange={setIndex}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   scene: {
//     flex: 1,
//   },
// });

// export default TabsExample;
