import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from '../../../screens/Onboarding';
import Signin from '../../../screens/Signin';
import Signup from '../../../screens/Signup';
import RegisterWorkStack from '../../../screens/Register'
import VerificationCode from '../../../screens/VerificationCode';

const Auth = createStackNavigator();

export const AuthStack = () => {
    return (
      <Auth.Navigator initialRouteName='Onboarding' screenOptions={{ headerShown: false }}>
        <Auth.Screen
          name='Onboarding'
          component={Onboarding}
          options={{
            presentation: 'card',
            animationTypeForReplace: 'push'
          }}
        />
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
        <Auth.Screen 
        name='VerificationCode'
        component={VerificationCode}
        options={{
          presentation: 'card',
          animationTypeForReplace: 'push'
        }}
        />
        <Auth.Screen
          name='Register'
          component={RegisterWorkStack}
          options={{
            presentation: 'card',
            animationTypeForReplace: 'push'
          }}
        />
      </Auth.Navigator>
    )
  }
  

export default AuthStack