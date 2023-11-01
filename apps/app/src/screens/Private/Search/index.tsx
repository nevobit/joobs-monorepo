import React from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import WorkTopTap from '../../../navigator/WorkTopTab'
import Icon from 'react-native-vector-icons/Ionicons'
import { WorkCard } from '../../../components/UI'
import SearchTopTap from '../../../navigator/SearchTopTab'

const Search = () => {
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      
        <SearchTopTap />
    </SafeAreaView>
  )
}

export default Search