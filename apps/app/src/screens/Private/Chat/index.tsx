import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/Ionicons'


const CustomView = () => {
return(
    <View >
        {/* <Icon name="lock" color="#9d9d9d" size={16} /> */}
        <Text >
          Your chat is secured. Remember to be cautious about what you share
          with others.
        </Text>
      </View>

)
}

const CustomToolbar = () => {

    return (
        <View style={{
            backgroundColor: '#fff',
            alignItems: 'center',
            paddingHorizontal: 15
}}>
            <TextInput style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: 50,
                height: 40,
                marginTop: 10,
                width: '100%',
                paddingHorizontal: 10,
                fontSize: 14
            }} />

          </View>
    )

}
const Chat = ({navigation}: any) => {
    const [messages, setMessages] = useState<any>([])

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages:any = []) => {
      setMessages((previousMessages: any) =>
        GiftedChat.append(previousMessages, messages),
      )
    }, [])
  return (
    <>
         <View style={{
            backgroundColor: '#121212',
            height: 40,
            paddingBottom: 10,
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='chevron-back' size={25} color='#fff' />
            </TouchableOpacity>
            <Image source={{
                uri: 'https://i.ibb.co/4m6pVHr/img5.jpg'
            }} style={{
                width: 32,
                height:32,
                borderRadius: 50,
                objectFit: 'contain',
            }} />
            <Text style={{
                fontSize: 20,
                color: '#fff',
            }}>Bittu Rajput</Text>

        </View>
        {/* <View style={{
          height: 10,
          backgroundColor: '#121212'
        }} /> */}
          <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderInputToolbar={CustomToolbar}
        renderCustomView={CustomView}
    />
    </>

  )
}

export default Chat