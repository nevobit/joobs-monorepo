import React, { useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'

interface Props extends TextInputProps {
    placeholder: string
}

const Textarea = ({placeholder, ...rest}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput style={{
        borderWidth: 1,
        borderColor: isFocused? '#5368f5' : 'rgba(0,0,0,0.2)',
        borderRadius: 10,
        padding: 10,
        fontSize: 14,
        color: 'rgba(0,0,0,0.8)',
        textAlignVertical: 'top',
        backgroundColor: isFocused? 'rgba(83, 104, 245, 0.1)' : '#fff'
    }} 
    multiline
    numberOfLines={10} 
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    placeholder={placeholder} 
    placeholderTextColor='rgba(0,0,0,0.4)'
    {...rest}
    />
  )
}

export default Textarea