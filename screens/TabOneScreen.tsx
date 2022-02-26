import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import {OS} from '../types/index';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {Searchbar} from 'react-native-paper';
import React, {useState} from 'react';

export default function TabOneScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query:any) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
        <View style={styles.searchBar}>
          <Searchbar
           placeholder="Search"
           onChangeText={onChangeSearch}
           value={searchQuery}
           />
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>Tab One</Text>
          <View style={styles.separator} lightColor="blue" darkColor="#ffffff19" />
          <EditScreenInfo path="/screens/TabOneScreen.tsx" />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    padding: 10,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "red",
    paddingTop: OS.ANDROID ? StatusBar.currentHeight : 0
  },
  body: {
    flex: 1
  }
});
