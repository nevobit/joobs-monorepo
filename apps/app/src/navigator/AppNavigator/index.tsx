import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import CreatePost from '../../screens/Home/CreatePost';
import Messages from '../../screens/Private/Messages';
import AuthStack from './AuthStack';
import TabNavigator from '../TabNavigator';
import CreateWorkStack from '../../screens/Private/Work/CreateWork';
import WorkDetails from '../../screens/Private/Work/Details';
import Notifications from '../../screens/Private/Notifications';
import Club from '../../screens/Home/Clubs/Club';
import DiscussionDetails from '../../screens/Home/Discussions/Discussion'
import ProjectDetails from '../../screens/Projects/ProjectsList/ProjectDetails';
import EditProfile from '../../screens/Private/Profile/EditProfile';
import Chat from '../../screens/Private/Chat';
import EditProfileEducation from '../../screens/Private/Profile/EditProfileEducation';
import EditProfileNetwork from '../../screens/Private/Profile/EditProfileNetwork';
import EditProfileSkills from '../../screens/Private/Profile/EditProfileSkills';

export type RootStackParamsList = {
  Initial: undefined;
  CreatePost: undefined;
  Messages: undefined;
  Notifications: undefined;
  CreateWork: undefined;
  Chat: undefined;
  ProjectDetails: { id: string };
  WorkDetails: { id: string };
  Club: { id: string };
  Discussion: { id: string };
  EditProfile: { id: string };
  EditProfileEducation: { id: string };
  EditProfileNetwork: { id: string };
  EditProfileSkills: { id: string };
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
      <HomeStack.Screen name="Notifications" component={Notifications}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Messages" component={Messages}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="CreateWork" component={CreateWorkStack}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="WorkDetails" component={WorkDetails}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Club" component={Club}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Discussion" component={DiscussionDetails}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="ProjectDetails" component={ProjectDetails}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="EditProfile" component={EditProfile}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
       <HomeStack.Screen name="EditProfileEducation" component={EditProfileEducation}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
       <HomeStack.Screen name="EditProfileNetwork" component={EditProfileNetwork}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <HomeStack.Screen name="EditProfileSkills" component={EditProfileSkills}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <HomeStack.Screen name="Chat" component={Messages}
        options={{
          headerShown: false,
          presentation: 'modal',
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