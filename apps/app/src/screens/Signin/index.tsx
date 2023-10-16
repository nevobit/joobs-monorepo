import React, { useState } from 'react'
import { Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Field from '../../components/Shared/Field'
import Input from '../../components/Shared/Input'
import Button from '../../components/Shared/Button'
import { useDispatch } from 'react-redux'
import { signin } from '../../store/features/auth'
import Icon from 'react-native-vector-icons/Ionicons'

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
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 25
    }}>
              <StatusBar backgroundColor='#fff' />
              <TouchableOpacity style={{
                marginBottom: 10
              }} onPress={() => navigation.navigate('Onboarding')}>
          <Icon name='arrow-back' size={25} color='rgba(0,0,0,0.8)' />
        </TouchableOpacity>
        <Text style={{
            fontWeight: '600',
            fontSize: 20,
            color: 'rgba(0,0,0,0.8)',
            marginBottom: 180
        }}>Inicia sesión con tu correo</Text>
        
        <Field label='Correo electronico'>
            <Input placeholder='Ingresa tu correo electronico' />
        </Field>

        <Text style={{
            fontWeight: '400',
            fontSize: 13,
            color: 'rgba(0,0,0,0.8)',
            marginTop: 15,
            marginBottom: 20
        }}>Te enviaremos un codigo a este correo electronico, con el podras ingresar a tu cuenta.</Text>
        
        <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
          <Text style={{
            color: '#5368f5',
            fontSize: 14,
            fontWeight: '500'
          }}>Volver</Text>
        </TouchableOpacity>
        <Button style={{
          marginTop: 'auto'
        }} loading={loading} onPress={onSubmit}  text='Continuar' />
       
    </View>
  )
}

export default Signin