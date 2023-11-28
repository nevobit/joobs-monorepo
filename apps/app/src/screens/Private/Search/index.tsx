import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import WorkTopTap from '../../../navigator/WorkTopTab'
import Icon from 'react-native-vector-icons/Ionicons'
import { WorkCard } from '../../../components/UI'
import SearchTopTap from '../../../navigator/SearchTopTab'

const Search = ({navigation}: any) => {
  const [search, setSearch] = useState('');
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
        
<View style={{
                backgroundColor: '#121212',
                // height: 30,
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                paddingTop: 5,
                paddingBottom: 10
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={25} color='#fff' />
                </TouchableOpacity>
                <TextInput style={{
                  backgroundColor: 'rgba(255,255,255,.2)',
                  width: '90%',
                  height: 30,
                  borderRadius: 50,
                  padding: 0,
                  paddingHorizontal: 10,
                  color: '#fff',
                  fontSize: 14
                }} placeholder='Buscar' onChangeText={(text) => setSearch(text)} placeholderTextColor='rgba(255,255,255,.3)' />

            </View>

        <SearchTopTap navigation={navigation} search={search} />
    </SafeAreaView>
  )
}

export default Search