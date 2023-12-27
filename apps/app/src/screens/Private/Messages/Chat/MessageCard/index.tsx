import React from 'react'
import { View as DefaultView, Pressable, Text } from 'react-native';

const MessageCard = ({ text, isSender, created_at }: { text: string, isSender: boolean, created_at: string }) => {
  
  const date = new Date(Number(created_at))
  console.log(date)
  return (
    <Pressable
              style={{
                height: 60,
                alignSelf: isSender ? 'flex-end' : "flex-start",
              }}>
              <Text
                style={{
                  overflow: 'hidden',
                  backgroundColor: isSender? '#5169f6' : "#fff",
                  color: isSender? '#fff' : "#000",
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginBottom: 5,
                }}>
                    {text}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  alignSelf: isSender? 'flex-end': "flex-start",
                  color: "rgba(0,0,0,0.8)"
                }}>
                  {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </Text>
            </Pressable>
  )
}

export default MessageCard