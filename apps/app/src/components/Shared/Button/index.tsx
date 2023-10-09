import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

interface Props {
    text: string
    onPress?: any
    loading?: boolean
}

const Button = ({loading, onPress, text}: Props) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={{
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20
    }}>
      {loading? <ActivityIndicator /> : (

        <Text style={{
            textAlign: 'center',
            color: '#fff',
            fontWeight: '600',
            fontSize: 16
        }}>{text}</Text>
        )}

        </TouchableOpacity>
  )
}

export default Button