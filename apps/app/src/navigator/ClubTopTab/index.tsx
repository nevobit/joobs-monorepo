import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../../screens/Home';
import Explorer from '../../screens/Private/Work/Explorer';
import Listing from '../../screens/Private/Work/Listing';
import Applications from '../../screens/Private/Work/Applications';
import Discussions from '../../screens/Home/Discussions';
import Clubs from '../../screens/Home/Clubs';
import { Work } from '../../screens/Private';
import Members from '../../screens/Private/Members';
import Project from '../../screens/Projects';
import ProjectsList from '../../screens/Projects/ProjectsList';
import MembersClub from '../../screens/Home/Clubs/Club/Members';
import DiscussionsClub from '../../screens/Home/Clubs/Club/Discussions';

const Tab = createMaterialTopTabNavigator();

const ClubTopTap = ({navigation, search, id}: any) => {
  return (
    <Tab.Navigator

    screenOptions={{
      tabBarScrollEnabled: true,
      tabBarStyle:{backgroundColor: '#121212'},
      tabBarLabelStyle: {fontSize: 14, color: '#fff', textTransform: 'capitalize'},
      tabBarIndicatorStyle: {backgroundColor: '#5368f5'},
      tabBarActiveTintColor: '#5368f5',
    }}
      >
      <Tab.Screen name="Discusiones" component={() => <DiscussionsClub navigation={navigation} id={id} />} />
      <Tab.Screen name="Miembros" component={() => <MembersClub id={id} />} />
    </Tab.Navigator>
  );
};

export default ClubTopTap;

// screenOptions={({route}) => ({
//   tabBarIcon: ({color, focused}) => {
//     let icon: string = '';

//     switch (route.name) {
//       case 'Explorar':
//         icon = focused ? 'aperture' : 'aperture-outline';
//         break;
//       case 'Listados':
//         icon = focused ? 'calendar' : 'calendar-outline';
//         break;
//       case 'Aplicaciones':
//         icon = focused ? 'calendar' : 'calendar-outline';
//         break;
//       default:
//         break;
//     }

//     return (
//       <Icon
//         name={icon}
//         size={25}
//         style={{
//           color: focused ? color : 'rgba(255,255,255,0.8)',
//         }}
//       />
//     );
//   },
//   tabBarLabelStyle: {fontSize: 0, color: '#fff'},
//   tabBarStyle: {backgroundColor: 'rgba(0,0,0,1)'},
//   tabBarIndicatorStyle: {backgroundColor: "#00f"},
//   tabBarActiveTintColor: "#00f",
// })}
// sceneContainerStyle={{
//   backgroundColor: '#121212',
// }}