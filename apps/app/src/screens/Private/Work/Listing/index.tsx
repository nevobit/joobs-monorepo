import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Listing = ({navigation}: any) => {
  return (
    <View style={{
      alignItems: 'center',
      paddingHorizontal: 20
    }}>
      <Text style={{
        fontWeight: '500',
        color: 'rgba(0,0,0,0.8)',
        fontSize: 16,
        marginTop: 60
      }}>
        Parece que esta vacio :/
      </Text>
      <Text style={{
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10,
        color: 'rgba(0, 0, 0, 0.6)'
      }}>No dejes este esoacui solo. Crea una oferta de trabajo y atrae candidadtos fabulosos en poco tiempo!</Text>

      <TouchableOpacity style={{
        backgroundColor: '#5368f5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
      }}
      onPress={() => navigation.navigate('CreateWork')}
      >
        <Text style={{
          color: '#fff',
          fontSize: 14
        }}>Crear Publicacion</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Listing