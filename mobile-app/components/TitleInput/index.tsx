import { forwardRef } from 'react';
import { TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../constants/Colors';

export interface TitleInputProps {
  placeholder: string;
  hasError: boolean;

  value: string;
  onChange: (value: string) => void;
}
const TitleInput = forwardRef(
  ({ placeholder, hasError, value, onChange }: TitleInputProps, ref: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
          }}
        ></View>
        <TextInput
          returnKeyType="done"
          multiline
          blurOnSubmit
          ref={ref}
          selectTextOnFocus
          placeholder={placeholder}
          placeholderTextColor={hasError ? Colors.light.error.medium : '#888'}
          style={{
            fontSize: 26,
            color: '#222',

            textAlign: 'center',

            flex: 1,
          }}
          onChangeText={onChange}
          value={value}
        />
        <View
          style={{
            width: 20,
            height: 20,
          }}
        >
          {hasError && (
            <MaterialIcons
              name="error"
              size={20}
              color={Colors.light.error.strong}
            />
          )}
        </View>
      </View>
    );
  }
);
export default TitleInput;
