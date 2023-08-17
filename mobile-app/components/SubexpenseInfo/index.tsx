import { useEffect, useRef } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ChipMultiselect from '../ChipMultiselect';
import NumberInput from '../NumberInput';

const formatPriceEur = (price: number) =>
  price.toLocaleString(undefined, { minimumFractionDigits: 2 }) + '€';

const formatPercentage = (percentage: number) =>
  percentage.toLocaleString(undefined, { maximumFractionDigits: 0 }) + '%';

export interface Gainer {
  title: string;
  value: string;

  isActive: boolean;
}

export interface SubexpenseInfoProps {
  expenseTitle: string;
  price: number;
  percentageOfTotal: number;
  selectTitle: boolean; // anytime this changes to true, the title gets selected
  selectPrice: boolean; // anytime this changes to true, the price gets selected

  gainers: Gainer[];
  onGainerSelected: (value: Gainer) => void;
  onGainerUnselected: (value: Gainer) => void;

  onDelete: () => void;
  onTitleBlur: () => void;
  onTitleChange: (value: string) => void;
  onPriceChange: (value: number) => void;
}
export default function SubexpenseInfo({
  expenseTitle,
  price,
  percentageOfTotal,
  selectTitle,
  selectPrice,

  gainers,
  onGainerSelected,
  onGainerUnselected,

  onDelete,
  onTitleBlur,
  onTitleChange,
  onPriceChange,
}: SubexpenseInfoProps) {
  const titleInputRef = useRef<TextInput>(null);
  const priceInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (selectTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [selectTitle]);

  useEffect(() => {
    if (selectPrice && priceInputRef.current) {
      priceInputRef.current.focus();
    }
  }, [selectPrice]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',

          height: 48,
          paddingHorizontal: 16,

          overflow: 'hidden',
        }}
      >
        <TextInput
          ref={titleInputRef}
          // multiline
          // blurOnSubmit
          selectTextOnFocus
          placeholder={'Add item title (required)'}
          style={{
            fontSize: 26,
            color: '#222',

            flexGrow: 1,
          }}
          value={expenseTitle}
          onChangeText={onTitleChange}
          onBlur={onTitleBlur}
        />
        <NumberInput
          value={price}
          onChange={onPriceChange}
          ref={priceInputRef}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',

          height: 16,
          paddingHorizontal: 16,

          backgroundColor: 'transparent',
        }}
      >
        <Text style={{ fontSize: 13, color: '#888' }}>
          {formatPercentage(percentageOfTotal)}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <ChipMultiselect
          options={gainers}
          onOptionSelect={onGainerSelected}
          onOptionUnselect={onGainerUnselected}
        />
      </View>
      <View
        style={{
          marginTop: 16,
          paddingHorizontal: 16,
        }}
      >
        <Pressable
          onPress={onDelete}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',

            alignSelf: 'flex-start',

            height: 48,
            paddingHorizontal: 16,

            backgroundColor: '#F7E1E0',

            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,

              color: '#EC6461',
            }}
          >
            Delete
          </Text>
          <MaterialIcons
            name="delete"
            size={20}
            color="#EC6461"
            style={{
              marginLeft: 8,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
}
