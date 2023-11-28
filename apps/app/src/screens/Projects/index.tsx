import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import Input from '../../components/Shared/Input'
import Field from '../../components/Shared/Field'
import Icon from 'react-native-vector-icons/Ionicons'
import { HomePost } from '../../components/UI'
import HomeTopTap from '../../navigator/ProjectTopTab'
import ProjectTopTap from '../../navigator/ProjectTopTab'
import { View } from '../../components/Shared/View'
import Header from '../../components/Layout/Header'

const Project = ({ navigation }: any) => {

  return (
    <View>
      <Header title='Proyectos' search notifications  messages navigation={navigation} />
      <ProjectTopTap />
    </View>
  )
}

export default Project