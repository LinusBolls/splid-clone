import { useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
} from 'react-native-tab-view';

import getIndicatorRenderFunction from './renderIndicator';

const getTabBarRenderFunction =
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

          width: combinedWidthOfAllTabs,
          paddingBottom: 16,
        }}
      >
        <TabBar
          renderIndicator={getIndicatorRenderFunction(
            tabWidths,
            height,
            'white'
          )}
          renderTabBarItem={(itemProps) => {
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
          style={{ backgroundColor: 'transparent' }}
          {...props}
        />
      </Animated.View>
    );
  };
export default getTabBarRenderFunction;
