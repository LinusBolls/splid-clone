import { Text, View } from 'react-native';

export default function ErrorScreen({ navigation }: any) {
  return (
    <View
      style={{
        minHeight: '100%',

        backgroundColor: 'white',

        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: 'red',

            fontWeight: '700',

            fontSize: 16,
          }}
        >
          An error occured :(
        </Text>
      </View>
    </View>
  );
}
