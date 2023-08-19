import { forwardRef, LegacyRef, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const formatPriceEur = (price: number) =>
  price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export interface NumberInputProps {
  placeholder?: string;

  defaultValue?: number;
  value: number;
  onChange: (value: number) => void;

  isStatic?: boolean;
}
export default forwardRef(function NumberInput(
  {
    placeholder = 'Amount',

    defaultValue = 0,
    value,
    onChange,
    isStatic = false,
  }: NumberInputProps,
  ref: LegacyRef<TextInput>
) {
  const [rawValue, setRawValue] = useState(formatPriceEur(value));

  useEffect(() => {
    setRawValue(formatPriceEur(value));
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

      return formatPriceEur(numericValue);
    });
  }

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

          height: 32,
          paddingLeft: 32,
          paddingRight: 12,

          borderRadius: 8,

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

          width: 32,
          height: 32,
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
