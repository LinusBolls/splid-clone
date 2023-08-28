import { Pressable, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Format from '../../constants/Format';
import NumberInput from '../NumberInput';

export interface Item {
  id: string;

  title: string;

  price: number;

  gainers: {
    id: string;
    displayName: string;
  }[];
}

export interface ExpenseListProps {
  totalAmount: number;
  items: Item[];

  onItemClick: (item: Item) => void;
  onRemoveItem: (item: Item) => void;
  onAddItem: () => void;
  onSplitIntoMultipleItems: () => void;
  onTotalAmountChange: (value: number) => void;
}
export default function ExpenseList({
  totalAmount,
  items,

  onItemClick,
  onRemoveItem,
  onAddItem,
  onSplitIntoMultipleItems,
  onTotalAmountChange,
}: ExpenseListProps) {
  const consistsOfMultiple = items.length > 1;

  const title = consistsOfMultiple ? `Total (${items.length} items)` : 'Total';

  return (
    <View
      style={{
        flexDirection: 'column',

        backgroundColor: '#C4C4C4',
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
          {title}
        </Text>
        <NumberInput
          isStatic={consistsOfMultiple}
          onChange={onTotalAmountChange}
          value={totalAmount}
          placeholder="Total amount"
        />
        <Pressable
          onPress={() => onAddItem()}
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
      {consistsOfMultiple
        ? items.map((i) => (
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
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',

                  height: 48,
                  flexGrow: 1,
                }}
                onPress={() => onItemClick(i)}
              >
                <View>
                  {i.title.length ? (
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#222',
                      }}
                    >
                      {i.title}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#888',
                      }}
                    >
                      Add item title... (required)
                    </Text>
                  )}

                  {i.gainers.length ? (
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#888',
                      }}
                    >
                      {i.gainers.map((j) => j.displayName).join(', ')}
                    </Text>
                  ) : null}
                </View>

                {i.price ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',

                        width: 32,
                        height: 32,
                      }}
                    >
                      <Text
                        style={{
                          color: '#222',
                          fontSize: 13,
                          fontWeight: '500',
                        }}
                      >
                        €
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#222',

                        paddingRight: 12,

                        fontSize: 13,
                        fontWeight: '500',
                      }}
                    >
                      {Format.currency.EUR(i.price, true)}
                    </Text>
                  </View>
                ) : null}
              </Pressable>
              <Pressable
                onPress={() => onRemoveItem(i)}
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
          ))
        : null}
      {!consistsOfMultiple && (
        <View
          style={{
            backgroundColor: 'white',
          }}
        >
          <Pressable
            onPress={onSplitIntoMultipleItems}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',

              height: 48,
              width: '100%',

              borderColor: '#C4C4C4',
              borderWidth: 1,
              borderRadius: 8,

              backgroundColor: 'white',
            }}
          >
            <Text
              style={{
                fontSize: 16,

                color: '#222',
              }}
            >
              Split into multiple items
            </Text>
            <MaterialIcons
              name="call-split"
              size={20}
              color="#222"
              style={{
                marginLeft: 8,
              }}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}
