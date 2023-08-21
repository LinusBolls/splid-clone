import React, { useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native';

export interface ButtonProps {
  onClick: () => void;

  isLoading?: boolean;
  disabled?: boolean;

  text: string;

  variant?: 'primary' | 'outlined';
}
const Button = ({
  onClick,
  isLoading = false,
  disabled = false,
  text,
  variant = 'outlined',
}: ButtonProps) => {
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

    height: 48,
    paddingHorizontal: 16,

    borderRadius: 8,

    marginLeft: 16,

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
        <Text
          style={{
            fontSize: 16,

            color: variant === 'primary' ? 'white' : '#222',

            opacity: isLoading ? 0 : 1,
          }}
        >
          {text}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default Button;
