import React, { useState } from 'react'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import Field from '../../../components/Shared/Field'
import Button from '../../../components/Shared/Button'
import Input from '../../../components/Shared/Input'
import Textarea from '../../../components/Shared/Textarea'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../../../graphql/mutations'
import { signin } from '../../../store/features/auth'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

const RecruirProfile = ({navigation}: any) => {
    const [company_name, setCompanyName] = useState<string>('');
    const [company_description, setCompanyDescription] = useState<string>('');
    
    const { userInfo } = useSelector((state: any) => state.auth);
    const [register, {loading, error}] = useMutation(REGISTER_USER);

    const navigate = useNavigation();

    const dispatch = useDispatch();

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {

          const { data } = await register({
            variables: {
              data: {
              name: userInfo.name,
              email: userInfo.email,
              phone: userInfo.phone,
              photo: userInfo.photo,
              gender: userInfo.gender,
              born_date: userInfo.born_date,
              location: userInfo.location,
              company_name,
              company_description
            }
            }
          });

          dispatch(signin({token: data.userRegister.token}));
        } catch (err) {
          console.log(err);
        }
      };

    return (
    <View style={{
        backgroundColor: '#FFF',
        flex: 1,
    }}>
        <StatusBar backgroundColor='#FFFFFF' />
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
          paddingHorizontal: 15,
          paddingLeft: 5,
          gap: 10

}}>

        <TouchableOpacity onPress={() => navigate.goBack()}>
        <Icon name='chevron-back' color='#000' size={25} />
      </TouchableOpacity>
        <Text style={{
            color: 'rgba(0,0,0,0.8)',
            fontWeight: '600',
            fontSize: 20,

        }}>Construyamos tu perfil juntos</Text>
        </View>

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
                }}>{userInfo.name}</Text>

                <Field label='Nombre de la empresa'>
                    <Input onChangeText={(text) => setCompanyName(text)} placeholder='Menciona tu empresa/startup/idea' />
                </Field>
              <Field label='¿En qué estás trabajando?'>
                <Textarea onChangeText={(text) => setCompanyDescription(text)} placeholder='Habla sobre tu idea, producto o vision' />
              </Field>
            </View>

            <Button loading={loading}  disabled={ company_name.length < 3  || company_description.length < 10 } onPress={onSubmit} style={{
                marginTop: 'auto',
                marginBottom: 30
            }} text='Continuar ->' />
        </View>
    </View>
  )
}

export default RecruirProfile