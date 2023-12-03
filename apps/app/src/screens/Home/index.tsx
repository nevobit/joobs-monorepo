import React from 'react'
import HomeTopTap from '../../navigator/HomeTopTab'
import { View } from '../../components/Shared/View'
import Header from '../../components/Layout/Header'

const Home = ({ navigation }: any) => {
  return (
    <View>
      <Header menu title='Joobs' search notifications messages navigation={navigation} />
      <HomeTopTap />  
    </View>
  )
}

export default Home