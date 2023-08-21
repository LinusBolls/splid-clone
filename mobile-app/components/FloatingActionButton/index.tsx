import { useState } from 'react';
import { Animated, Pressable, View } from 'react-native';

export interface FloatingActionButtonProps {
  text: any;

  onClick: () => {};
}
export default function FloatingActionButton({
  text,

  onClick,
}: FloatingActionButtonProps) {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const buttonStyle = {
    transform: [{ scale }],
  };

  return (
    <View
      style={{
        position: 'absolute',

        right: 16,
        bottom: 16,

        backgroundColor: 'transparent',
      }}
    >
      <Animated.View style={buttonStyle}>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',

            width: 64,
            height: 64,

            borderRadius: 32,

            // borderColor: "#eee",
            // borderWidth: 1,
            // backgroundColor: "white",

            backgroundColor: '#682BE9',
          }}
          onPress={onClick}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {text}
        </Pressable>
      </Animated.View>
    </View>
  );
}
