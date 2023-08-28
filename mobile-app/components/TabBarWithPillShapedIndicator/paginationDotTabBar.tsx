import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
} from 'react-native-tab-view';

import PaginationDot from '../Pagination-Dots';
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

    const activeRouteIdxToDotSizes: Record<number, number[]> = routes.map(
      (_, routeIdx) => {
        return routes.map((_, activeRouteIdx) => {
          const distanceFromActiveDot = Math.abs(routeIdx - activeRouteIdx);

          const isAfterActiveDot = routeIdx < activeRouteIdx;
          const isBeforeActiveDot = routeIdx > activeRouteIdx;

          const isOneOfTheFirst = activeRouteIdx < 3;

          if (routes.length < 5) return DotSize.LARGE / DotSize.SMALL;
          if (distanceFromActiveDot === 0) return DotSize.LARGE / DotSize.SMALL;
          if (distanceFromActiveDot < 3 && isBeforeActiveDot)
            return DotSize.LARGE / DotSize.SMALL;
          if (isOneOfTheFirst && isAfterActiveDot)
            return DotSize.LARGE / DotSize.SMALL;

          if (distanceFromActiveDot === 1 || activeRouteIdx < 4)
            return DotSize.MEDIUM / DotSize.SMALL;

          return 1;
        });
      }
    );

    (props.position as Animated.AnimatedInterpolation<number>).addListener(
      ({ value }) => {
        console.log('props.curPage updated:', value);
      }
    );

    // return <PaginationDot
    //   activeDotColor={'#7E8893'}
    //   curPage={props.position}
    //   maxPage={props.navigationState.routes.length}
    // />

    return (
      <Animated.View
        style={{
          // transform: [{ translateX }],

          width: 7 * DotSize.LARGE + 6 * 18 * 100,
        }}
      >
        <TabBar
          renderIndicator={getIndicatorRenderFunction(
            tabWidths,
            height,
            'white'
          )}
          renderTabBarItem={(itemProps) => {
            const routeIdx = routes.findIndex((i) => i.key === itemProps.key);

            // const backgroundColor = props.position.interpolate({
            //   inputRange: inputRange,
            //   outputRange: routes.map((_, routeIdx) =>
            //     routeIdx === itemIdx ? activeDotColor : inactiveDotColor
            //   ),
            // });

            const scaleOutputRange = activeRouteIdxToDotSizes[routeIdx];

            const gaps = routeIdx * 0;

            const relativeDistanceFromStart = gaps + routeIdx * DotSize.SMALL;

            const translateXOutputRange = routes.map((_, activeRouteIdx) => {
              const absoluteDistanceFromStart =
                activeRouteIdxToDotSizes[activeRouteIdx]
                  .slice(0, routeIdx)
                  .map((i) => i * DotSize.SMALL)
                  .reduce((sum, i) => sum + i, 0) + gaps;

              console.log(
                'dings:',
                routeIdx,
                absoluteDistanceFromStart,
                relativeDistanceFromStart
              );

              return 0;

              return absoluteDistanceFromStart - relativeDistanceFromStart;
            });

            const scale = props.position.interpolate({
              inputRange,
              outputRange: scaleOutputRange,
            });

            const translateX = props.position.interpolate({
              inputRange,
              outputRange: translateXOutputRange,
            });

            return (
              <Animated.View
                style={{
                  width: DotSize.SMALL,
                  height: DotSize.SMALL,

                  borderRadius: 24,

                  transform: [{ scale }],

                  // position: "absolute",

                  // left: 0,
                  // top: 0,

                  // width: 999,
                  // height: 999,

                  // zIndex: 999,

                  backgroundColor: 'orange',

                  // backgroundColor: props.position.interpolate({
                  //   inputRange: [0, routes.length],
                  //   outputRange: ['red', 'blue'],
                  // }),
                }}
              />
            );
          }}
          style={{
            backgroundColor: 'red',
            height: DotSize.LARGE,
            position: 'relative',
          }}
          {...props}
        />
      </Animated.View>
    );
  };
export default getPaginationDotTabBarRenderFunction;
