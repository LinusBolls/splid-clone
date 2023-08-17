import { useRef, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ChipMultiselect from '../components/ChipMultiselect';
import ExpenseList from '../components/ExpenseList';
import useExpenses from '../hooks/useExpenses';

export default function EditExpenseScreen({ navigation }: any) {
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);

  const {
    addEmptySubexpense,
    expenseCategories: categories,
    getActiveExpense,
    subExpenses,
    groupMembers,
    setExpensePrice,
    setExpenseDate,
    addCategoryToExpense,
    removeCategoryFromExpense,
    splitExpenseIntoMultiple,
    removeSubexpense,
  } = useExpenses((s) => s);

  const activeExpense = getActiveExpense();

  const onItemClick = () => navigation.navigate('Modal');

  if (!activeExpense) return;

  const titleInputRef = useRef(null);

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
        ref={titleInputRef}
        selectTextOnFocus
        placeholder={'Add expense title (required)'}
        style={{
          fontSize: 26,
          color: '#222',

          textAlign: 'center',
        }}
        // onChangeText={(text) => alert(text)}
        // value={meetingTitle}
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
        // onChangeText={(text) => alert(text)}
        // value={meetingTitle}
      />
      <ChipMultiselect
        options={categories.map((i) => ({
          ...i,
          isActive: activeExpense.categoryIds.includes(i.id),
          value: i.id,
        }))}
        onOptionSelect={(option) =>
          addCategoryToExpense(activeExpense.id, option.value as string)
        }
        onOptionUnselect={(option) =>
          removeCategoryFromExpense(activeExpense.id, option.value as string)
        }
      />
      <View
        style={{
          marginVertical: 16,

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
            <MaterialIcons name="calendar-month" size={20} color="#222" />
          </View>
          <Text
            style={{
              fontSize: 13,

              color: '#222',
            }}
          >
            {activeExpense.date.toDateString()}
          </Text>
        </Pressable>
      </View>
      <DatePicker
        modal
        mode="date"
        open={isDatepickerOpen}
        date={activeExpense.date}
        onConfirm={(date) => {
          setIsDatepickerOpen(false);
          setExpenseDate(activeExpense.id, date);
        }}
        onCancel={() => {
          setIsDatepickerOpen(false);
        }}
      />
      <ExpenseList
        totalAmount={activeExpense.price}
        items={subExpenses
          .filter((i) => activeExpense.subExpenseIds.includes(i.id))
          .map((i) => ({
            ...i,
            gainers: i.gainerIds.map(
              (j) => groupMembers.find((m) => m.id === j)!
            ),
          }))}
        onItemClick={onItemClick}
        onAddItem={() => addEmptySubexpense(activeExpense.id)}
        onRemoveItem={(item) => removeSubexpense(activeExpense.id, item.id)}
        onSplitIntoMultipleItems={() =>
          splitExpenseIntoMultiple(activeExpense.id)
        }
        onTotalAmountChange={(value) =>
          setExpensePrice(activeExpense.id, value)
        }
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
          onPress={() => alert('cancelling')}
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
          onPress={() => alert('saving')}
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
