import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

export default function JoinGroupScreen({ navigation }: any) {
  const titleInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const [inviteCode, setInviteCode] = useState('');

  return (
    <View
      style={{
        minHeight: '100%',

        backgroundColor: 'white',

        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextInput
        blurOnSubmit
        ref={titleInputRef}
        selectTextOnFocus
        placeholder={'Invite code'}
        style={{
          fontSize: 26,
          color: '#222',

          textAlign: 'center',
        }}
        value={inviteCode}
        onChangeText={setInviteCode}
      />
    </View>
  );
}
