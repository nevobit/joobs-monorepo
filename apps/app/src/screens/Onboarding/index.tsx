import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'

const Onboarding = ({navigation}: any) => {
  return (
    <View style={{
        flex: 1,
        backgroundColor: '#5368f5',
        padding: 15,
    }}>
        <StatusBar backgroundColor='#5368f5' />
        <View style={{
            marginTop: 'auto'
        }}>

      <Text style={{
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 15
      }}>Aprende. Gana. Conéctate.</Text>
      <Text style={{
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 15,
        color: '#fff'
      }}>Encuentra oportunidades remuneradas, mejora tus habilidades con eventos y establece contactos con mentes brillantes.</Text>
        <TouchableOpacity style={{
            backgroundColor: '#fff',
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50
        }}>
            <Text style={{
                textAlign: 'center',
                fontWeight: '500',
                fontSize: 14,
                color: 'rgba(0,0,0,0.8)'
            }}>Continua con Google</Text>
        </TouchableOpacity>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 15,
            marginTop: 10,
            marginBottom: 10,
        }}>
            <View style={{
                height: 1,
                backgroundColor: 'rgba(255,255,255,.5)',
                width: '45%'
            }} />
            <Text style={{
                color: '#fff',
                fontSize: 14
            }}>O</Text>
            <View style={{
                height: 1,
                backgroundColor: 'rgba(255,255,255,.5)',
                width: '45%'
            }} />
        </View>
        <TouchableOpacity 
        onPress={() => navigation.navigate('Signin')}
        style={{
            marginBottom: 10
        }}>
            <Text style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 16
            }}>Continua con tu correo</Text>
        </TouchableOpacity>
        </View>

    </View>
  )
}

export default Onboarding