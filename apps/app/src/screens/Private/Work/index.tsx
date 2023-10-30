import React from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import WorkTopTap from '../../../navigator/WorkTopTab'
import Icon from 'react-native-vector-icons/Ionicons'
import { WorkCard } from '../../../components/UI'

const Work = () => {
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      
        <WorkTopTap />
    </SafeAreaView>
  )
}

export default Work