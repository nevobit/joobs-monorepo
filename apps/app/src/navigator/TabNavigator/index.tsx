import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import TabBar from '../../components/Layout/TabBar';
import HomeStack from '../AppNavigator/HomeStack';
import Home from '../../screens/Home';
import Header from '../../components/Layout/Header';
import Events from '../../screens/Private/Events';
import { Profile, Work } from '../../screens/Private';
import Project from '../../screens/Projects';
import { useUser } from '../../hooks/users/useUser';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { user } = useUser();
    const profileTitle = user?.email?.split('@')[0];
    return (
        <Tab.Navigator
            initialRouteName='Joobs'
            tabBar={(props: any) => <TabBar {...props} />}
        >
            <Tab.Screen name='Home' component={HomeStack}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen name='Projects' component={Project}
                options={{
                    headerShown: false
                  }}
            />
            <Tab.Screen name='Work' component={Work}
                options={{
                    headerShown: false
                  }}
            />
            <Tab.Screen name='Events' component={Events}
               options={{
                headerShown: false
            }}  
            />
            <Tab.Screen name='Profile' component={Profile}
                options={{
                    headerShown: false
                  }}
            />
        </Tab.Navigator>
    )
}
export default TabNavigator