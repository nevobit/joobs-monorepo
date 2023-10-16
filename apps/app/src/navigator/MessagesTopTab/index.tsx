import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import Explorer from '../../screens/Private/Work/Explorer';
import Listing from '../../screens/Private/Work/Listing';

const Tab = createMaterialTopTabNavigator();

const MessagesTopTap = () => {
  return (
    <Tab.Navigator

    screenOptions={{
      tabBarStyle:{backgroundColor: '#121212'},
      tabBarLabelStyle: {fontSize: 14, color: '#fff', textTransform: 'capitalize'},
      tabBarIndicatorStyle: {backgroundColor: '#5368f5'},
      tabBarActiveTintColor: '#5368f5',
    }}
      >
      <Tab.Screen name="Mensajes" component={Explorer} />
      <Tab.Screen name="JB Trabajo" component={Listing} />
    </Tab.Navigator>
  );
};

export default MessagesTopTap;