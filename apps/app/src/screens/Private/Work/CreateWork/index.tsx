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
  Location: { title: string, skills: string[], type: string };
  Description: { title: string, skills: string[], type: string, location: { address: string } };
  Review: { title: string, skills: string[], type: string, location: { address: string }, description: string };

};

type HomeStackNavigationProp = StackNavigationProp<HomeStackParamList>;

const Stack = createStackNavigator<HomeStackParamList>();

const CreateWorkStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Title" component={Title} 
      options={({ navigation, route }) => ({
        header: () => <Header title='Crear una publicación' step={0}  />
      })}
    />
     <Stack.Screen name="Skills" component={Skills} 
      options={({ navigation, route }) => ({
        header: () => <Header title='Crear una publicación' step={1}  />
      })}
    />

<Stack.Screen name="Role" component={Role} 
      options={({ navigation, route }) => ({
        header: () => <Header title='Crear una publicación' step={2}  />
      })}
    />

<Stack.Screen name="Location" component={Location} 
      options={({ navigation, route }) => ({
        header: () => <Header title='Crear una publicación' step={3}  />
      })}
    />
    <Stack.Screen name="Description" component={Description} 
      options={({ navigation, route }) => ({
        header: () => <Header title='Crear una publicación' step={4}  />
      })}
    />

<Stack.Screen name="Review" component={Review} 
      options={({ navigation, route }) => ({
        header: () => <Header title='Crear una publicación' step={5}  />
      })}
    />

  </Stack.Navigator>
  )
}

export default CreateWorkStack


