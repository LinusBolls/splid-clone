import { Pressable, Text, View } from 'react-native';

import NumberInput from '../../NumberInput';

export interface ChipProps {
  title: string;
  isActive: boolean;
  icon?: JSX.Element;

  onPress: () => void;
}
export default function Chip({
  title,
  isActive,
  icon,

  onPress,
}: ChipProps) {
  const FEATURE_PERCENTAGE_INPUT = false;

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        marginRight: 8,
        marginTop: 8,

        height: 32,
        paddingRight: FEATURE_PERCENTAGE_INPUT ? 3 : 16,
        paddingLeft: icon ? 4 : 16,

        borderRadius: 999,
        borderWidth: 1,

        backgroundColor: isActive ? '#E8E1F9' : 'white',
        borderColor: isActive ? '#C3B0EF' : '#C4C4C4',
      }}
      onPress={onPress}
    >
      {icon}
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',

          marginRight: FEATURE_PERCENTAGE_INPUT ? 4 : 0,

          color: isActive ? '#682BE9' : '#222',
        }}
      >
        {title}
      </Text>
      {FEATURE_PERCENTAGE_INPUT && (
        <NumberInput value={33} onChange={() => {}} size="small" />
      )}
    </Pressable>
  );
}
