import { View, Text } from 'react-native'
import React from 'react'
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import Header from './Header';
import Title from './Title';
import Skills from './Skills';
import Role from './Role';
import Location from './Location';
import Description from './Description';
import Review from './Review';


export type HomeStackParamList = {
  Title: undefined;
  Skills: { title: string };
  Role: { title: string, skills: string[] };
  Location: { title: string, skills: string[], type: string, remuneration: { value: number, frecuency: string } };
  Description: { title: string, skills: string[], type: string, location: { address: string }, remuneration: { value: number, frecuency: string } };
  Review: { title: string, skills: string[], type: string, location: { address: string }, description: string, remuneration: { value: number, frecuency: string } };

};

type HomeStackNavigationProp = StackNavigationProp<HomeStackParamList>;

const Stack = createStackNavigator<HomeStackParamList>();

const CreateWorkStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Title" component={Title} 
      options={{
        headerShown: false
      }}
    />
     <Stack.Screen name="Skills" component={Skills} 
      options={{
        headerShown: false
      }}
    />

<Stack.Screen name="Role" component={Role} 
      options={{
        headerShown: false
      }}
    />

<Stack.Screen name="Location" component={Location} 
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen name="Description" component={Description} 
     options={{
      headerShown: false
    }}
    />

<Stack.Screen name="Review" component={Review} 
      options={{
        headerShown: false
      }}
    />

  </Stack.Navigator>
  )
}

export default CreateWorkStack


