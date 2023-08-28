import { Pressable, Text, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../constants/Colors';
import Chip from './Chip';

export interface ChipMultiselectOption {
  title: string;

  value: string;

  isActive: boolean;

  icon?: JSX.Element;
}

export interface ChipMultiselectProps {
  options: ChipMultiselectOption[];
  hasAddOptionButton?: boolean;

  onOptionSelect: (option: ChipMultiselectOption) => void;
  onOptionUnselect: (option: ChipMultiselectOption) => void;
  onAddOption?: () => void;

  hasError?: boolean;
  title: string;
}
export default function ChipMultiselect({
  options,
  hasAddOptionButton = false,

  onOptionSelect,
  onOptionUnselect,
  onAddOption = () => {},
  hasError = false,
  title,
}: ChipMultiselectProps) {
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',

          height: 32,
        }}
      >
        <Text
          style={{
            color: hasError ? Colors.light.error.strong : '#222',
            fontSize: 15,
            fontWeight: '600',

            flex: 1,
          }}
        >
          {title}
        </Text>
        {hasError && (
          <MaterialIcons
            name="error"
            size={20}
            color={Colors.light.error.strong}
          />
        )}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',

          backgroundColor: 'transparent',

          marginTop: -8,
        }}
      >
        {options.map((i) => (
          <Chip
            key={i.value as string}
            {...i}
            onPress={() => {
              ReactNativeHapticFeedback.trigger('impactLight', {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: false,
              });

              i.isActive
                ? onOptionUnselect({ ...i, isActive: false })
                : onOptionSelect({ ...i, isActive: true });
            }}
          />
        ))}
        {hasAddOptionButton && (
          <Pressable
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              flexGrow: 0,
              flexShrink: 1,

              height: 32,
              paddingHorizontal: 16,

              borderRadius: 999,
              borderWidth: 1,

              backgroundColor: 'white',
              borderColor: '#C4C4C4',
            }}
            onPress={onAddOption}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',

                color: '#222',
              }}
            >
              Add option
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
