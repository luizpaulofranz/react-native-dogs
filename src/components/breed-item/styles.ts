import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    breedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
    },
    breedName: {
        fontSize: 18,
        flex: 1,
        color: '#333',
    },
});