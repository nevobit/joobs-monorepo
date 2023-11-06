import { View, Text, StatusBar, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Field from '../../../components/Shared/Field'
import Input from '../../../components/Shared/Input'
import Button from '../../../components/Shared/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { useUploadImage } from '../../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserInfo } from '../../../store/features/auth'

const BasicInformation = ({navigation, route}: any) => {
    const { userInfo } = useSelector((state: any) => state.auth);
    const { photo, isLoading, error, getPhoto } = useUploadImage(); 
    const [name, setName] = useState(userInfo?.name);
    const [phone, setPhone] = useState('');


    let showPhoto = photo?.length > 5? photo : userInfo?.photo.length > 5 ? userInfo?.photo : ""

    useEffect(() => {
        showPhoto = photo; 
    }, [photo])
    console.log({showPhoto})

    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(saveUserInfo({ name, phone, photo: showPhoto}));
        navigation.navigate('PersonInformation', { name, phone })
    }

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

            <TouchableOpacity 
            onPress={getPhoto}
            style={{
                backgroundColor: photo?.length > 5 || userInfo?.photo.length > 5 ? '#fff' : 'orange',
                height: 100,
                width: 100,
                borderRadius: 100,
                position:'absolute',
                top: -50,
                left: '50%',
                transform: [{ translateX: -40 }],
                zIndex: 999,
                alignItems: 'center',
                justifyContent: 'center',
            }}>

            {showPhoto.length > 5 ? (
                <Image 
                style={{
                  height:'100%',
                  width:'100%',
                  resizeMode: 'cover',
                  borderRadius: 50
                }}
                source={{
                  uri: showPhoto 
                }} />
               ):
            (
                <>
                {isLoading? <ActivityIndicator /> : (

                <Text style={{
                    fontSize: 55,
                    fontWeight: '400',
                    color: '#fff'
                }}>{userInfo.email?.charAt(0).toUpperCase()}</Text>
                )}

                </>

            )}
                
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
                    <Icon name='camera' color='rgba(0,0,0,0.8)' size={18} />
                </View>
            </TouchableOpacity>
            <View style={{
                marginTop: 50
            }}>

            <Field label='Cual es tu nombre completo?'>
                <Input placeholder='Jose Pelaez' value={name} onChangeText={(text) => setName(text)} />
            </Field>
            <Field label='Cual es tu numero de telefono?'>
                <Input placeholder='Ej. 3214554555' onChangeText={(text) => setPhone(text)} />
            </Field>
            </View>

            <Button 
            onPress={onSubmit}
            style={{
                marginTop: 'auto',
                marginBottom: 30
            }} text='Continuar ->' />
        </View>
    </View>
  )
}

export default BasicInformation