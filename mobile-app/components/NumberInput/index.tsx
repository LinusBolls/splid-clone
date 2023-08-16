import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

const formatPriceEur = (price: number) => price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export interface NumberInputProps { 
    placeholder?: string

    defaultValue?: number
    value: number
    onChange: (value: number) => void;
}
export default function NumberInput({ 
    placeholder = 'Amount',

    defaultValue = 0,
    value: valuee,
    onChange
}: NumberInputProps) {

    const [strValue, setStrValue] = useState(formatPriceEur(defaultValue));

    function onBlur() {

        setStrValue(prev => {

            let numericValue = parseFloat(prev.replace(/\,/, "."));

            if (typeof numericValue !== "number" || Number.isNaN(numericValue)) {
                numericValue = defaultValue;
            }
            onChange(numericValue);
        
            return formatPriceEur(numericValue)
        });
    }

    return <View style={{ position: "relative", backgroundColor: "none" }}>
        <TextInput
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor="#C3B0EF"
            style={{

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",

                height: 32,
                paddingLeft: 32,
                paddingRight: 12,

                borderRadius: 8,

                color: "#682BE9",
                fontSize: 16,
                backgroundColor: "#E8E1F9",
            }}
            selectTextOnFocus
            keyboardType='numeric'
            onChangeText={(newValue) => setStrValue(newValue)}
            value={strValue}
            maxLength={10}  //setting limit of input
        />
        <View style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",

            width: 32,
            height: 32,
        }}>
            <Text style={{
                color: "#682BE9",
                fontSize: 16,
                fontWeight: "500",
            }}>€</Text>
            {/* <MaterialIcons name="euro" size={16} color="#682BE9" /> */}
        </View>
    </View>
}