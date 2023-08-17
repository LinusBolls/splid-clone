import { useState } from 'react';
import Swiper from 'react-native-swiper';

import ModalDragHandle from '../components/ModalDragHandle';
import SubexpenseInfo from '../components/SubexpenseInfo';
import SwiperHeader from '../components/SwiperHeader';
import { Text, View } from '../components/Themed';
import useExpenses from '../hooks/useExpenses';

const formatPriceEur = (price: number) =>
  price.toLocaleString(undefined, { minimumFractionDigits: 2 }) + '€';

export default function EditExpenseModal() {
  const {
    getActiveExpense,
    subExpenses,
    groupMembers,
    removeSubexpense,
    setSubexpenseTitle,
    setSubexpensePrice,
    addGainerToSubexpense,
    removeGainerFromSubexpense,
  } = useExpenses((s) => s);

  const [currentItemIdx, setCurrentItemIdx] = useState(0);

  const activeExpense = getActiveExpense()!;

  const activeSubExpenses = activeExpense.subExpenseIds.map(
    (i) => subExpenses.find((j) => j.id === i)!
  );

  const [selectPrice, setSelectPrice] = useState(false);

  function onSwiped(expenseIdx: number) {
    setCurrentItemIdx(expenseIdx);
  }

  return (
    <View
      style={{
        height: '100%',
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
          Total ({activeSubExpenses.length} items)
        </Text>
        <Text
          style={{
            color: '#222',
            fontSize: 13,
          }}
        >
          {formatPriceEur(activeExpense.price)}
        </Text>
      </View>
      <SwiperHeader
        currentItemIdx={currentItemIdx}
        numItems={activeSubExpenses.length}
      />
      <Swiper
        showsButtons={false}
        showsPagination={false}
        loop={false}
        onIndexChanged={onSwiped}
      >
        {activeSubExpenses.map((i, idx) => {
          const gainers = groupMembers.map((m) => ({
            title: m.displayName,
            value: m.id,
            isActive: i.gainerIds.includes(m.id),
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
          }));

          const isVisible = currentItemIdx === idx;

          return (
            <SubexpenseInfo
              expenseTitle={i.title}
              price={i.price}
              percentageOfTotal={100 / (activeExpense.price / i.price)}
              selectPrice={isVisible && selectPrice}
              selectTitle={isVisible && i.title.length < 1}
              gainers={gainers}
              onTitleBlur={() => {
                if (
                  !activeSubExpenses[currentItemIdx].price &&
                  i.title.length > 0
                ) {
                  setSelectPrice(true);

                  setTimeout(setSelectPrice, 0, false);
                }
              }}
              onDelete={() => removeSubexpense(activeExpense.id, i.id)}
              onPriceChange={(value) => setSubexpensePrice(i.id, value)}
              onTitleChange={(value) => setSubexpenseTitle(i.id, value)}
              onGainerSelected={(gainer) =>
                addGainerToSubexpense(i.id, gainer.value)
              }
              onGainerUnselected={(gainer) =>
                removeGainerFromSubexpense(i.id, gainer.value)
              }
            />
          );
        })}
      </Swiper>
    </View>
  );
}
