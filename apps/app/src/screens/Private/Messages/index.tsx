import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import MessagesTopTap from '../../../navigator/MessagesTopTab'
import Icon from 'react-native-vector-icons/Ionicons'

const Messages = ({ navigation  }: any) => {
  return (
    <SafeAreaView style={{
        flex: 1
    }}>
        <View style={{
            backgroundColor: '#121212',
            height: 30,
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='arrow-back' size={25} color='#fff' />
            </TouchableOpacity>
            <Text style={{
                fontSize: 20,
                color: '#fff',
            }}>Mensajes</Text>

        </View>
      <MessagesTopTap />
    </SafeAreaView>
  )
}

export default Messages