import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar, Platform} from "react-native";
import InputForm from "../components/InputForm";
import TodoItem from "../components/TodoItem";

const MainScreen = () => {
  return <SafeAreaView style={styles.container}>
    <StatusBar barStyle={'default'}/>
    <Text style={styles.pageTitle}>Todo App</Text>
    <View style={styles.listView}>
      <Text style={styles.listTitle}>할 일</Text>
      <TodoItem />
    </View>
    <View style={styles.separator} />
    <View style={styles.listView}>
      <Text style={styles.listTitle}>완료된 일</Text>
    </View>
    <InputForm />
  </SafeAreaView>
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 50 : 0, // os에 따라 다르게 적용
    backgroundColor: '#f7f8fa',
  },
  pageTitle:{
    marginBottom: 35,
    paddingHorizontal: 15,
    fontSize: 54,
    fontWeight: '600',
  },
  separator: {
    marginHorizontal: 10,
    marginTop: 25,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  listView: {
    fleX: 1,
  },
  listTitle: {
    marginBottom: 25,
    paddingHorizontal: 15,
    fontSize: 41,
    fontWeight: '500',
  }

})
