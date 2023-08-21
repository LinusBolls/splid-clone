import { useState } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
} from 'react-native-tab-view';

import getIndicatorRenderFunction from './renderIndicator';

const activeDotColor = '#808892';
const inactiveDotColor = '#E5E7E9';

const DotSize = {
  SMALL: 4,
  MEDIUM: 8,
  LARGE: 12,
};

const getPaginationDotTabBarRenderFunction =
  (height: number) =>
  (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
        subtitle?: string;
        icon?: any;
      }>;
    }
  ) => {
    const [tabWidths, setTabWidths] = useState<Record<string, number>>({});

    const updateTabWidth = (key: string, width: number) => {
      setTabWidths((prev) => ({
        ...prev,
        [key]: width,
      }));
    };
    const routes = props.navigationState.routes;

    const inputRange = routes.map((_, i) => i);

    const combinedWidthOfAllTabs = routes.reduce(
      (sum, i) => sum + (tabWidths[i.key] || 0),
      0
    );
    const tabBarWidth = props.layout.width;

    const tabsAreOverflowingTheTabBar = combinedWidthOfAllTabs > tabBarWidth;

    const maxTabBarShift = tabsAreOverflowingTheTabBar
      ? tabBarWidth - combinedWidthOfAllTabs
      : 0;

    /**
     * maps every tab to the amount the tab bar should shift when it's selected.
     */
    const translateXOutputRange = routes.map((_, routeIdx) => {
      return (routeIdx < 4 ? 0 : routeIdx - 4) * -30;

      const scrollProgressBetween0And1 = routeIdx / (routes.length - 1);

      return scrollProgressBetween0And1 * maxTabBarShift;
    });

    const translateX = props.position.interpolate({
      inputRange,
      outputRange: translateXOutputRange,
    });

    return (
      <Animated.View
        style={{
          transform: [{ translateX }],

          width: 7 * DotSize.LARGE + 6 * 18,
        }}
      >
        <TabBar
          renderIndicator={getIndicatorRenderFunction(
            tabWidths,
            height,
            'white'
          )}
          renderTabBarItem={(itemProps) => {
            const itemIdx = routes.findIndex((i) => i.key === itemProps.key);

            const backgroundColor = props.position.interpolate({
              inputRange: inputRange,
              outputRange: routes.map((_, routeIdx) =>
                routeIdx === itemIdx ? activeDotColor : inactiveDotColor
              ),
            });

            const scaleOutputRange = routes.map((_, routeIdx) => {
              const distanceFromActiveDot = Math.abs(routeIdx - itemIdx);

              const isAfterActiveDot = routeIdx < itemIdx;
              const isBeforeActiveDot = routeIdx > itemIdx;

              const isOneOfTheFirst = itemIdx < 3;

              if (routes.length < 5) return DotSize.LARGE / DotSize.SMALL;
              if (distanceFromActiveDot === 0)
                return DotSize.LARGE / DotSize.SMALL;
              if (distanceFromActiveDot < 3 && isBeforeActiveDot)
                return DotSize.LARGE / DotSize.SMALL;
              if (isOneOfTheFirst && isAfterActiveDot)
                return DotSize.LARGE / DotSize.SMALL;

              if (distanceFromActiveDot === 1 || itemIdx < 4)
                return DotSize.MEDIUM / DotSize.SMALL;

              return 1;
            });

            const scale = props.position.interpolate({
              inputRange,
              outputRange: scaleOutputRange,
            });

            return (
              <Animated.View
                style={{
                  width: DotSize.SMALL,
                  height: DotSize.SMALL,
                  // backgroundColor,

                  borderRadius: 24,

                  marginLeft: 18,

                  marginVertical: 4,

                  transform: [{ scale }],

                  // backgroundColor: "red",

                  // backgroundColor: props.position.interpolate({
                  //   inputRange: [0, routes.length],
                  //   outputRange: ['red', 'blue'],
                  // }),
                }}
              ></Animated.View>
            );
            return (
              <Pressable
                onLayout={(e) => {
                  updateTabWidth(itemProps.key, e.nativeEvent.layout.width);
                }}
                onPress={itemProps.onPress}
                onLongPress={itemProps.onLongPress}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',

                  minWidth: height * 2,
                  height: height,
                  paddingRight: 16,
                  paddingLeft: itemProps.route.icon ? 0 : 16,
                }}
              >
                {itemProps.route.icon ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',

                      width: height,
                      height: height,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: 'red',
                      }}
                    />
                  </View>
                ) : null}

                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',

                    marginLeft: 4,
                  }}
                >
                  <Text style={{ fontSize: 13, color: '#222' }}>
                    {itemProps.route.title}
                  </Text>
                  <Text style={{ fontSize: 10, color: '#888' }}>
                    {itemProps.route.subtitle}
                  </Text>
                </View>
              </Pressable>
            );
          }}
          style={{ backgroundColor: 'transparent', height: DotSize.LARGE }}
          {...props}
        />
      </Animated.View>
    );
  };
export default getPaginationDotTabBarRenderFunction;
