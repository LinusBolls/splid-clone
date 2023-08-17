import { Pressable, Text, View } from 'react-native';

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
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        marginRight: 8,
        marginTop: 8,

        height: 32,
        paddingRight: 16,
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

          color: isActive ? '#682BE9' : '#222',
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
