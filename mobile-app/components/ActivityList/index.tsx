import dayjs from 'dayjs';
import { Pressable, Text, View } from 'react-native';

const formatPriceEur = (price: number) =>
  price.toLocaleString(undefined, { minimumFractionDigits: 2 }) + '€';

const BalanceInfluence = {
  NEUTRAL: {
    id: 'NEUTRAL',
    color: '#222',
    text: 'You owe:',
  },
  POSITIVE: {
    id: 'POSITIVE',
    color: '#69CDA8',
    text: 'You spent:',
  },
  NEGATIVE: {
    id: 'NEGATIVE',
    color: '#EB475C',
    text: 'You owe:',
  },
};

export interface ExpenseActivity {
  id: string;
  groupId: string;
  date: Date;
  title: string;

  totalAmount: number;
  amountForYou: number;

  categories: {
    id: string;
    title: string;
  }[];

  sponsors: {
    id: string;
    displayName: string;
  }[];
  gainers: {
    id: string;
    displayName: string;
  }[];
}
type Activity = ExpenseActivity;

export interface ActivityListProps {
  activities: Activity[];

  onActivityClick: (activity: Activity) => void;
}
export default function ActivityList({
  activities,

  onActivityClick,
}: ActivityListProps) {
  if (!activities.length) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',

          height: 48,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: '#222',
          }}
        >
          No activities.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'column',

        backgroundColor: '#C4C4C4',
      }}
    >
      {activities.map((i, idx) => {
        const prevActivity = activities[idx - 1];

        const hasDateSeperator = prevActivity
          ? !dayjs(i.date).isSame(dayjs(prevActivity.date), 'day')
          : false;

        const balanceInfluence = (() => {
          if (i.amountForYou > 0) return BalanceInfluence.POSITIVE;
          if (i.amountForYou < 0) return BalanceInfluence.NEGATIVE;

          return BalanceInfluence.NEUTRAL;
        })();

        const sponsorsText =
          i.sponsors.length > 2
            ? `${i.sponsors.length} people`
            : i.sponsors.map((j) => j.displayName).join(', ');
        const gainersText =
          i.gainers.length > 2
            ? `${i.gainers.length} people`
            : i.gainers.map((j) => j.displayName).join(', ');

        const peopleText =
          (sponsorsText || 'Unknown') + ' -> ' + (gainersText || 'Unknown');

        return (
          <>
            {hasDateSeperator && (
              <View
                key={i.id + '-seperator'}
                style={{
                  justifyContent: 'center',

                  height: 32,
                  paddingHorizontal: 8,

                  backgroundColor: 'white',
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: '#222',

                    paddingTop: 6,
                  }}
                >
                  {dayjs(i.date).format('MMMM D')}
                </Text>
              </View>
            )}
            <View
              key={i.id}
              style={{
                flexDirection: 'row',

                height: 48,

                backgroundColor: 'white',
                marginTop: 1,
              }}
            >
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',

                  width: '100%',
                  height: 48,
                  flexGrow: 1,
                }}
                onPress={() => onActivityClick(i)}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#222',
                    }}
                  >
                    {peopleText}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 13,
                      color: '#222',

                      flex: 1,
                    }}
                  >
                    {i.title || 'Unknown'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    {i.categories.map((c) => (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',

                          height: 8,
                          paddingHorizontal: 3,

                          borderRadius: 8,
                          backgroundColor: '#E8E1F9',
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: '900',
                            fontSize: 6,
                            color: '#682BE9',
                          }}
                        >
                          {c.title || 'Unknown'}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View
                  style={{
                    alignItems: 'flex-end',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        marginRight: 2,

                        fontSize: 13,
                        color: '#222',
                      }}
                    >
                      {balanceInfluence.text}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: balanceInfluence.color,
                        fontWeight: '700',
                      }}
                    >
                      {formatPriceEur(i.amountForYou)}
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        marginRight: 2,

                        fontSize: 10,
                        color: '#888',
                      }}
                    >
                      Total:
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#888',
                      }}
                    >
                      {formatPriceEur(i.totalAmount)}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </>
        );
      })}
    </View>
  );
}
