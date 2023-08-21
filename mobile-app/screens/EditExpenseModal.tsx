import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Swiper from 'react-native-swiper';

import ModalDragHandle from '../components/ModalDragHandle';
import SubexpenseInfo from '../components/SubexpenseInfo';
import SwiperHeader from '../components/SwiperHeader';
import { Text, View } from '../components/Themed';
import { useExpenseCategoriesStore } from '../stores/expenseCategoriesStore';
import { useExpenseDraftStore } from '../stores/expenseDraftStore';
import { useExpensesStore } from '../stores/expensesStore';
import { useGroupMembersStore } from '../stores/groupMembersStore';
import { useNavigation } from '../stores/navigationStore';

const formatPriceEur = (price: number) =>
  price.toLocaleString(undefined, { minimumFractionDigits: 2 }) + '€';

export default function EditExpenseModal({ navigation }: any) {
  const navigationStore = useNavigation();

  const expensesDraftStore = useExpenseDraftStore();

  const activeSubexpenses = expensesDraftStore.subexpenses;

  const activeSubexpenseIdx = activeSubexpenses.findIndex(
    (i) => i.id === navigationStore.activeSubexpenseId
  );

  if (activeSubexpenseIdx === -1) {
    navigationStore.actions.setActiveSubexpenseId(activeSubexpenses[0]?.id);
  }
  function onSwiped(expenseIdx: number) {
    const selectedExpense = activeSubexpenses[expenseIdx];

    if (selectedExpense) {
      navigationStore.actions.setActiveSubexpenseId(selectedExpense.id);
    } else {
      console.warn('onSwiped:', expenseIdx);
    }
  }
  const membersStore = useGroupMembersStore();

  const groupMembers = membersStore.members.filter(
    (i) => i.groupId === navigationStore.activeGroupId
  );
  const [selectPrice, setSelectPrice] = useState(false);

  const activeExpenseTotalAmount = expensesDraftStore.subexpenses.reduce(
    (sum, k) => sum + k.price,
    0
  );

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
          Total ({activeSubexpenses.length} items)
        </Text>
        <Text
          style={{
            color: '#222',
            fontSize: 13,
          }}
        >
          {formatPriceEur(activeExpenseTotalAmount)}
        </Text>
      </View>
      <SwiperHeader
        currentItemIdx={activeSubexpenseIdx}
        numItems={activeSubexpenses.length}
      />
      <Swiper
        showsButtons={false}
        showsPagination={false}
        loop={false}
        index={activeSubexpenseIdx}
        onIndexChanged={onSwiped}
      >
        {activeSubexpenses.map((i, idx) => {
          const gainers = groupMembers.map((m) => {
            const share = i.shares.find((s) => s.memberId === m.id);

            return {
              title: m.name || 'Unknown',
              value: m.id,
              isActive: share != null,
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
            };
          });

          const isVisible = activeSubexpenseIdx === idx;

          return (
            <SubexpenseInfo
              primaryButtonAction={
                idx === activeSubexpenses.length - 1
                  ? 'CREATE_NEW'
                  : 'GO_TO_NEXT'
              }
              onPrimaryButtonPress={() => {
                if (idx === activeSubexpenses.length - 1) {
                  expensesDraftStore.actions.createEmptySubexpense();
                }
                onSwiped(idx + 1);
              }}
              expenseTitle={i.title}
              price={i.price}
              percentageOfTotal={100 / (activeExpenseTotalAmount / i.price)}
              selectPrice={isVisible && selectPrice}
              selectTitle={isVisible && i.title.length < 1}
              gainers={gainers}
              onTitleBlur={() => {
                if (
                  !activeSubexpenses[activeSubexpenseIdx].price &&
                  i.title.length > 0
                ) {
                  setSelectPrice(true);

                  setTimeout(setSelectPrice, 0, false);
                }
              }}
              onDelete={() => expensesDraftStore.actions.deleteSubexpense(i.id)}
              onPriceChange={(value) =>
                expensesDraftStore.actions.setSubexpensePrice(i.id, value)
              }
              onTitleChange={(value) =>
                expensesDraftStore.actions.setSubexpenseTitle(i.id, value)
              }
              onGainerSelected={(gainer) =>
                expensesDraftStore.actions.addGainerShare(i.id, gainer.value)
              }
              onGainerUnselected={(gainer) =>
                expensesDraftStore.actions.removeGainerShare(i.id, gainer.value)
              }
            />
          );
        })}
      </Swiper>
    </View>
  );
}
