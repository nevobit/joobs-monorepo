import React from 'react'
import { ActivityIndicator, ButtonProps, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface Props extends TouchableOpacityProps{
    text: string
    onPress?: any
    loading?: boolean
}

const Button = ({loading, onPress, text, style, ...rest}: Props) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={[{
      backgroundColor: '#5368f5',
      paddingVertical: 10,
      borderRadius: 50,
      marginTop: 20
  }, style]}
    {...rest}
    >
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