import React, { useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native';

export interface IconButtonProps {
  onClick: () => void;

  isLoading?: boolean;
  disabled?: boolean;

  icon: any;

  variant?: 'primary' | 'outlined';
  size?: 'large' | 'small';
}
const IconButton = ({
  onClick,
  isLoading = false,
  disabled = false,
  variant = 'outlined',
  icon,
  size = 'small',
}: IconButtonProps) => {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    alignSelf: 'flex-start',

    width: 48,
    height: 48,

    borderRadius: 24,

    // marginLeft: 16,

    transform: [{ scale }],

    ...(variant === 'primary'
      ? {
          backgroundColor: '#682BE9',
        }
      : {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#eee',
        }),
  };

  return (
    <Animated.View style={buttonStyle}>
      <Pressable
        onPress={onClick}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          position: 'relative',
          flexDirection: 'row',
        }}
      >
        {isLoading && (
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',

              left: 0,
              top: -14,

              width: '100%',
              height: '100%',
            }}
          >
            <ActivityIndicator color={'primary' ? 'white' : '#222'} />
          </View>
        )}
        {icon}
      </Pressable>
    </Animated.View>
  );
};

export default IconButton;
