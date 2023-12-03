import { View as DefaultView, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MessagesTopTap from '../../../navigator/MessagesTopTab'
import Icon from 'react-native-vector-icons/Ionicons'
import { View } from '../../../components/Shared/View'

const Messages = ({ navigation  }: any) => {
  return (
    <View>
        <DefaultView style={{
            backgroundColor: '#121212',
            height: 30,
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='chevron-back' size={25} color='#fff' />
            </TouchableOpacity>
            <Text style={{
                fontSize: 20,
                color: '#fff',
            }}>Mensajes</Text>

        </DefaultView>
      <MessagesTopTap />
    </View>
  )
}

export default Messages