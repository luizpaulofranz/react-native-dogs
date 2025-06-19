import { Breed } from "@/types/breed";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type Props = {
    breed: Breed;
    isFavorite: boolean;
    toggleFavorite: (breed: Breed) => void;
}

export default function BreedItem({ breed, isFavorite, toggleFavorite }: Props) {
    return (
        <TouchableOpacity onPress={() => router.push(`/breed?name=${breed.name}`)}>
            <View style={styles.breedRow}>
                <Text style={styles.breedName}>{breed.name}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(breed)}>
                    <MaterialIcons
                        name={isFavorite ? 'star' : 'star-border'}
                        size={32}
                        color="#FFD600"
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}
