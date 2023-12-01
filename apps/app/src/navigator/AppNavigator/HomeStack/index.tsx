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
import SideMenu from '../../../screens/Home/SideMenu';

export type HomeStackParamList = {
  Joobs: undefined;
  Search: undefined;
  CreatePost: undefined;
  SideMenu: undefined;
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
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SideMenu"
        component={SideMenu}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
