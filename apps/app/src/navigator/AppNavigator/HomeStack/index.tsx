import { View, Text } from 'react-native'
import React from 'react'
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import Home from '../../../screens/Home';
import CreatePost from '../../../screens/Home/CreatePost';
import Header from '../../../components/Layout/Header';


export type HomeStackParamList = {
  Joobs: undefined;
  CreatePost: undefined;
};

type HomeStackNavigationProp = StackNavigationProp<HomeStackParamList>;

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Joobs" component={Home} 
      options={({ navigation, route }) => ({
        header: () => <Header title='Joobs' navigation={navigation} />,
      })}
    />

  </Stack.Navigator>
  )
}

export default HomeStack


