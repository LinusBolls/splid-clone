import { useState } from 'react';
import Swiper from 'react-native-swiper';

import ExpenseInfo from '../components/ExpenseInfo';
import ModalDragHandle from '../components/ModalDragHandle';
import SubexpenseInfo from '../components/SubexpenseInfo';
import SwiperHeader from '../components/SwiperHeader';
import { Text, View } from '../components/Themed';
import { useExpenseCategoriesStore } from '../stores/expenseCategoriesStore';
import { useExpenseDraftStore } from '../stores/expenseDraftStore';
import { useExpensesStore } from '../stores/expensesStore';
import { useGroupMembersStore } from '../stores/groupMembersStore';
import { useGroupsStore } from '../stores/groupsStore';
import { useNavigation } from '../stores/navigationStore';

const formatPriceEur = (price: number) =>
  price.toLocaleString(undefined, { minimumFractionDigits: 2 }) + '€';

export default function SwipeActivitiesModal({ navigation }: any) {
  const navigationStore = useNavigation();

  const expensesStore = useExpensesStore();

  const activeActivities = expensesStore.expenses.filter(
    (i) => i.groupId === navigationStore.activeGroupId
  );

  const activeActivityIdx = activeActivities.findIndex(
    (i) => i.id === navigationStore.activeExpenseId
  );

  if (activeActivityIdx === -1) {
    navigationStore.actions.setActiveExpenseId(activeActivities[0]?.id ?? 0);
  }

  function onSwiped(expenseIdx: number) {
    navigationStore.actions.setActiveExpenseId(activeActivities[expenseIdx].id);
  }

  const membersStore = useGroupMembersStore();

  const groupMembers = membersStore.members.filter(
    (i) => i.groupId === navigationStore.activeGroupId
  );

  const groupStore = useGroupsStore();

  const activeGroup = groupStore.groups.find(
    (i) => i.id === navigationStore.activeGroupId
  );

  const expenseCategoriesStore = useExpenseCategoriesStore();

  return (
    <View
      style={{
        height: '100%',

        backgroundColor: 'white',
      }}
    >
      <ModalDragHandle />
      <View
        style={{
          flexDirection: 'row',

          height: 32,
          paddingHorizontal: 16,

          borderBottomColor: '#C4C4C4',
          borderBottomWidth: 1,
          backgroundColor: 'transparent',
        }}
      >
        <Text
          style={{
            flexGrow: 1,

            color: '#222',
            fontSize: 16,
          }}
        >
          {activeGroup?.title || 'Unknown'} ({activeActivities.length} items)
        </Text>
        {/* <Text
          style={{
            color: '#222',
            fontSize: 13,
          }}
        >
          Sus baker
        </Text> */}
      </View>
      <SwiperHeader
        currentItemIdx={activeActivityIdx}
        numItems={activeActivities.length}
      />
      <Swiper
        showsButtons={false}
        showsPagination={false}
        loop={false}
        index={activeActivityIdx}
        onIndexChanged={onSwiped}
      >
        {activeActivities.map((i, idx) => {
          const subexpenses = i.subExpenseIds.map(
            (id) => expensesStore.subexpenses.find((j) => j.id === id)!
          );
          const categories = i.categoryIds.map(
            (id) => expenseCategoriesStore.categories.find((j) => j.id === id)!
          );

          const sponsorIds = i.sponsorShares.reduce<string[]>(
            (memberIds, i) => [...memberIds, ...i.memberId],
            []
          );
          const gainerIds = subexpenses.reduce<string[]>(
            (memberIds, i) => [
              ...memberIds,
              ...i.shares.map((j) => j.memberId),
            ],
            []
          );

          const sponsors = sponsorIds
            .map((id) => membersStore.members.find((j) => j.id === id))
            .filter(
              (sponsor, index, self) =>
                index === self.findIndex((s) => s?.id === sponsor?.id)
            );
          const gainers = gainerIds
            .map((id) => membersStore.members.find((j) => j.id === id))
            .filter(
              (sponsor, index, self) =>
                index === self.findIndex((s) => s?.id === sponsor?.id)
            );

          const totalAmount = subexpenses.reduce((sum, k) => sum + k.price, 0);

          const isVisible = activeActivityIdx === idx;

          return (
            // <ExpenseInfo />
            null
          );
        })}
      </Swiper>
    </View>
  );
}
