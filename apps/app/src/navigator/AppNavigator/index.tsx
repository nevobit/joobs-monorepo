import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import CreatePost from '../../screens/Home/CreatePost';
import Messages from '../../screens/Private/Messages';
import AuthStack from './AuthStack';
import TabNavigator from '../TabNavigator';

export type RootStackParamsList = {
  Initial: undefined;
  CreatePost: undefined;
  Messages: undefined
}

export const HomeStack = createStackNavigator<RootStackParamsList>();

export const AppNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Initial' component={TabNavigator} options={{
        headerShown: false
      }} />
      <HomeStack.Screen name="CreatePost" component={CreatePost}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Messages" component={Messages}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  )
}

export const NavigatorContainer = () => {
  const { user } = useSelector((state: any) => state.auth);
  return <>
    {user ? <AppNavigator /> : <AuthStack />}
  </>
}