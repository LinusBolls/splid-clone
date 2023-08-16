import { Pressable, Text } from "react-native";

export interface ChipProps {
    title: string;
    imageUrl?: string;
    isActive: boolean;

    onPress: () => void;
}
export default function Chip({
    title,
    imageUrl,
    isActive,

    onPress,
}: ChipProps) {
    return <Pressable
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

            backgroundColor: isActive ? "#E8E1F9" : "white",
            borderColor: isActive ? "#C3B0EF" : "#C4C4C4",
        }}
        onPress={onPress}
    >
        <Text style={{
            fontSize: 13,
            fontWeight: "600",

            color: isActive ? "#682BE9" : "#222",
        }}>{title}</Text>
    </Pressable>
}