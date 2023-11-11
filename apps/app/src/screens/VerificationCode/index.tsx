import React, { useState } from 'react'
import { Image, StatusBar, Text,  TouchableOpacity, View } from 'react-native'
import Field from '../../components/Shared/Field'
import Input from '../../components/Shared/Input'
import Button from '../../components/Shared/Button'
import { useDispatch } from 'react-redux'
import { saveUserInfo, signin } from '../../store/features/auth'
import Icon from 'react-native-vector-icons/Ionicons'
import { useMutation } from '@apollo/client'
import { LOGIN, VERIFY_CODE } from '../../graphql/mutations'

const VerificationCode = ({navigation, route}: any) => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const [verify, {loading, error}] = useMutation(VERIFY_CODE);


    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
          const { data } = await verify({
            variables: {
              code,
              email: route.params.email
            }
          });

          console.log(route.params.type)
          if(route.params.type == 'register') {
            dispatch(saveUserInfo({ email: route.params.email }));
            navigation.navigate('Register', { email: route.params.email })
          }else{
            dispatch(signin({token: data.verifyCode.token}));
          }
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
            marginBottom: 20
        }}>Te hemos enviado un correo electrónico</Text>
        
        <Field label='Codigo'>
            <Input keyboardType='number-pad' onChangeText={(text) => setCode(text)} maxLength={6} placeholder='Ingresa el codigo' />
        </Field>

        <Text style={{
            fontWeight: '400',
            fontSize: 13,
            color: 'rgba(0,0,0,0.8)',
            marginTop: 15,
            marginBottom: 20
        }}>Te enviamos un codigo a <Text style={{
            fontWeight: '600'
        }}>{route.params.email}</Text>.</Text>
        
      
        <Button style={{
          marginTop: 'auto'
        }} loading={loading} onPress={onSubmit}  text='Continuar' />
       
    </View>
  )
}

export default VerificationCode