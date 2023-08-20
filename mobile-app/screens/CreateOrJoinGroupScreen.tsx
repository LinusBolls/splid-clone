import { Pressable, Text, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CreateOrJoinGroupScreen({ navigation }: any) {
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
        <Pressable
          onPress={() => navigation.navigate('CreateGroup')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',

            height: 48,
            paddingHorizontal: 16,

            backgroundColor: 'white',

            borderWidth: 1,

            borderColor: '#C4C4C4',

            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,

              color: '#222',
            }}
          >
            Create a new group
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('JoinGroup')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',

            height: 48,
            paddingHorizontal: 16,

            backgroundColor: 'white',

            borderWidth: 1,

            borderColor: '#C4C4C4',

            borderRadius: 8,

            marginTop: 16,
          }}
        >
          <Text
            style={{
              fontSize: 16,

              color: '#222',
            }}
          >
            Join an existing group
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
