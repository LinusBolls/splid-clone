import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ChipMultiselect from '../components/ChipMultiselect';
import ExpenseList from '../components/ExpenseList';
import { useExpenseCategoriesStore } from '../stores/expenseCategoriesStore';
import { useExpenseDraftStore } from '../stores/expenseDraftStore';
import { useExpensesStore } from '../stores/expensesStore';
import { useGroupMembersStore } from '../stores/groupMembersStore';
import { useIdentityStore } from '../stores/identityStore';
import { useNavigation } from '../stores/navigationStore';

export default function EditExpenseScreen({ navigation }: any) {
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);

  const navigationStore = useNavigation();

  const onItemClick = (item: { id: string }) => {
    navigationStore.actions.setActiveSubexpenseId(item.id);

    navigation.navigate('Modal');
  };

  const draftStore = useExpenseDraftStore();

  const categoriesStore = useExpenseCategoriesStore();

  const expensesStore = useExpensesStore();

  const membersStore = useGroupMembersStore();

  const titleInputRef = useRef<TextInput>(null);

  const members = membersStore.members.filter(
    (i) => i.groupId === navigationStore.activeGroupId
  );
  const categories = categoriesStore.categories.filter(
    (i) => i.groupId === navigationStore.activeGroupId
  );

  const totalAmount = draftStore.subexpenses.reduce(
    (sum, i) => sum + i.price,
    0
  );
  const identityStore = useIdentityStore();

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  async function onCreate() {
    // TODO: validate

    const draft = draftStore.actions.getDraft();

    const createExpenseRes = await identityStore.client!.expenses.create(
      navigationStore.activeGroupId!,
      {
        name: draft.title,
        description: '',
        location: '',
        categoryIds: [],
      }
    );

    const createSubexpensesRes = await Promise.all(
      draftStore.subexpenses.map((i) =>
        identityStore.client!.subexpenses.create(createExpenseRes.id, {
          name: i.title,
        })
      )
    );

    expensesStore.actions.createSubexpenses(
      draftStore.actions.getSubexpenseDrafts()
    );
    expensesStore.actions.createExpense(navigationStore.activeGroupId!, draft);

    draftStore.actions.clear();

    navigation.goBack();
  }
  function onCancel() {
    draftStore.actions.clear();

    navigation.goBack();
  }
  const sponsors = draftStore.sponsorShares.map((i) =>
    members.find((j) => j.id === i.memberId)
  );

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',

            width: 48,
            height: 48,
          }}
        >
          <MaterialIcons name="attach-file" size={20} color="#222" />
        </Pressable>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',

            width: 48,
            height: 48,
          }}
        >
          <MaterialIcons name="photo-camera" size={20} color="#222" />
        </Pressable>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',

            width: 48,
            height: 48,
          }}
        >
          <MaterialIcons name="insert-photo" size={20} color="#222" />
        </Pressable>
      </View>
      <TextInput
        multiline
        blurOnSubmit
        ref={titleInputRef}
        selectTextOnFocus
        placeholder={'Add expense title (required)'}
        style={{
          fontSize: 26,
          color: '#222',

          textAlign: 'center',
        }}
        onChangeText={draftStore.actions.setTitle}
        value={draftStore.title}
      />
      <TextInput
        multiline
        blurOnSubmit
        selectTextOnFocus
        placeholder={'Add expense description (optional)'}
        style={{
          fontSize: 13,
          color: '#888',

          textAlign: 'center',

          marginTop: 8,
          marginBottom: 16,
        }}
        onChangeText={draftStore.actions.setDescription}
        value={draftStore.description}
      />
      <ChipMultiselect
        options={categories.map((i) => ({
          title: i.displayName,
          isActive: draftStore.categoryIds.includes(i.id),
          value: i.id,
        }))}
        onOptionSelect={(option) =>
          draftStore.actions.addCategory(option.value)
        }
        onOptionUnselect={(option) =>
          draftStore.actions.removeCategory(option.value)
        }
      />
      <View
        style={{
          marginTop: 16,

          backgroundColor: 'transparent',
        }}
      >
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            paddingRight: 16,
          }}
          onPress={() => setIsDatepickerOpen(true)}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',

              width: 48,
              height: 48,

              backgroundColor: 'transparent',
            }}
          >
            <MaterialCommunityIcon
              name="calendar-month-outline"
              size={20}
              color="#222"
            />
          </View>
          <Text
            style={{
              fontSize: 13,

              color: '#222',
            }}
          >
            {draftStore.date.toDateString()}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          marginBottom: 16,

          backgroundColor: 'transparent',
        }}
      >
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            paddingRight: 16,
          }}
          onPress={() => alert('TODO: popup to select sponsors')}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',

              width: 48,
              height: 48,

              backgroundColor: 'transparent',
            }}
          >
            <MaterialCommunityIcon
              name="account-circle-outline"
              size={20}
              color="#222"
            />
          </View>
          <Text
            style={{
              fontSize: 13,

              color: sponsors.length ? '#222' : '#888',
            }}
          >
            {sponsors.length
              ? sponsors.map((i) => i?.displayName || 'Unknown').join(', ')
              : 'Who payed for this? (required)'}
          </Text>
        </Pressable>
        <View
          style={{
            marginLeft: 48,
          }}
        >
          <ChipMultiselect
            options={members.map((i) => ({
              title: i.displayName,
              isActive: draftStore.sponsorShares.some(
                (j) => j.memberId === i.id
              ),
              value: i.id,
              icon: (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 24,
                    height: 24,
                    marginRight: 4,

                    borderRadius: 99,
                    backgroundColor: '#C4C4C4',
                  }}
                />
              ),
            }))}
            onOptionSelect={(option) =>
              draftStore.actions.addSponsorShare(option.value)
            }
            onOptionUnselect={(option) =>
              draftStore.actions.removeSponsorShare(option.value)
            }
          />
        </View>
      </View>
      <DatePicker
        modal
        mode="date"
        open={isDatepickerOpen}
        date={draftStore.date}
        onConfirm={(date) => {
          setIsDatepickerOpen(false);
          draftStore.actions.setDate(date);
        }}
        onCancel={() => {
          setIsDatepickerOpen(false);
        }}
      />
      <ExpenseList
        totalAmount={totalAmount}
        items={draftStore.subexpenses.map((i) => ({
          ...i,
          gainers: i.shares.map(
            (j) => members.find((m) => m.id === j.memberId)!
          ),
        }))}
        onItemClick={onItemClick}
        onAddItem={() => {
          draftStore.actions.createEmptySubexpense();

          draftStore.actions.splitTotalEvenlyAcrossSubexpenses();
        }}
        onRemoveItem={(item) => draftStore.actions.deleteSubexpense(item.id)}
        onSplitIntoMultipleItems={() => {
          draftStore.actions.createEmptySubexpense();

          draftStore.actions.splitTotalEvenlyAcrossSubexpenses();
        }}
        onTotalAmountChange={draftStore.actions.setTotalAmount}
      />
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
            Save
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
