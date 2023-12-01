import React, { useEffect } from 'react'
import HomeTopTap from '../../navigator/HomeTopTab'
import { Pressable, SafeAreaView, StatusBar, Text } from 'react-native'
import { View } from '../../components/Shared/View'
import Header from '../../components/Layout/Header'
import SideMenu from './SideMenu'
import { DrawerActions, useNavigation } from '@react-navigation/native'

const Home = ({ navigation }: any) => {

  return (
    <View>
      <Header menu title='Joobs' search notifications messages navigation={navigation} />
      <HomeTopTap />  
      {/* <SideMenu /> */}
    </View>
  )
}

export default Home