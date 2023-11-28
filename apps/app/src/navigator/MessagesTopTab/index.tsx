import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import Chats from '../../screens/Private/Messages/Chats';
import Listing from '../../screens/Private/Work/Listing';
import JbWork from '../../screens/Private/Messages/JbWork';

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
      <Tab.Screen name="Mensajes" component={Chats} />
      <Tab.Screen name="JB Trabajo" component={JbWork} />
    </Tab.Navigator>
  );
};

export default MessagesTopTap;