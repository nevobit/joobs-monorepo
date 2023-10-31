import React, { ReactNode } from 'react'
import { Text, View, ViewProps } from 'react-native'

interface Props  extends ViewProps {
    label?: string;
    children: ReactNode;
}

const Field = ({label, children, style, ...rest}: Props) => {
  return (
    <View style={[{
        marginTop: 20
    }, style]}
    {...rest}
    >
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