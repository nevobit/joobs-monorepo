import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../../screens/Signin';
import Signup from '../../screens/Signup';
import Home from '../../screens/Home';
import TabBar from '../../components/Layout/TabBar';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const Auth = createStackNavigator();

export const AuthNavigator = () => {
    return(
        <Auth.Navigator screenOptions={{headerShown: false}}>
            <Auth.Screen 
                name='Signin'
                component={Signin}
                options={{
                    presentation: 'card',
                    animationTypeForReplace: 'push'
                }}
            />
             <Auth.Screen 
                name='Signup'
                component={Signup}
                options={{
                    presentation: 'card',
                    animationTypeForReplace: 'push'
                }}
            />
        </Auth.Navigator>
    )
}


export const AppNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{
        headerShown: false
      }}
      tabBar={(props: any) => <TabBar {...props} />}
      >
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Projects' component={Home} />
        <Tab.Screen name='Work' component={Home} />
        <Tab.Screen name='Events' component={Home} />
        <Tab.Screen name='Profile' component={Home} />

      </Tab.Navigator>
    )
  }

  export const NavigatorContainer = () => {
    const {user} =  useSelector((state:any) => state.auth);
    return <>
    {user ? <AppNavigator /> : <AuthNavigator />}
    </>
  }