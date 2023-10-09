import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Field from '../../components/Shared/Field'
import Input from '../../components/Shared/Input'
import Button from '../../components/Shared/Button'
import { useDispatch } from 'react-redux'
import { signin } from '../../store/features/auth'

const Signin = ({navigation}: any) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
          dispatch(signin({phone: 3226589914, name: 'Nestor Mosquera'}));
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <View style={{
        backgroundColor: '#fff',
        height: '100%',
        paddingHorizontal: 15,
        paddingTop: 50
    }}>
        <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 40
        }}>
        <Image 
        style={{
            width: 200,
            height: 150,
            objectFit: 'contain'
        }}
        source={{
            uri: 'https://i.ibb.co/P9VN5hX/Screenshot-from-2023-07-28-12-01-05.png'
        }} />
        </View>

        
        <Text>Bienvenido</Text>
        <Text style={{
            fontWeight: '600',
            fontSize: 24,
            color: 'rgba(0,0,0,0.8)'
        }}>Inicia sesión ahora</Text>
        
        <Field label='Numero de telefono'>
            <Input placeholder='Ingresa tu numero de telefono' />
        </Field>
        <Button loading={loading} onPress={onSubmit}  text='Continuar' />
       
       <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80
       }}>
       <Text style={{
        fontSize: 16,
        color: '#000'
       }}>No tienes cuenta? </Text>
<TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#000'
       }}>Registrate</Text></TouchableOpacity>
       </View>
    </View>
  )
}

export default Signin