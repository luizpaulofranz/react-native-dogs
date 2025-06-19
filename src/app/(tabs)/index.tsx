import BreedItem from '@/components/breed-item';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useBreeds } from '../../hooks/use-breeds';
import { useFavorites } from '../../hooks/use-favorites';
import { SearchContext } from './_layout';

export default function BreedsListScreen() {
  const { search } = useContext(SearchContext);
  const { breeds, isLoading, error } = useBreeds();
  const { favorites, toggleFavorite, loadFavorites } = useFavorites();

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const filtered = breeds.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;
  if (error) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Error loading breeds</Text></View>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filtered}
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
