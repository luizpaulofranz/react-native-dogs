import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import ImageView from 'react-native-image-viewing';
import { useFavorites } from '../hooks/use-favorites';
import { useBreedImages } from '../hooks/use-breed-images';
import { Breed } from '../types/breed';

export default function BreedScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();
  const { images, isLoading, error } = useBreedImages(name);
  const { favorites, toggleFavorite } = useFavorites();
  const breed = { name } as Breed;
  const isFavorite = favorites.some(b => b.name === name);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  function renderContent() {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.imageCard}
            onPress={() => setSelectedImageIndex(index)}
          >
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.gridContainer}
      />
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#7f9cf5", "#a3bffa"]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>

          <TouchableOpacity
            onPress={() => toggleFavorite(breed)}
            style={styles.favoriteButton}
          >
            <MaterialIcons
              name={isFavorite ? 'star' : 'star-outline'}
              size={28}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {renderContent()}

      <ImageView
        images={images.map(uri => ({ uri }))}
        imageIndex={selectedImageIndex || 0}
        visible={selectedImageIndex !== null}
        onRequestClose={() => setSelectedImageIndex(null)}
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    padding: 8,
  },
  imageCard: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff0000',
    textAlign: 'center',
  },
});
