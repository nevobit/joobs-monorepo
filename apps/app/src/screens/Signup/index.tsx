import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Field from '../../components/Shared/Field'
import Input from '../../components/Shared/Input'
import Button from '../../components/Shared/Button'

const Signup = ({navigation}: any) => {
  return (
    <View style={{
        backgroundColor: '#fff',
        height: '100%',
        paddingHorizontal: 15,
        paddingTop: 20
    }}>
     <TouchableOpacity onPress={() => navigation.goBack()} style={{
        marginBottom: 40
     }}>
        <Text style={{
            color: '#000',
            fontSize: 16
        }}>Atras</Text>
     </TouchableOpacity>

        
        <Text>Bienvenido</Text>
        <Text style={{
            fontWeight: '600',
            fontSize: 24,
            color: 'rgba(0,0,0,0.8)'
        }}>Registrate ahora</Text>
        
        <Field label='Nombre completo'>
            <Input placeholder='Ingresa tu numero de telefono' />
        </Field>
        <Field label='Numero de telefono'>
            <Input placeholder='Ingresa tu numero de telefono' />
        </Field>
        <Field label='Cedula de ciudadania'>
            <Input placeholder='Ingresa tu numero de telefono' />
        </Field>
        <Button text='Continuar' />
       
       <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80
       }}>
       <Text style={{
        fontSize: 16,
        color: '#000'
       }}>Ya tienes cuenta? </Text>
<TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#000'
       }}>Inicia sesión</Text></TouchableOpacity>
       </View>
    </View>
  )
}

export default Signup