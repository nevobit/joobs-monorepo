import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import Listing from '../../screens/Private/Work/Listing';
import Discussions from '../../screens/Home/Discussions';
import Clubs from '../../screens/Home/Clubs';

const Tab = createMaterialTopTabNavigator();

const HomeTopTap = () => {
  return (
    <Tab.Navigator

    screenOptions={{
      tabBarStyle:{backgroundColor: '#121212'},
      tabBarLabelStyle: {fontSize: 14, color: '#fff', textTransform: 'capitalize'},
      tabBarIndicatorStyle: {backgroundColor: '#5368f5'},
      tabBarActiveTintColor: '#5368f5',
    }}
      >
      <Tab.Screen name="Discusiones" component={Discussions} />
      <Tab.Screen name="Clubs" component={Clubs} />
    </Tab.Navigator>
  );
};

export default HomeTopTap;