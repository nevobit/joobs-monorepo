import React from 'react'
import { StatusBar, Text, View } from 'react-native'
import Field from '../../../components/Shared/Field'
import Button from '../../../components/Shared/Button'
import Input from '../../../components/Shared/Input'
import Textarea from '../../../components/Shared/Textarea'

const RecruirProfile = ({navigation}: any) => {
  return (
    <View style={{
        backgroundColor: '#FFF',
        flex: 1,
    }}>
        <StatusBar backgroundColor='#FFFFFF' />
        <Text style={{
            color: 'rgba(0,0,0,0.8)',
            fontWeight: '600',
            fontSize: 20,
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

            <View style={{
                backgroundColor: 'orange',
                height: 100,
                width: 100,
                borderRadius: 100,
                position: 'absolute',
                top: -50,
                left: '50%',
                transform: [{ translateX: -40 }],
                zIndex: 999,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize: 55,
                    fontWeight: '400',
                    color: '#fff'
                }}>N</Text>
            </View>
            <View style={{
                marginTop: 50
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontWeight: '600',
                    color: 'rgba(0,0,0,0.8)',
                    fontSize: 24
                }}>Nestor Mosquera</Text>


                <Field label='Numero de telefono'>
                    <Input placeholder='' />
                </Field>


                <Field label='Nombre de la empresa'>
                    <Input placeholder='Menciona tu empresa/startup/idea' />
                </Field>
              <Field label='¿En qué estás trabajando?'>
                <Textarea placeholder='Habla sobre tu idea, producto o vision' />
              </Field>
            </View>

            <Button onPress={() => navigation.navigate('LocationInformation')} style={{
                marginTop: 'auto',
                marginBottom: 30
            }} text='Continuar ->' />
        </View>
    </View>
  )
}

export default RecruirProfile