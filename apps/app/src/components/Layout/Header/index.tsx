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
import sendWhatsApp from '../../../utils/send-whatsapp';
import { DrawerActions } from '@react-navigation/native';

interface HomeProps extends StackScreenProps<HomeStackParamList> { }

interface Props {
  title: string;
  navigation: any
  notifications?: boolean;
  search?: boolean;
  messages?: boolean;
  profile?: boolean;
  whathsapp?: boolean;
  menu?: boolean;
}

const Header = ({ menu, title, navigation, search, messages, notifications, profile, whathsapp }: Props) => {
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
          <View style={{
            flexDirection: 'row',
            gap: 10
          }}>

            {menu && (
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
                <Icon name='menu' size={30} color='#fff' />
              </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15
          }}>

            {whathsapp && (

              <TouchableOpacity onPress={() => sendWhatsApp('Quiero dar feedback')}>
                <Icon name='logo-whatsapp' size={24} color='#fff' />
              </TouchableOpacity>
            )}

            {search && (
              <TouchableOpacity onPress={() => navigation.navigate('Search')} >
                <Icon name='search-outline' size={24} color='#fff' />
              </TouchableOpacity>
            )}

            {notifications && (
              <TouchableOpacity onPress={() => navigation.navigate('Notifications')} >
                <Icon name='notifications-outline' size={24} color='#fff' />
              </TouchableOpacity>
            )}

            {messages && (
              <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
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
            fontSize: 14,
            marginBottom: 20
          }}>Danos retroalimentación</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Text style={{
            textAlign: 'center',
            color: 'rgba(0,0,0,0.8)',
            fontSize: 14,
            marginBottom: 20
          }}>Borrar cuenta</Text>
        </TouchableOpacity>

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