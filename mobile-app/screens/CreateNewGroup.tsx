import { useEffect, useRef } from 'react';
import { Linking, Pressable, Text, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { View } from '../components/Themed';
import useCreateGroup from '../fetching/useCreateGroup';
import useGroupDraftStore from '../stores/groupDraftStore';
import { useGroupMembersStore } from '../stores/groupMembersStore';
import { useGroupsStore } from '../stores/groupsStore';
import { useIdentity } from '../stores/identityStore';
import { useNavigation } from '../stores/navigationStore';

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
        paddingHorizontal: 16,

        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          height: 16,
        }}
      ></View>
      <View
        style={{
          height: 48,
        }}
      ></View>

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
          onPress={() => groupDraftStore.actions.addEmptyGroupMember()}
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
      <View
        style={{
          flexDirection: 'column',

          backgroundColor: '#C4C4C4',
        }}
      >
        {groupDraftStore.groupMembers.map((i) => {
          return (
            <View
              key={i.id}
              style={{
                flexDirection: 'row',

                height: 48,
                paddingLeft: 16,

                backgroundColor: 'white',

                marginTop: 1,
              }}
            >
              <View
                style={{
                  justifyContent: 'center',

                  height: 48,
                  flexGrow: 1,
                }}
              >
                <TextInput
                  blurOnSubmit
                  selectTextOnFocus
                  autoCorrect={false}
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
                onPress={() => groupDraftStore.actions.removeGroupMember(i.id)}
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',

          marginVertical: 16,

          backgroundColor: 'transparent',
        }}
      >
        <Pressable
          onPress={onCancel}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',

            alignSelf: 'flex-start',

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
            Cancel
          </Text>
        </Pressable>
        <Pressable
          onPress={onCreate}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',

            alignSelf: 'flex-start',

            height: 48,
            paddingHorizontal: 16,

            backgroundColor: '#682BE9',

            borderRadius: 8,

            marginLeft: 16,
          }}
        >
          <Text
            style={{
              fontSize: 16,

              color: 'white',
            }}
          >
            {(() => {
              if (createGroupMutation.isError) return 'Error';
              if (createGroupMutation.isLoading) return '...';

              return 'Save';
            })()}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
