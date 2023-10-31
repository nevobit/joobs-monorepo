import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { BottomSheet } from '../../../containers';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../../../navigator/AppNavigator/HomeStack';
import { useDispatch } from 'react-redux';
import { signout } from '../../../store/features/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface HomeProps extends StackScreenProps<HomeStackParamList> { }

interface Props {
  title: string;
  navigation: any
  notifications?: boolean;
  messages?: boolean;
  profile?: boolean;
  whathsapp?: boolean;
}

const Header = ({ title, navigation, messages, notifications, profile, whathsapp }: Props) => {
  const [profileOptions, setProfileOptions] = useState(false);
  const dispatch = useDispatch();
  const logout = async () => {
    dispatch(signout());
    await GoogleSignin.signOut();
  };
  return (
    <>
    <View style={{
      backgroundColor: '#121212',
      padding: 10,
      paddingBottom: 5
    }}>
      <StatusBar backgroundColor={'#121212'} barStyle='light-content' />
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>

        <Text style={styles.title}>{title}</Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15
        }}>
          {whathsapp && (

            <TouchableOpacity>
              <Icon name='logo-whatsapp' size={24} color='#fff' />
            </TouchableOpacity>
          )}

          {notifications && (

            <TouchableOpacity>
              <Icon name='notifications-outline' size={24} color='#fff' />
            </TouchableOpacity>
          )}

          {messages && (
            <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
              <Icon name='chatbubble-outline' size={24} color='#fff' />
            </TouchableOpacity>
          )}

          {profile && (
            <TouchableOpacity onPress={() => setProfileOptions(true)}>
              <Icon name='ellipsis-vertical-sharp' size={24} color='#fff' />
            </TouchableOpacity>
          )}

        </View>
      </View>

    </View>

    <BottomSheet isVisible={profileOptions} setIsVisible={() => setProfileOptions(!profileOptions)}>
      <TouchableOpacity onPress={logout}>
        <Text style={{
          textAlign: 'center',
          color: 'rgba(0,0,0,0.8)',
          fontSize: 14
        }}>Cerrar sesion</Text>
      </TouchableOpacity>
    </BottomSheet>
    </>

  )
}

export default Header;