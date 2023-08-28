import dayjs from 'dayjs';
import { Pressable, ScrollView, Text, View } from 'react-native';

import Format from '../../constants/Format';

const BalanceInfluence = {
  NEUTRAL: {
    id: 'NEUTRAL',
    color: '#222',
    text: 'You owe:',
    prefix: '',
  } as const,
  POSITIVE: {
    id: 'POSITIVE',
    color: '#69CDA8',
    text: 'You spent:',
    prefix: '+',
  } as const,
  NEGATIVE: {
    id: 'NEGATIVE',
    color: '#EB475C',
    text: 'You owe:',
    prefix: '-',
  } as const,
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

export interface ActivityGroup {
  activities: Activity[];
}

const groupActivitiesByDay = (activities: Activity[]): ActivityGroup[] => {
  const activityGroups: ActivityGroup[] = [];
  const activitiesByDay: { [date: string]: Activity[] } = {};

  for (const activity of activities) {
    const day = dayjs(activity.date).format('YYYY-MM-DD');

    if (!activitiesByDay[day]) {
      console.log(`is unique: '${day}'`);
      activitiesByDay[day] = [];
    }
    activitiesByDay[day].push(activity);
  }

  for (const day in activitiesByDay) {
    activityGroups.push({ activities: activitiesByDay[day] });
  }
  return activityGroups;
};

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
    <ScrollView>
      {groupActivitiesByDay(activities).map((i, activityGroupIdx) => {
        const date = i.activities[0].date;

        return (
          <>
            <View
              key={activityGroupIdx + '-seperator'}
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

                  fontWeight: '500',
                }}
              >
                {Format.date.ACTIVITY_LIST(date)}
              </Text>
            </View>
            <View
              key={activityGroupIdx}
              style={{
                alignItems: 'center',

                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#eee',
                backgroundColor: 'white',
              }}
            >
              {activities.map((i, activityIdx) => {
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
                  (sponsorsText || 'Unknown') +
                  ' -> ' +
                  (gainersText || 'Unknown');

                const hasBorder = activityIdx !== 0;

                return (
                  <>
                    {hasBorder && (
                      <View
                        key={i.id + '__seperator'}
                        style={{
                          width: '95%',
                          height: 1,

                          backgroundColor: '#eee',
                        }}
                      />
                    )}
                    <View
                      key={i.id}
                      style={{
                        flexDirection: 'row',

                        height: 52,
                        paddingHorizontal: 16,

                        backgroundColor: 'transparent',
                      }}
                    >
                      <Pressable
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',

                          width: '100%',
                          height: 48,
                          flexGrow: 1,
                        }}
                        onPress={() => onActivityClick(i)}
                      >
                        <View
                          style={{
                            flex: 1,

                            height: 42,
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

                              fontWeight: '500',
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

                                  height: 12,
                                  paddingHorizontal: 3,

                                  borderRadius: 8,
                                  backgroundColor: '#E8E1F9',
                                }}
                              >
                                <Text
                                  style={{
                                    fontWeight: '500',
                                    fontSize: 8,
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
                            ></Text>
                            <Text
                              style={{
                                fontSize: 13,
                                color: balanceInfluence.color,
                                fontWeight: '700',
                              }}
                            >
                              {balanceInfluence.id === 'NEGATIVE' &&
                                balanceInfluence.prefix}
                              {Format.currency.EUR(i.amountForYou, true)}
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
                              {Format.currency.EUR(i.totalAmount, true)}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    </View>
                  </>
                );
              })}
            </View>
          </>
        );
      })}
    </ScrollView>
  );
}
