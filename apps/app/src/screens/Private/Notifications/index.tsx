import { View as DefaultView, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import MessagesTopTap from '../../../navigator/MessagesTopTab'
import Icon from 'react-native-vector-icons/Ionicons'
import { View } from '../../../components/Shared/View'

const Notifications = ({ navigation  }: any) => {
  return (
    <View>
      <DefaultView style={{
        height: "100%",
        backgroundColor: "#f0f0f0"
      }}>

        <DefaultView style={{
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
            }}>Notificaciones</Text>

        </DefaultView>
        <DefaultView style={{
          height: 10,
          backgroundColor: '#121212'
        }} />

        <Text style={{
          textAlign: 'center',
          marginTop: 20,
          fontWeight: '400',
          color: 'rgba(0,0,0,0.6)',
          fontSize: 14
        }} >No tienes notificaciones</Text>
      </DefaultView>

    </View>
  )
}

export default Notifications