import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../../screens/Home';

const Tab = createMaterialTopTabNavigator();

const WorkTopTap = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused}) => {
          let icon: string = '';

          switch (route.name) {
            case 'Explorar':
              icon = focused ? 'aperture' : 'aperture-outline';
              break;
            case 'Listados':
              icon = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Aplicaciones':
              icon = focused ? 'calendar' : 'calendar-outline';
              break;
            default:
              break;
          }

          return (
            <Icon
              name={icon}
              size={25}
              style={{
                color: focused ? color : 'rgba(255,255,255,0.8)',
              }}
            />
          );
        },
        tabBarLabelStyle: {fontSize: 0, color: '#fff'},
        tabBarStyle: {backgroundColor: 'rgba(0,0,0,1)'},
        tabBarIndicatorStyle: {backgroundColor: "#00f"},
        tabBarActiveTintColor: "#00f",
      })}
      sceneContainerStyle={{
        backgroundColor: '#121212',
      }}>
      <Tab.Screen name="Explorar" component={Home} />
      <Tab.Screen name="Listados" component={Home} />
      <Tab.Screen name="Aplicaciones" component={Home} />
    </Tab.Navigator>
  );
};

export default WorkTopTap;