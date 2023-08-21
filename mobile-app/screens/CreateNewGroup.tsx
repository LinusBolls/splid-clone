import { useEffect, useRef } from 'react';
import { Linking, Pressable, ScrollView, Text, TextInput } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Button from '../components/Button';
import { View } from '../components/Themed';
import useCreateGroup from '../fetching/useCreateGroup';
import useGroupDraftStore from '../stores/groupDraftStore';
import { useGroupMembersStore } from '../stores/groupMembersStore';
import { useGroupsStore } from '../stores/groupsStore';
import { useIdentity } from '../stores/identityStore';
import { useNavigation } from '../stores/navigationStore';

const causeHapticBump = () =>
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });

export default function CreateNewGroup({ navigation }: any) {
  const groupStore = useGroupsStore();

  const navigationStore = useNavigation();

  const groupDraftStore = useGroupDraftStore();

  async function openPaypal() {
    const url = `https://www.paypal.com/paypalme/LinusBolls/420.69EUR`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      alert(`Don't know how to open this URL: ${url}`);
    }
  }
  const createGroupMutation = useCreateGroup();

  async function onCreate() {
    // TODO: validate title, that all members have names, that there are > 0 group members

    const draft = groupDraftStore.actions.getDraft();

    const { group } = await createGroupMutation.mutateAsync({
      group: {
        name: draft.title,
        description: '',
        currency: 'EUR',
      },
      members: groupDraftStore.groupMembers,
    });
    navigationStore.actions.setActiveGroupId(group.id);

    groupDraftStore.actions.clear();

    navigation.navigate('Root');
  }
  function onCancel() {
    navigation.goBack();
  }

  const titleInputRef = useRef<TextInput>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  return (
    <View
      style={{
        minHeight: '100%',

        backgroundColor: 'white',
      }}
    >
      <ScrollView
        style={{
          flex: 1,

          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            height: 16,

            backgroundColor: 'transparent',
          }}
        />
        <View
          style={{
            height: 48,

            backgroundColor: 'transparent',
          }}
        />
        <TextInput
          multiline
          blurOnSubmit
          selectTextOnFocus
          ref={titleInputRef}
          placeholder={'Add group title (required)'}
          style={{
            fontSize: 26,
            color: '#222',

            textAlign: 'center',

            marginBottom: 16,
          }}
          onChangeText={(text) => groupDraftStore.actions.setTitle(text)}
          value={groupDraftStore.title}
        />
        <View
          style={{
            overflow: 'hidden',

            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#eee',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              height: 48,
              paddingLeft: 16,

              backgroundColor: 'white',
            }}
          >
            <Text
              style={{
                flexGrow: 1,

                fontSize: 16,

                color: '#222',
              }}
            >
              Members ({groupDraftStore.groupMembers.length})
            </Text>
            <Pressable
              onPress={() => {
                causeHapticBump();

                groupDraftStore.actions.addEmptyGroupMember();
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',

                width: 48,
                height: 48,
              }}
            >
              <MaterialIcons name="add-circle-outline" size={20} color="#222" />
            </Pressable>
          </View>
          {groupDraftStore.groupMembers.map((i) => {
            return (
              <View
                key={i.id}
                style={{
                  flexDirection: 'row',

                  height: 48,
                  paddingLeft: 16,

                  backgroundColor: 'white',

                  borderTopColor: '#eee',
                  borderTopWidth: 1,
                }}
              >
                <View
                  style={{
                    justifyContent: 'center',

                    height: 48,
                    flexGrow: 1,

                    backgroundColor: 'transparent',
                  }}
                >
                  <TextInput
                    blurOnSubmit
                    selectTextOnFocus
                    autoCorrect={false}
                    autoCapitalize="words"
                    style={{
                      fontSize: 13,
                      color: '#222',

                      height: '100%',
                      flexGrow: 1,
                    }}
                    value={i.displayName}
                    onChangeText={(value) =>
                      groupDraftStore.actions.setGroupMemberDisplayName(
                        i.id,
                        value
                      )
                    }
                    placeholder="Add member name... (required)"
                    placeholderTextColor="#888"
                  />
                </View>
                {/* <Pressable
                style={{
                  justifyContent: 'center',

                  height: 48,
                  flexGrow: 1,
                }}
                onPress={() =>
                  groupDraftStore.actions.setGroupMemberDisplayName(
                    i.id,
                    'harbert'
                  )
                }
              >
                <View>
                  {i.displayName.length ? (
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#222',
                      }}
                    >
                      {i.displayName}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#888',
                      }}
                    >
                      Add member name... (required)
                    </Text>
                  )}
                </View>
              </Pressable> */}
                <Pressable
                  onPress={() => {
                    groupDraftStore.actions.removeGroupMember(i.id);

                    causeHapticBump();
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',

                    width: 48,
                    height: 48,
                  }}
                >
                  <MaterialIcons
                    name="remove-circle-outline"
                    size={20}
                    color="#222"
                  />
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',

          paddingHorizontal: 16,
          paddingVertical: 8,

          backgroundColor: 'transparent',

          borderTopColor: '#eee',
          borderTopWidth: 1,
        }}
      >
        <Button text="Cancel" variant="outlined" onClick={onCancel} />
        <Button
          variant="primary"
          text={(() => {
            if (createGroupMutation.isError) return 'Error';

            return 'Save';
          })()}
          isLoading={createGroupMutation.isLoading}
          onClick={onCreate}
        />
      </View>
    </View>
  );
}
