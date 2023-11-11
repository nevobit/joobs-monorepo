import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Field from '../../../components/Shared/Field'
import Input from '../../../components/Shared/Input'
import Button from '../../../components/Shared/Button'
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserInfo } from '../../../store/features/auth'

const LcationInformation = ({ navigation, params }: any) => {
    const [location, setLocation] = useState({latitude: 0, longitude: 0});
    const [input, setInput] = useState('Carrera 81 45 168');
    const { userInfo } = useSelector((state: any) => state.auth);

    Geolocation.getCurrentPosition(info => setLocation({ longitude: info.coords.longitude, latitude: info.coords.latitude }));

    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(saveUserInfo({ location }));
        navigation.navigate('WhyInformation')
    }

    // const getLocation = async () => {
    //     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&sensor=true&key=AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg`

    //     const { data } = await axios.get(url);
    //     console.log("LOCATION", data)
    // }


    // useEffect(() => {
    //     getLocation()
    // }, [])


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
            }}>Impresionante 🚀</Text>
            <Text style={{
                color: '#fff',
                fontWeight: '600',
                fontSize: 18,
                marginTop: 5,
                paddingHorizontal: 15

            }}>¡Preparemos tu perfil!</Text>

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
                    {userInfo.photo ? (
                            <Image 
                            style={{
                              height:'100%',
                              width:'100%',
                              resizeMode: 'contain',
                              borderRadius: 50
                            }}
                            source={{
                              uri: userInfo.photo
                            }} />
                    ): (
                        <Text style={{
                            fontSize: 55,
                            fontWeight: '400',
                            color: '#fff'
                        }}>{userInfo.name?.charAt(0).toUpperCase()}</Text>
                    )}

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


         
                    <Field label='¿Donde vives?'>

<Text style={{
                        fontWeight: '400',
                        color: 'rgba(0,0,0,0.5)',
                        fontSize: 14
                    }}>Pronto podrás cambiar tu ubicación, de momento nosotros la seleccionaremos de forma automática</Text>
                    {/* <Input placeholder='Buscar' /> */}
                    </Field> 
                </View>

                <Button onPress={onSubmit} style={{
                    marginTop: 'auto',
                    marginBottom: 30
                }} text='Continuar ->' />
            </View>
        </View>
    )
}

export default LcationInformation