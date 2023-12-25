import React from 'react'
import { View as DefaultView, Pressable, Text } from 'react-native';

const MessageCard = ({ text, isSender }: { text: string, isSender: boolean }) => {
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
                }}>
                02:25 PM
              </Text>
            </Pressable>
  )
}

export default MessageCard