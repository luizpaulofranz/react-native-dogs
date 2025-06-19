import BreedItem from '@/components/breed-item';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFavorites } from '../../hooks/use-favorites';

export default function FavoritesScreen() {
    const { favorites, isLoading, toggleFavorite, loadFavorites } = useFavorites();

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [loadFavorites])
    );

    if (isLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.text}>Loading favorites...</Text>
                </View>
            </View>
        );
    }

    if (favorites.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <MaterialIcons name="star-border" size={64} color="#ccc" />
                    <Text style={styles.text}>No favorites yet</Text>
                    <Text style={styles.subText}>Add some breeds to your favorites!</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <BreedItem
                        breed={item}
                        isFavorite={favorites.some(b => b.name === item.name)}
                        toggleFavorite={toggleFavorite}
                    />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        color: '#666',
        marginTop: 16,
    },
    subText: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
        textAlign: 'center',
    },
}); 