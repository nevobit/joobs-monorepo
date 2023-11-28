import React, { useState } from 'react'
import { Image, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View as DefaultView} from 'react-native'
import Field from '../../components/Shared/Field'
import Input from '../../components/Shared/Input'
import Button from '../../components/Shared/Button'
import { useDispatch } from 'react-redux'
import { signin } from '../../store/features/auth'
import Icon from 'react-native-vector-icons/Ionicons'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../graphql/mutations'
import { View } from '../../components/Shared/View'

const Signin = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const [login, {loading, error}] = useMutation(LOGIN);


    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
          const { data } = await login({
            variables: {
              email
            }
          });
          navigation.navigate('VerificationCode', { email, type: data.userLogin.type })
          // if(data.userLogin.type == 'register') {
            // navigation.navigate('Register')
          // }else{
            // dispatch(signin({token: data.userLogin.token}));
          // }
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <View statusColor="#fff" barStyle="dark-content" style={{
      flex: 1,
      backgroundColor: "#fff"
    }}>
    <DefaultView style={{
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
        }}>Inicia sesión con tu correo</Text>
        
        <Field label='Correo electronico'>
            <Input onChangeText={(text) => setEmail(text)} placeholder='Ingresa tu correo electronico' />
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
        }} disabled={!email.includes('@')} loading={loading}  onPress={onSubmit}  text='Continuar' />
       
    </DefaultView>
    </View>

  )
}

export default Signin