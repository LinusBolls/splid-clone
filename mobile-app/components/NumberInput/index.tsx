import { forwardRef, LegacyRef, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import Format from '../../constants/Format';

export interface NumberInputProps {
  placeholder?: string;

  defaultValue?: number;
  value: number;
  onChange: (value: number) => void;

  isStatic?: boolean;

  size?: 'small' | 'large';
}
export default forwardRef(function NumberInput(
  {
    placeholder = 'Amount',

    defaultValue = 0,
    value,
    onChange,
    isStatic = false,
    size = 'large',
  }: NumberInputProps,
  ref: LegacyRef<TextInput>
) {
  const [rawValue, setRawValue] = useState(Format.currency.EUR(value));

  useEffect(() => {
    setRawValue(Format.currency.EUR(value));
  }, [value]);

  function onBlur() {
    setRawValue((prev) => {
      let numericValue = parseFloat(
        prev.replace(/\,/g, '.').replace(/\./g, ',')
      );

      if (typeof numericValue !== 'number' || Number.isNaN(numericValue)) {
        numericValue = defaultValue;
      }
      onChange(numericValue);

      return Format.currency.EUR(numericValue);
    });
  }

  const height = size === 'small' ? 24 : 32;

  return (
    <View style={{ position: 'relative', backgroundColor: 'none' }}>
      <TextInput
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#C3B0EF"
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',

          height: height,
          paddingLeft: height,
          paddingRight: size === 'small' ? 8 : 12,

          borderRadius: size === 'small' ? 12 : 8,

          color: '#682BE9',
          fontSize: 16,
          backgroundColor: isStatic ? 'transparent' : '#E8E1F9',
        }}
        selectTextOnFocus
        keyboardType="numeric"
        returnKeyType="done"
        onChangeText={(newValue) => setRawValue(newValue)}
        value={rawValue}
        maxLength={10} //setting limit of input
        ref={ref}
      />
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',

          width: height,
          height: height,
        }}
      >
        <Text
          style={{
            color: '#682BE9',
            fontSize: 16,
            fontWeight: '500',
          }}
        >
          €
        </Text>
      </View>
    </View>
  );
});
