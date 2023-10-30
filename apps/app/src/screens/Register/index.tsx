import React from 'react'
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import Header from '../Private/Work/CreateWork/Header'
import BasicInformation from './BasicInformation';
import PersonInformation from './PersonInformation';
import LocationInformation from './LocationInformation';
import WhyInformation from './WhyInformation';
import RecruirProfile from './RecruierProfile';
import SkillsInformation from './SkillsInformation';

export type HomeStackParamList = {
    BasicInformation: {email: string};
    PersonInformation: undefined;
    LocationInformation: undefined;
    WhyInformation: undefined;
    RecruierProfile: undefined;
    SkillsInformation: undefined;
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
            <Stack.Screen name="PersonInformation" component={PersonInformation}
                options={({ navigation, route }) => ({
                    header: () => <Header color='#5368f5' step={1} />
                })}
            />
              <Stack.Screen name="LocationInformation" component={LocationInformation}
                options={({ navigation, route }) => ({
                    header: () => <Header color='#5368f5' step={2} />
                })}
            />
              <Stack.Screen name="WhyInformation" component={WhyInformation}
                options={({ navigation, route }) => ({
                    header: () => <Header color='#5368f5' step={3} />
                })}
            />
               <Stack.Screen name="RecruierProfile" component={RecruirProfile}
                options={{
                    headerShown: false
                }}
            />
              <Stack.Screen name="SkillsInformation" component={SkillsInformation}
                  options={({ navigation, route }) => ({
                    header: () => <Header color='#5368f5' step={4} />
                })}
            />
        </Stack.Navigator>
    )
}

export default RegisterWorkStack


