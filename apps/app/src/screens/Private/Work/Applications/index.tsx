import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Applications = ({navigation}: any) => {
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
      }}>Aun no has aplicado a ninguna oportunidad. Aplica a una oferta de trabajo y he impresiona a todos con tus fabulosas habilidades!</Text>

      <TouchableOpacity style={{
        backgroundColor: '#5368f5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
      }}
      onPress={() => navigation.navigate('Work')}
      >
        <Text style={{
          color: '#fff',
          fontSize: 14
        }}>Explorar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Applications