import React from 'react'
import HomeTopTap from '../../navigator/HomeTopTab'
import { SafeAreaView, StatusBar } from 'react-native'
import { View } from '../../components/Shared/View'
import Header from '../../components/Layout/Header'

const Home = ({ navigation }: any) => {
  return (
    <View>
      <Header title='Joobs' search notifications messages navigation={navigation} />
      <HomeTopTap />  
    </View>
  )
}

export default Home