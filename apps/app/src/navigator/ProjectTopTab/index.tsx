import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import Listing from '../../screens/Private/Work/Listing';
import Discussions from '../../screens/Home/Discussions';
import Clubs from '../../screens/Home/Clubs';
import Presentations from '../../screens/Projects/Presentations';
import ProjectsList from '../../screens/Projects/ProjectsList';

const Tab = createMaterialTopTabNavigator();

const ProjectTopTap = () => {
  return (
    <Tab.Navigator

    screenOptions={{
      tabBarStyle:{backgroundColor: '#121212'},
      tabBarLabelStyle: {fontSize: 14, color: '#fff', textTransform: 'capitalize'},
      tabBarIndicatorStyle: {backgroundColor: '#5368f5'},
      tabBarActiveTintColor: '#5368f5',
    }}
      >
      <Tab.Screen name="Presentaciones" component={Presentations} />
      <Tab.Screen name="Proyectos" component={ProjectsList} />
    </Tab.Navigator>
  );
};

export default ProjectTopTap;