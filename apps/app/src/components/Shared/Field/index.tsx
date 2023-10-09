import React, { ReactNode } from 'react'
import { Text, View } from 'react-native'

interface Props {
    label?: string;
    children: ReactNode
}

const Field = ({label, children}: Props) => {
  return (
    <View style={{
        marginTop: 20
    }}>
        {label &&
        <Text style={{
            fontSize: 16,
            marginBottom: 5,
            fontWeight: '600'
        }}>{label}</Text>}
        {children}
    </View>
  )
}

export default Field