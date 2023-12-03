import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Skill = ({skill}: {skill: string}) => {
  return (
    <TouchableOpacity
    style={{
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderRadius: 15,
      padding: 5,
      paddingHorizontal: 20
    }}>
    <Text
         style={{
          fontSize: 13,
          color: 'rgba(0,0,0,0.8)',
        }}>
      {skill}
    </Text>
  </TouchableOpacity>
  )
}

export default Skill