import dayjs from 'dayjs';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { SceneMap, TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ActivityList, { ExpenseActivity } from '../components/ActivityList';
import FloatingActionButton from '../components/FloatingActionButton';
import IconButton from '../components/IconButton';
import getPaginationDotTabBarRenderFunction from '../components/TabBarWithPillShapedIndicator/paginationDotTabBar';
import getTabBarRenderFunction from '../components/TabBarWithPillShapedIndicator/renderTabBar';
import Format from '../constants/Format';
import { useExpenseCategoriesStore } from '../stores/expenseCategoriesStore';
import { useExpensesStore } from '../stores/expensesStore';
import { useGroupMembersStore } from '../stores/groupMembersStore';
import { useGroupsStore } from '../stores/groupsStore';
import { useNavigation } from '../stores/navigationStore';

// const INDICATOR_PILL_HEIGHT = 48;

export default function GroupOverviewScreen({ navigation }: any) {
  const { activeGroupId } = useNavigation();

  const groupsStore = useGroupsStore();
  const expensesStore = useExpensesStore();
  const membersStore = useGroupMembersStore();

  const expenseCategoriesStore = useExpenseCategoriesStore();

  const expenses = expensesStore.expenses;

  const navigationStore = useNavigation();

  const activities = expenses.map<ExpenseActivity>((i) => {
    const subexpenses = i.subExpenseIds
      .map((id) => expensesStore.subexpenses.find((j) => j.id === id)!)
      .filter(Boolean);
    const categories = i.categoryIds
      .map((id) => expenseCategoriesStore.categories.find((j) => j.id === id)!)
      .filter(Boolean);

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
      .filter(Boolean)
      .filter(
        (sponsor, index, self) =>
          index === self.findIndex((s) => s?.id === sponsor?.id)
      );
    const gainers = gainerIds
      .map((id) => membersStore.members.find((j) => j.id === id)!)
      .filter(Boolean)
      .filter(
        (sponsor, index, self) =>
          index === self.findIndex((s) => s?.id === sponsor?.id)
      );

    const totalAmount = subexpenses.reduce((sum, k) => sum + k.price, 0);

    return {
      ...i,
      groupId: i.groupId,
      totalAmount,
      amountForYou: totalAmount,
      categories: categories.map((i) => ({ id: i.id, title: i.name })),
      sponsors: sponsors.map((i) => ({
        id: i.id,
        displayName: i.name || 'Unknown',
      })),
      gainers: gainers.map((i) => ({
        id: i.id,
        displayName: i.name || 'Unknown',
      })),
    };
  });
  const totalAmount = activities.reduce((sum, i) => sum + i.amountForYou, 0);

  const tabs: {
    id: string;
    title: string;
    totalAmount: number;
    activities: ExpenseActivity[];
  }[] = [
    {
      id: 'tab:system:all',
      title: 'All',
      totalAmount: activities.reduce((sum, i) => sum + i.totalAmount, 0),
      activities: activities,
    },
    ...groupsStore.groups
      .map((i) => ({
        title: i.name,
        id: i.id,
        totalAmount: activities
          .filter((j) => j.groupId === i.id)
          .reduce((sum, i) => sum + i.totalAmount, 0),
        activities: activities.filter((j) => j.groupId === i.id),

        lastUpdated: activities
          .filter((j) => j.groupId === i.id)
          .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)) ?? -1)[0]?.date,
        hasActivities: activities.filter((j) => j.groupId === i.id).length > 0,
      }))
      .sort((a, b) => dayjs(a.lastUpdated).diff(dayjs(b.lastUpdated)) ?? -1),
  ];

  const sceneMap = tabs.reduce(
    (sum, i) => ({
      ...sum,
      [i.id]: () => (
        <View
          style={{
            position: 'relative',

            flex: 1,

            paddingHorizontal: 16,
          }}
        >
          <ScrollView
            style={{
              position: 'relative',

              flex: 1,
            }}
          >
            {i.id !== 'tab:system:all' && (
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Pressable
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',

                    height: 48,
                    paddingHorizontal: 16,

                    borderRadius: 24,
                    borderWidth: 1,
                    borderColor: '#eee',

                    flex: 1,
                  }}
                  onPress={() => navigation.navigate('GroupInfo')}
                >
                  <Text
                    style={{
                      color: '#222',
                      fontSize: 13,

                      flex: 1,
                    }}
                  >
                    {membersStore.members
                      .filter((j) => j.groupId === i.id)
                      .map((j) => j.name)
                      .join(', ')}
                  </Text>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={20}
                    color="#888"
                    style={{
                      marginLeft: 16,
                    }}
                  />
                </Pressable>
                {/* <View style={{ width: 16 }} />
              <IconButton
                icon={<MaterialIcons name="edit" size={20} color="#888" />}
                onClick={() => alert('moin')}
              /> */}
              </View>
            )}
            <ActivityList
              activities={i.activities}
              onActivityClick={(activity) => {
                navigationStore.actions.setActiveExpenseId(activity.id);

                navigation.navigate('SwipeActivitiesModal');
              }}
            />
          </ScrollView>
        </View>
      ),
    }),
    {}
  );

  const routes = tabs.map((i) => ({
    key: i.id,
    title: i.title,
    subtitle: Format.currency.EUR(i.totalAmount, true),
  }));

  const [index, setIndex] = useState(0);

  function onSwipe(swipedToIndex: number) {
    setIndex(swipedToIndex);
  }

  const renderScene = SceneMap(sceneMap);

  return (
    <View
      style={{
        minHeight: '100%',

        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          height: 48,
        }}
      />
      <View
        style={{
          flexDirection: 'row',

          height: 48,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: '500',

              color: '#222',
            }}
          >
            {Format.currency.EUR(totalAmount, true)}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '500',

              color: '#888',
            }}
          >
            Total balance
          </Text>
        </View>
      </View>
      <View style={{ height: 16 }} />
      <View
        style={{
          position: 'relative',

          flex: 1,
        }}
      >
        <TabView
          navigationState={{ index, routes }}
          onSwipeStart={() => {
            ReactNativeHapticFeedback.trigger('impactLight', {
              enableVibrateFallback: true,
              ignoreAndroidSystemSettings: false,
            });
          }}
          onIndexChange={onSwipe}
          renderScene={renderScene}
          renderTabBar={getTabBarRenderFunction(48, () =>
            navigation.navigate('CreateGroup')
          )}
        />
        <FloatingActionButton
          onClick={() => navigation.navigate('CreateExpense')}
          text={<MaterialIcons name="add" size={32} color="white" />}
        />
      </View>
    </View>
  );
}
