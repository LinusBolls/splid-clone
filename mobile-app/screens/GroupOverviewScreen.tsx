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
    ...groupsStore.groups.map((i) => ({
      ...i,
      totalAmount: activities
        .filter((j) => j.groupId === i.id)
        .reduce((sum, i) => sum + i.totalAmount, 0),
      activities: activities.filter((j) => j.groupId === i.id),
    })),
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

  const [outerWidth, setOuterWidth] = useState(0);

  const [anim, setAnim] = useState<any>(null);

  const renderIndicator = (
    props: SceneRendererProps & {
      navigationState: { index: number; routes: { key: string }[] };
      getTabWidth: (i: number) => number;
    }
  ) => {
    const inputRange = props.navigationState.routes.map((_, i) => i);

    const translateXOutputRange = inputRange.map(
      (i) =>
        (props.navigationState.routes
          .slice(0, i)
          .reduce((totalWidth, j) => totalWidth + tabWidths[j.key], 0) || 0) *
        (I18nManager.isRTL ? -1 : 1)
    );

    const widthOutputRange = inputRange.map(
      (i) => (tabWidths[props.navigationState.routes[i].key] || 0) / 100
    );

    const translateX = props.position.interpolate({
      inputRange,
      outputRange: translateXOutputRange,
    });

    if (!anim) {
      console.log('test');

      // setAnim(props.position.interpolate({
      //   inputRange,
      //   outputRange: inputRange.map(
      //     (i) =>
      //       (props.navigationState.routes
      //         .slice(0, i)
      //         .reduce((totalWidth, j) => totalWidth + tabWidths[j.key], 0) || 0) *
      //       (I18nManager.isRTL ? -1 : 1) * -1
      //   ),
      // }));
      setAnim(translateX);
    }

    const scaleX = props.position.interpolate({
      inputRange,
      outputRange: widthOutputRange,
    });

    // const [current, setCurrent] = useState(new Animated.Value(0));

    // Animated.timing(current, {
    //   toValue: 100,
    //   duration: 100,
    //   useNativeDriver: false,
    // }).start();

    return (
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Animated.View
          style={{
            backgroundColor: 'white',
            width: 100,
            height: 48,
            // borderRadius: 24,
            transform: [
              { translateX: -50 }, // Move the pivot point to the middle left
              { scaleX },
              { translateX: 50 }, // Move the pivot point back
            ],
          }}
          onLayout={(event) => {
            setOuterWidth(event.nativeEvent.layout.width);
          }}
        />
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

    const totalWidth =
      props.navigationState.routes.reduce(
        (totalWidth, j) => totalWidth + tabWidths[j.key],
        0
      ) || 0;

    const maxOffset = totalWidth - props.layout.width;

    const leftOrRight = I18nManager.isRTL ? 1 : -1;

    const translateXOutputRange = inputRange.map((i) => {
      const ratioBetween0And1 = (1 / props.navigationState.routes.length) * i;

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

          width: totalWidth,
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
                  height: 48,
                  paddingHorizontal: 12,
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
