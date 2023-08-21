import dayjs from 'dayjs';
import { useState } from 'react';
import { Animated, I18nManager, Pressable, Text, View } from 'react-native';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';

import ActivityList, { ExpenseActivity } from '../components/ActivityList';
import { useExpenseCategoriesStore } from '../stores/expenseCategoriesStore';
import { useExpensesStore } from '../stores/expensesStore';
import { useGroupMembersStore } from '../stores/groupMembersStore';
import { useGroupsStore } from '../stores/groupsStore';
import { useNavigation } from '../stores/navigationStore';

const INDICATOR_PILL_HEIGHT = 48;

const formatPriceEur = (price: number) =>
  price.toLocaleString(undefined, { minimumFractionDigits: 2 }) + '€';

export default function GroupOverviewScreen({ navigation }: any) {
  const { activeGroupId } = useNavigation();

  const groupsStore = useGroupsStore();
  const expensesStore = useExpensesStore();
  const membersStore = useGroupMembersStore();

  const expenseCategoriesStore = useExpenseCategoriesStore();

  const expenses = expensesStore.expenses;

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
          .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))[0]?.date,
        hasActivities: activities.filter((j) => j.groupId === i.id).length > 0,
      }))
      .sort((a, b) => dayjs(a.lastUpdated).diff(dayjs(b.lastUpdated))),
  ];

  const sceneMap = tabs.reduce<any>(
    (sum, i) => ({
      ...sum,
      [i.id]: () => (
        <ActivityList
          activities={i.activities}
          onActivityClick={(activity) => {
            navigationStore.actions.setActiveExpenseId(activity.id);

            navigation.navigate('SwipeActivitiesModal');
          }}
        />
      ),
    }),
    {}
  );

  const routes = tabs.map((i) => ({
    key: i.id,
    title: i.title,
    totalAmount: i.totalAmount,
  }));

  const [index, setIndex] = useState(0);

  const renderScene = SceneMap(sceneMap);

  const renderIndicator = (
    props: SceneRendererProps & {
      navigationState: { index: number; routes: { key: string }[] };
      getTabWidth: (i: number) => number;
    }
  ) => {
    const inputRange = props.navigationState.routes.map((_, i) => i);

    const widthOfCenter = 100;

    const combinedWidthOfPillEnds = INDICATOR_PILL_HEIGHT * 2;

    const translateXOutputRange = inputRange.map(
      (i) =>
        (props.navigationState.routes
          .slice(0, i)
          .reduce((totalWidth, j) => totalWidth + tabWidths[j.key], 0) || 0) *
        (I18nManager.isRTL ? -1 : 1)
    );

    const widthOutputRange = inputRange.map(
      (i) =>
        ((tabWidths[props.navigationState.routes[i].key] || 0) -
          combinedWidthOfPillEnds) /
        widthOfCenter
    );

    const translateX = props.position.interpolate({
      inputRange,
      outputRange: translateXOutputRange,
    });

    const scaleX = props.position.interpolate({
      inputRange,
      outputRange: widthOutputRange,
    });

    const pillEndTranslateXOutputRange = inputRange.map(
      (i) =>
        (tabWidths[props.navigationState.routes[i].key] || 0) -
        combinedWidthOfPillEnds -
        widthOfCenter
    );

    const pillEndTranslateX = props.position.interpolate({
      inputRange,
      outputRange: pillEndTranslateXOutputRange,
    });

    return (
      <Animated.View
        style={{
          transform: [{ translateX }],
          flexDirection: 'row',
          height: INDICATOR_PILL_HEIGHT,
        }}
      >
        <Animated.View
          style={{
            width: INDICATOR_PILL_HEIGHT,
            height: '100%',

            borderTopLeftRadius: INDICATOR_PILL_HEIGHT / 2,
            borderBottomLeftRadius: INDICATOR_PILL_HEIGHT / 2,
            backgroundColor: 'white',
          }}
        ></Animated.View>
        <Animated.View
          style={{
            width: widthOfCenter,
            height: '100%',
            transform: [
              { translateX: -50 }, // Move the pivot point to the middle left
              { scaleX },
              { translateX: 50 }, // Move the pivot point back
            ],
            backgroundColor: 'white',
          }}
        />
        <Animated.View
          style={{
            width: INDICATOR_PILL_HEIGHT,
            height: '100%',
            transform: [{ translateX: pillEndTranslateX }],

            borderTopRightRadius: INDICATOR_PILL_HEIGHT / 2,
            borderBottomRightRadius: INDICATOR_PILL_HEIGHT / 2,
            backgroundColor: 'white',
          }}
        ></Animated.View>
      </Animated.View>
    );
  };

  const [tabWidths, setTabWidths] = useState<Record<string, number>>({});

  const updateTabWidth = (index: string, width: number) => {
    setTabWidths((prev) => {
      const newWidths = { ...prev };

      newWidths[index] = width;

      return newWidths;
    });
  };

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
        totalAmount: number;
      }>;
    }
  ) => {
    const inputRange = props.navigationState.routes.map((_, i) => i);

    const widthOfAllTabs =
      props.navigationState.routes.reduce(
        (totalWidth, j) => totalWidth + tabWidths[j.key],
        0
      ) || 0;

    const numRoutes = props.navigationState.routes.length;

    const maxOffset =
      widthOfAllTabs > props.layout.width
        ? widthOfAllTabs - props.layout.width
        : 0;

    const leftOrRight = I18nManager.isRTL ? 1 : -1;

    const translateXOutputRange = inputRange.map((i) => {
      const ratioBetween0And1 = i / (numRoutes - 1);

      return ratioBetween0And1 * maxOffset * leftOrRight;
    });

    const translateX = props.position.interpolate({
      inputRange,
      outputRange: translateXOutputRange,
    });

    return (
      <Animated.View
        style={{
          transform: [{ translateX }],

          width: widthOfAllTabs,
        }}
      >
        <TabBar
          renderIndicator={renderIndicator}
          renderTabBarItem={(itemProps) => {
            return (
              <Pressable
                onLayout={(event) => {
                  const width = event.nativeEvent.layout.width;

                  updateTabWidth(itemProps.key, width);
                }}
                onPress={itemProps.onPress}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: INDICATOR_PILL_HEIGHT,
                  paddingHorizontal: 16,

                  minWidth: INDICATOR_PILL_HEIGHT * 2,
                }}
              >
                <Text style={{ fontSize: 13, color: '#222' }}>
                  {itemProps.route.title}
                </Text>
                <Text style={{ fontSize: 10, color: '#888' }}>
                  {formatPriceEur(itemProps.route.totalAmount)}
                </Text>
              </Pressable>
            );
          }}
          {...props}
          indicatorStyle={{ backgroundColor: '#682BE9' }}
          style={{ backgroundColor: 'transparent' }}
          labelStyle={{ color: '#222', textTransform: 'none' }}
        />
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        minHeight: '100%',
        paddingHorizontal: 16,

        backgroundColor: '#F7F7F7',
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
      <Pressable onPress={() => navigation.navigate('CreateGroup')}>
        <Text style={{}}>New group</Text>
      </Pressable>
      <TabView
        style={{ width: 'auto' }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
      />
    </View>
  );
}
