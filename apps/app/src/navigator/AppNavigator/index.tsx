import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../../screens/Signin';
import Signup from '../../screens/Signup';
import Home from '../../screens/Home';
import TabBar from '../../components/Layout/TabBar';
import { useSelector } from 'react-redux';
import { Profile, Work } from '../../screens/Private';
import Header from '../../components/Layout/Header';
import Events from '../../screens/Private/Events';

const Tab = createBottomTabNavigator();
const Auth = createStackNavigator();

export const AuthNavigator = () => {
    return(
        <Auth.Navigator screenOptions={{headerShown: true}}>
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
      <Tab.Navigator 
      tabBar={(props: any) => <TabBar {...props} />}
      >
        <Tab.Screen name='Home' component={Home} 
          options={{
            header: () => <Header title='Joobs' />,
          }}
        
        />
        <Tab.Screen name='Projects' component={Home} 
            options={{
              header: () => <Header title='Proyectos' />,
            }}
        />
        <Tab.Screen name='Work' component={Work} 
        options={{
          header: () => <Header title='Trabajo' />,
        }}
        />
        <Tab.Screen name='Events' component={Events} 
            options={{
              header: () => <Header title='Eventos' />,
            }}
        />
        <Tab.Screen name='Profile' component={Profile} 
            options={{
              header: () => <Header title='@nestor65303' />,
            }}
        />

      </Tab.Navigator>
    )
  }

  export const NavigatorContainer = () => {
    const {user} =  useSelector((state:any) => state.auth);
    return <>
    {user ? <AppNavigator /> : <AuthNavigator />}
    </>
  }