import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


export const SearchContext = React.createContext({
  search: '',
  setSearch: (_: string) => { },
});

function BreedsHeader() {
  const { search, setSearch } = useContext(SearchContext);
  return (
    <LinearGradient colors={["#7f9cf5", "#a3bffa"]} style={styles.header}>
      <View style={styles.headerRow}>
        <FontAwesome name="paw" size={32} color="#fff" />
        <Text style={styles.headerTitle}>Breeds List</Text>
        <View style={{ width: 32 }} />
      </View>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Breeds finder"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#888"
        />
        <FontAwesome name="search" size={24} color="#888" style={{ marginLeft: 8 }} />
      </View>
    </LinearGradient>
  );
}

function FavoritesHeader() {
  return (
    <LinearGradient colors={["#7f9cf5", "#a3bffa"]} style={styles.header}>
      <View style={styles.headerRow}>
        <FontAwesome name="star" size={32} color="#fff" style={{ marginLeft: 'auto' }} />
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{ width: 32 }} />
      </View>
    </LinearGradient>

  );
}

export default function TabLayout() {
  const [search, setSearch] = useState('');
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.tint,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Breeds',
            tabBarIcon: ({ color }) => <FontAwesome name="paw" size={32} color={color} style={{ marginLeft: 'auto' }} />,
            header: () => <BreedsHeader />,
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color }) => <FontAwesome name="star" size={32} color={color} style={{ marginLeft: 'auto' }} />,
            header: () => <FavoritesHeader />,
          }}
        />
      </Tabs>
    </SearchContext.Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    paddingVertical: 6,
  },
});
