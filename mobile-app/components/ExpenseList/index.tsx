import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Pressable, Text, View } from "react-native";
import NumberInput from '../NumberInput';

export interface Item {
    id: string

    title: string

    price: number

    profiteers: {
        id: string
        firstName: string
    }[]
}

const formatPriceEur = (price: number) => price.toLocaleString(undefined, { minimumFractionDigits: 2 }) + "€";

const formatPercentage = (percentage: number) => percentage.toLocaleString(undefined, { maximumFractionDigits: 0 }) + "%";

export interface ExpenseListProps {
    totalAmount: number;
    items: Item[]

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
    onTotalAmountChange
}: ExpenseListProps) {

    const consistsOfMultiple = items.length > 0;

    const title = consistsOfMultiple ? `Total (${items.length} items)` : "Total"

    return <View style={{
        flexDirection: "column",

        backgroundColor: "#C4C4C4",
    }}>
        <View style={{
            flexDirection: "row",
            alignItems: "center",

            height: 48,
            paddingLeft: 16,

            backgroundColor: "white",
        }}>
            <Text style={{
                flexGrow: 1,

                fontSize: 16,

                color: "#222",
            }}>{title}</Text>
            <NumberInput
                onChange={onTotalAmountChange}
                value={totalAmount}
                placeholder='Total amount'
            />
            <Pressable
                onPress={() => onAddItem()}
                style={{
                    alignItems: "center",
                    justifyContent: "center",

                    width: 48,
                    height: 48,
                }}>
                <MaterialIcons name="add" size={20} color="#222" />
            </Pressable>
        </View>
        {items.map(i => <View
            key={i.id}
            style={{
                flexDirection: "row",

                height: 48,
                paddingLeft: 16,

                backgroundColor: "white",

                marginTop: 1,
            }}>
            <Pressable
                style={{
                    justifyContent: "center",

                    height: 48,
                    flexGrow: 1,
                }}
                onPress={() => onItemClick(i)}
            >
                <View>
                    {i.title.length ? <Text style={{
                        fontSize: 13,
                        color: "#222",
                    }}>{i.title}</Text> : <Text style={{
                        fontSize: 13,
                        color: "#888",
                    }}>Add item title... (required)</Text>}
            
                    {i.profiteers.length ? <Text style={{
                        fontSize: 10,
                        color: "#888",
                    }}>{i.profiteers.map(j => j.firstName).join(", ")}</Text> : null}
                </View>

                {i.price ? <View>
                    {i.title.length ? <Text style={{
                        fontSize: 13,
                        color: "#222",
                    }}>{i.title}</Text> : <Text style={{
                        fontSize: 13,
                        color: "#888",
                    }}>{formatPriceEur(i.price)}</Text>}
            
                    {i.profiteers.length ? <Text style={{
                        fontSize: 10,
                        color: "#888",
                    }}>{formatPercentage(100 / (100 / i.price))}</Text> : null}
                </View> : null}
            </Pressable>
            <Pressable
                onPress={() => onRemoveItem(i)}
                style={{
                    alignItems: "center",
                    justifyContent: "center",

                    width: 48,
                    height: 48,
                }}>
                <MaterialIcons name="remove" size={20} color="#222" />
            </Pressable>
        </View>)}
        {!items.length &&
            <View style={{
                paddingHorizontal: 16,

                backgroundColor: "white"
            }}>
                <Pressable
                    onPress={onSplitIntoMultipleItems}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",

                        height: 48,
                        width: "100%",

                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 8,

                        backgroundColor: "white",

                    }}>
                    <Text style={{
                        fontSize: 16,

                        color: "#222",
                    }}>Split into multiple items</Text>
                    <MaterialIcons name="call-split" size={20} color="#222" style={{
                        marginLeft: 8,
                    }} />
                </Pressable>
            </View>
        }
    </View >
}