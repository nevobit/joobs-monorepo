import {View, Text} from 'react-native';
import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import Home from '../../../screens/Home';
import CreatePost from '../../../screens/Home/CreatePost';
import Header from '../../../components/Layout/Header';
import Search from '../../../screens/Private/Search';

export type HomeStackParamList = {
  Joobs: undefined;
  Search: undefined;
  CreatePost: undefined;
};

type HomeStackNavigationProp = StackNavigationProp<HomeStackParamList>;

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Joobs"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Search"
        component={Search}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
