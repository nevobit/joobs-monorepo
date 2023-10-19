import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import Field from '../../../components/Shared/Field'
import Input from '../../../components/Shared/Input'
import Button from '../../../components/Shared/Button'
import Icon from 'react-native-vector-icons/Ionicons'

const BasicInformation = () => {
  return (
    <View style={{
        backgroundColor: '#5368f5',
        flex: 1,
    }}>
        <StatusBar backgroundColor='#5368f5' />
        <Text style={{
            color: '#fff',
            fontWeight: '400',
            fontSize: 16,
            marginTop: 20,
        paddingHorizontal: 15
        }}>Hey 👋</Text>
        <Text style={{
            color: '#fff',
            fontWeight: '600',
            fontSize: 18,
            marginTop: 5,
        paddingHorizontal: 15

        }}>Construyamos tu perfil juntos</Text>
        
        <View style={{
            backgroundColor: '#fff',
            flex: 1,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            marginTop: 70,
            paddingHorizontal: 15,
        }}>

            <TouchableOpacity style={{
                backgroundColor: 'orange',
                height: 100,
                width: 100,
                borderRadius: 100,
                position:'absolute',
                top: -50,
                left: '50%',
                transform: [{ translateX: -50 }],
                zIndex: 999,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize: 55,
                    fontWeight: '400',
                    color: '#fff'
                }}>N</Text>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 70,
                    backgroundColor: 'rgba(255, 255, 255, .9)',
                    height: 30, 
                    width: 30,
                    borderRadius: 60,
                    alignItems: 'center',
                justifyContent: 'center',
                elevation: 5, // Para Android
                shadowColor: 'black', // Para iOS
                shadowOffset: { width: 0, height: 2 }, // Para iOS
                shadowOpacity: 0.3, // Para iOS
                shadowRadius: 4, // Para iOS
                }}>
                    <Icon name='camera' />
                </View>
            </TouchableOpacity>
            <View style={{
                marginTop: 50
            }}>

            <Field label='Cual es tu nombre completo?'>
                <Input placeholder='Jose Pelaez' />
            </Field>
            <Field label='Cual es tu numero de telefono?'>
                <Input placeholder='Ej. 3214554555' />
            </Field>
            </View>

            <Button style={{
                marginTop: 'auto',
                marginBottom: 30
            }} text='Continuar ->' />
        </View>
    </View>
  )
}

export default BasicInformation