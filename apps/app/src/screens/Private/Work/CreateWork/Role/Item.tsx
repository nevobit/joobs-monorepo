import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Item = ({setType, type, title, copy}: any) => {
  return (
    <TouchableOpacity 
                    onPress={() => setType(title)}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 15,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: type == title? '#5368f5' : 'rgba(0,0,0,0.3)',
                        backgroundColor: type == title? 'rgba(83, 104, 245, 0.1)' : '#fff',
                        padding: 10
                    }}>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.3)'
                        }} />

                        <View>
                            <Text style={{
                                fontWeight: '600',
                                color: 'rgba(0,0,0,0.8)',
                                fontSize: 18
                            }}>{title}</Text>
                            <Text>{copy}</Text>
                        </View>
                    </TouchableOpacity>
  )
}

export default Item