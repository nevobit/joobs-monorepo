import { View, Text } from 'react-native'
import React from 'react'
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import Header from '../Private/Work/CreateWork/Header'
import BasicInformation from './BasicInformation';


export type HomeStackParamList = {
    BasicInformation: undefined;
    Skills: { title: string };
    Role: { title: string, skills: string[] };
    Location: { title: string, skills: string[], type: string };
    Description: { title: string, skills: string[], type: string, location: { address: string } };
    Review: { title: string, skills: string[], type: string, location: { address: string }, description: string };

};

type HomeStackNavigationProp = StackNavigationProp<HomeStackParamList>;

const Stack = createStackNavigator<HomeStackParamList>();

const RegisterWorkStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BasicInformation" component={BasicInformation}
                options={({ navigation, route }) => ({
                    header: () => <Header color='#5368f5' step={0} />
                })}
            />
        </Stack.Navigator>
    )
}

export default RegisterWorkStack


