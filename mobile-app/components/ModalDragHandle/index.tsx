import { View } from 'react-native';

export default function ModalDragHandle() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
      }}
    >
      <View
        style={{
          borderRadius: 99,

          backgroundColor: '#EAEAEA',

          width: 80,
          height: 8,
        }}
      />
    </View>
  );
}
