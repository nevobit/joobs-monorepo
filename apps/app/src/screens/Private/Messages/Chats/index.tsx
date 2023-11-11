import React from 'react'
import { Image } from 'react-native'
import { Text, View } from 'react-native'

const Chats = () => {
  return (
    <View>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
      }}>
        <Image source={{
          uri: 'https://i.ibb.co/N6PvW1M/Screenshot-from-2023-11-02-11-46-00-removebg-preview.png'
        }} style={{
          width: 150,
          height: 150
        }} />
        <Text style={{
          color: 'rgba(0,0,0,0.5)',
          fontWeight: '500',
          fontSize: 14

        }}>Aún no tienes conexiones</Text>
      </View>
    </View>
  )
}

export default Chats