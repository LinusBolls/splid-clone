import { Pressable, Text, View } from "react-native";
import Chip from "./Chip";

export interface ChipMultiselectOption {
    title: string;

    value: unknown;

    isActive: boolean;
}

export interface ChipMultiselectProps {
    options: ChipMultiselectOption[];
    hasAddOptionButton?: boolean;

    onOptionSelect: (option: ChipMultiselectOption) => void;
    onOptionUnselect: (option: ChipMultiselectOption) => void;
    onAddOption?: () => void;
}
export default function ChipMultiselect({
    options,
    hasAddOptionButton = false,

    onOptionSelect,
    onOptionUnselect,
    onAddOption = () => { },
}: ChipMultiselectProps) {

    return <View style={{
        display: "flex",
        flexWrap: "wrap",

        gap: 8,

        backgroundColor: "red",
    }}>
        {options.map(i => <Chip {...i} onPress={() => i.isActive ? onOptionUnselect({ ...i, isActive: false }) : onOptionSelect({ ...i, isActive: true })} />)}
        {hasAddOptionButton && <Pressable
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                flexGrow: 0,
                flexShrink: 1,

                height: 32,
                paddingHorizontal: 16,

                borderRadius: 999,
                borderWidth: 1,

                backgroundColor: "white",
                borderColor: "#C4C4C4",
            }}
            onPress={onAddOption}
        >
            <Text style={{
                fontSize: 13,
                fontWeight: "600",

                color: "#222",
            }}>Add option</Text>
        </Pressable>}
    </View>
}