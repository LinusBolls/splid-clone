/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import uuid from 'react-native-uuid';
import PaginationDot from 'react-native-insta-pagination-dots'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { ColorSchemeName, Pressable, Text, TextInput } from 'react-native';
import {
  RootStackParamList,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { View } from '../components/Themed';
import { useEffect, useRef, useState } from 'react';
import ChipMultiselect, { ChipMultiselectOption } from '../components/ChipMultiselect';
import Swiper from 'react-native-swiper';
import ExpenseList from '../components/ExpenseList';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

maybeCompleteAuthSession();

function RootNavigator() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Modal"
          component={Dings}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function Main({ navigation }: any) {

  const [items, setItems] = useState<any[]>([]);

  return <View>
    <View style={{
      height: 16,
    }}></View>
    <View style={{
      height: 48,
    }}></View>
    <ExpenseList
      totalAmount={items.reduce((sum, i) => sum + i.price, 0)}
      items={items}

      onItemClick={() => navigation.navigate('Modal')}
      onAddItem={() => setItems(prev => [...prev, { id: uuid.v4(), title: "", profiteers: [], price: 0 }])}
      onRemoveItem={(item) => setItems(prev => prev.filter(i => i.id !== item.id))}
      onSplitIntoMultipleItems={() => setItems([{ id: uuid.v4(), title: "", profiteers: [], price: 0 }, { id: uuid.v4(), title: "", profiteers: [], price: 0 }])}
      onTotalAmountChange={(value) => { }}
    />
  </View>
}

const formatPriceEur = (price: number) => price.toLocaleString(undefined, { minimumFractionDigits: 2 }) + "€";

const formatPercentage = (percentage: number) => percentage.toLocaleString(undefined, { maximumFractionDigits: 0 }) + "%";


function Dings() {

  const [users, setUsers] = useState([
    {
      id: 1,
      displayName: "Das Institut",
      avatarUrl: null,
    },
    {
      id: 2,
      displayName: "Elina Staerkenberg",
      avatarUrl: null,
    },
    {
      id: 3,
      displayName: "Jan-Luca Skrzipczyk",
      avatarUrl: null,
    },
    {
      id: 4,
      displayName: "Jannis Kirr",
      avatarUrl: null,
    },
    {
      id: 5,
      displayName: "Jonas Wallmann",
      avatarUrl: null,
    },
    {
      id: 6,
      displayName: "Josephine Warsel",
      avatarUrl: null,
    },
    {
      id: 7,
      displayName: "Laurin Notemann",
      avatarUrl: null,
    },
    {
      id: 8,
      displayName: "Leonard Darsow",
      avatarUrl: null,
    },
    {
      id: 9,
      displayName: "Linus Bolls",
      avatarUrl: null,
    },
    {
      id: 10,
      displayName: "Linus Schicke",
      avatarUrl: null,
    },
    {
      id: 11,
      displayName: "Moritz",
      avatarUrl: null,
    },
    {
      id: 12,
      displayName: "Ole Farwig",
      avatarUrl: null,
    },
    {
      id: 13,
      displayName: "Robert Schneider",
      avatarUrl: null,
    },
    {
      id: 14,
      displayName: "Thies Hölting",
      avatarUrl: null,
    },
    {
      id: 15,
      displayName: "Timon Reihnen",
      avatarUrl: null,
    },
  ]);

  const [shoppingItems, setShoppingItems] = useState([
    { id: 1, title: 'Bottle of wine', price: 5, profiteerIds: [5, 12] },
    { id: 2, title: 'Entrecot', price: 5, profiteerIds: [0] },
    { id: 3, title: 'Pizza Funghi', price: 6.9, profiteerIds: [3] },
    { id: 4, title: 'Pizza Sache', price: 5, profiteerIds: [4] },
    { id: 5, title: 'Borgir ohne Borgir', price: 5, profiteerIds: [12] },
    { id: 6, title: 'Desert', price: 3, profiteerIds: [7] },
    { id: 7, title: 'Wasser', price: 2, profiteerIds: [7, 8, 9, 10] },
  ]);

  const [categories, setCategories] = useState<ChipMultiselectOption[]>([
    {
      title: "Restaurant",
      value: "category1",
      isActive: false,
    },
    {
      title: "Groceries",
      value: "category2",
      isActive: false,
    },
    {
      title: "Accomodation",
      value: "category3",
      isActive: false,
    },
    {
      title: "Transport",
      value: "category4",
      isActive: false,
    },
    {
      title: "Other",
      value: "category5",
      isActive: true,
    },
  ]);

  const [currentItemIdx, setCurrentItemIdx] = useState(0);

  const totalSum = shoppingItems.reduce((sum, i) => sum + i.price, 0);

  const titleInputRef = useRef(null);

  // useEffect(() => {
  //   titleInputRef.current?.focus();
  // }, [titleInputRef])

  return <View style={{

    height: "100%"
  }}>
    <View style={{
      alignItems: "center",
      justifyContent: "center",
      height: 48,
    }}>
      <View style={{
        borderRadius: 99,

        backgroundColor: "#EAEAEA",

        width: 80,
        height: 8,
      }}></View>
    </View>
    <View style={{
      flexDirection: "row",

      height: 32,

      paddingHorizontal: 16,

      borderBottomColor: "#C4C4C4",
      borderBottomWidth: 1,
    }}>
      <Text style={{
        color: "#222",
        fontSize: 16,

        flexGrow: 1,
      }}>Total ({shoppingItems.length} items)</Text>
      <Text style={{
        color: "#222",
        fontSize: 13,
      }}>{formatPriceEur(totalSum)}</Text>

    </View>
    <View style={{
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "center",

      height: 16,
      paddingHorizontal: 16,
    }}>
      <Text style={{
        fontSize: 10,
        color: '#7E8893',

        display: "none",
      }}>{currentItemIdx + 1} / {shoppingItems.length}</Text>
      <View style={{
        alignItems: "center",
        flexGrow: 1,
      }}>
        <PaginationDot
          activeDotColor={'#7E8893'}
          curPage={currentItemIdx}
          maxPage={shoppingItems.length}
        />
      </View>
      <Text style={{
        fontSize: 10,
        color: '#7E8893',
      }}>{currentItemIdx + 1} / {shoppingItems.length}</Text>
    </View>
    <Swiper
      showsButtons={false}
      showsPagination={false}
      loop={false}
      onIndexChanged={setCurrentItemIdx}
    >
      {shoppingItems.map(i => <View>
        <View style={{
          flexDirection: "row",

          height: 48,
          paddingHorizontal: 16,

          overflow: "hidden",
        }}>
          <TextInput
            ref={titleInputRef}
            selectTextOnFocus
            defaultValue={i.title}
            placeholder={"Add item title (required)"}
            style={{
              fontSize: 26,
              color: "#222",

              flexGrow: 1,
            }}
          // onChangeText={(text) => alert(text)}
          // onKeyPress={quitKeyboardOnEnter}
          // value={meetingTitle}
          />
          <View style={{
            flexDirection: "column",
            alignItems: "center",

            flexShrink: 0,
          }}>
            <Text style={{ fontSize: 16, color: "#682BE9" }}>{formatPriceEur(i.price)}</Text>
            <Text style={{ fontSize: 13, color: "#888" }}>{formatPercentage(100 / (totalSum / i.price))}</Text>
          </View>
        </View>

        {/* <ChipMultiselect
          options={categories}
          onOptionSelect={(option) => setCategories(prev => [...prev].map(i => i.value === option.value ? option : i))}
          onOptionUnselect={(option) => setCategories(prev => [...prev].map(i => i.value === option.value ? option : i))}
        /> */}
      </View>)}
    </Swiper>
  </View>
}