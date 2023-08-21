import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Button from '../components/Button';
import ChipMultiselect from '../components/ChipMultiselect';
import ExpenseList from '../components/ExpenseList';
import useCreateExpense from '../fetching/useCreateExpense';
import { useExpenseCategoriesStore } from '../stores/expenseCategoriesStore';
import { useExpenseDraftStore } from '../stores/expenseDraftStore';
import { useGroupMembersStore } from '../stores/groupMembersStore';
import { useNavigation } from '../stores/navigationStore';

export default function EditExpenseScreen({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // You will see the submitted form data logged here
  };

  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);

  const navigationStore = useNavigation();

  const draftStore = useExpenseDraftStore();

  const categoriesStore = useExpenseCategoriesStore();

  const membersStore = useGroupMembersStore();

  const titleInputRef = useRef<TextInput>(null);

  const createExpenseMutation = useCreateExpense();

  const groupId = navigationStore.activeGroupId!;

  const members = membersStore.members.filter((i) => i.groupId === groupId);

  const categories = categoriesStore.categories.filter(
    (i) => i.groupId === groupId
  );

  const totalAmount = draftStore.subexpenses.reduce(
    (sum, i) => sum + i.price,
    0
  );
  const sponsors = draftStore.sponsorShares.map(
    (i) => members.find((j) => j.id === i.memberId)!
  );

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  function onItemClick(item: { id: string }) {
    navigationStore.actions.setActiveSubexpenseId(item.id);

    navigation.navigate('Modal');
  }
  async function onCreate() {
    // TODO: validate

    const expense = draftStore.actions.getDraft();

    const subexpenses = draftStore.actions.getSubexpenseDrafts();

    await createExpenseMutation.mutateAsync({ groupId, expense, subexpenses });

    draftStore.actions.clear();

    navigation.goBack();
  }
  function onCancel() {
    draftStore.actions.clear();

    navigation.goBack();
  }

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
            title: i.name,
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
                ? sponsors.map((i) => i?.name || 'Unknown').join(', ')
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
                title: i.name,
                isActive: sponsors.some((j) => j.id === i.id),
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
            displayName: i.title,
            id: i.id,
            title: i.title,
            price: i.price,
            gainers: i.shares.map((j) => ({
              ...members.find((m) => m.id === j.memberId)!,
              displayName: members.find((m) => m.id === j.memberId)!.name,
            })),
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
        <Button variant="outlined" text="Cancel" onClick={onCancel} />
        <Button
          variant="primary"
          text={createExpenseMutation.isError ? 'Error' : 'Save'}
          onClick={onCreate}
          isLoading={createExpenseMutation.isLoading}
        />
      </View>
    </View>
  );
}
