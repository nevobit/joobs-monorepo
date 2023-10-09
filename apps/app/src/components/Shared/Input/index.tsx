import React from 'react'
import { TextInput } from 'react-native'

interface Props {
    placeholder: string
}

const Input = ({placeholder}: Props) => {
  return (
    <TextInput style={{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 10,
        padding: 10,
        fontSize: 14
    }} placeholder={placeholder} />
  )
}

export default Input