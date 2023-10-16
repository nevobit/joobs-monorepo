import React, { useState } from 'react'
import { TextInput } from 'react-native'

interface Props {
    placeholder: string
}

const Input = ({placeholder}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput style={{
        borderWidth: 1,
        borderColor: isFocused? '#5368f5' : 'rgba(0,0,0,0.2)',
        borderRadius: 10,
        padding: 10,
        fontSize: 14,
        backgroundColor: isFocused? 'rgba(83, 104, 245, 0.1)' : '#fff'
    }}  
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    placeholder={placeholder} />
  )
}

export default Input