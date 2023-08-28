import { Animated } from 'react-native';
import { NavigationState, SceneRendererProps } from 'react-native-tab-view';

/**
 * doesn't affect the visuals because we rescale it to fit the width of the current tab.
 */
const ORIGINAL_WIDTH_OF_PILL_BODY = 100;

const borderColor = '#eee';
const backgroundColor = 'white';

const getIndicatorRenderFunction =
  (tabWidths: Record<string, number>, height: number, color: string) =>
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
    const routes = props.navigationState.routes;

    const inputRange = routes.map((_, i) => i);

    const widthOfBothPillCaps = height * 2;

    /**
     * maps every tab to the combined width of the tabs before it.
     */
    const indicatorTranslateXOutputRange = routes.map((_, routeIdx) => {
      const previousRoutes = routes.slice(0, routeIdx);

      const combinedWidthOfPreviousTabs = previousRoutes.reduce(
        (sum, i) => sum + tabWidths[i.key] || 0,
        0
      );

      return combinedWidthOfPreviousTabs;
    });
    const indicatorTranslateX = props.position.interpolate({
      inputRange,
      outputRange: indicatorTranslateXOutputRange,
    });

    /**
     * maps every tab to the factor by which the pill body should stretch.
     */
    const pillBodyScaleXOutputRange = routes.map((route) => {
      const widthOfTab = tabWidths[route.key] || 0;

      // `scaleX` takes a factor by which to rescale the item, so we divide by `ORIGINAL_WIDTH_OF_PILL_BODY`
      return (widthOfTab - widthOfBothPillCaps) / ORIGINAL_WIDTH_OF_PILL_BODY;
    });
    const pillBodyScaleX = props.position.interpolate({
      inputRange,
      outputRange: pillBodyScaleXOutputRange,
    });

    /**
     * maps every tab to the difference between the original width of the
     * pill body, and the width of the pill body that is stretched to fit the tab.
     */
    const rightPillCapTranslateXOutputRange = routes.map((route, routeId) => {
      return (
        ORIGINAL_WIDTH_OF_PILL_BODY * pillBodyScaleXOutputRange[routeId] -
        ORIGINAL_WIDTH_OF_PILL_BODY
      );
      //   const widthOfTab = tabWidths[route.key] || 0;

      //   return widthOfTab - widthOfBothPillCaps - ORIGINAL_WIDTH_OF_PILL_BODY;
    });
    const rightPillCapTranslateX = props.position.interpolate({
      inputRange,
      outputRange: rightPillCapTranslateXOutputRange,
    });

    return (
      <Animated.View
        style={{
          transform: [{ translateX: indicatorTranslateX }],

          flexDirection: 'row',

          height: height,
        }}
      >
        <Animated.View
          style={{
            width: height,
            height: height,

            borderTopLeftRadius: height / 2,
            borderBottomLeftRadius: height / 2,
            backgroundColor: color,

            borderColor,
            borderLeftWidth: 1,
            borderTopWidth: 1,
            borderBottomWidth: 1,
          }}
        ></Animated.View>
        <Animated.View
          style={{
            transform: [
              { translateX: -50 }, // Move the pivot point to the middle left
              { scaleX: pillBodyScaleX },
              { translateX: 50 }, // Move the pivot point back
            ],

            width: ORIGINAL_WIDTH_OF_PILL_BODY,
            height: height,

            backgroundColor: color,

            borderColor,
            borderTopWidth: 1,
            borderBottomWidth: 1,
          }}
        />
        <Animated.View
          style={{
            transform: [{ translateX: rightPillCapTranslateX }],

            width: height,
            height: height,

            borderTopRightRadius: height / 2,
            borderBottomRightRadius: height / 2,
            backgroundColor: color,

            borderColor,
            borderRightWidth: 1,
            borderTopWidth: 1,
            borderBottomWidth: 1,
          }}
        ></Animated.View>
      </Animated.View>
    );
  };
export default getIndicatorRenderFunction;
