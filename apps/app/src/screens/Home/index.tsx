import React from 'react'
import { Image, Text, View } from 'react-native'
import Input from '../../components/Shared/Input'
import Field from '../../components/Shared/Field'
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/Ionicons'

const Home = () => {
    Geolocation.getCurrentPosition(info => console.log(info));

  return (
    <View style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        height: '100%'
    }}>
        <Text style={{
            fontSize: 22,
            color: '#000',
            fontWeight: '600',
        }}>¿Adónde te diriges?</Text>
        <Field >
            <Input placeholder='Ingresa la direccion' />
        </Field>

        <View style={{
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10
        }}>
            <View style={{
                 flexDirection: 'row',
                 alignItems: 'center',
                 justifyContent: 'space-between',
                 gap: 10
            }}>

            <Icon name='home-sharp' size={24} color="#aaa" />
            
            <View>
                <Text style={{
                    fontWeight: '600',
                    color: 'rgba(0,0,0,0.8)',
                    fontSize: 16
                }}>Casa</Text>
                <Text  style={{
                    fontWeight: '500',
                    color: 'rgba(0,0,0,0.6)',
                    fontSize: 14
                }}>Medellin - Antiqouia</Text>
            </View>
            </View>

            <Icon name='arrow-forward' size={20} color="#333" />
        </View>

        <View style={{
            flexDirection: 'row',
            marginTop: 30,
            gap: 10,
            justifyContent: 'center'
        }}>
            <View style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                width: 110,
                height: 130,
                borderRadius: 10,
                paddingVertical: 10
            }}>
                <Image style={{
                    width: 130,
                    height: 80,
                    objectFit: 'contain'
                }} source={{
                    uri: 'https://i.ibb.co/fHKVcgN/93c105244c0a3de81267a89cb13386f7.png'
                }} />
                <Text style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.8)'
                }}>Viaje</Text>
            </View>
            <View style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                width: 110,
                height: 130,
                borderRadius: 10,
                paddingVertical: 10
            }}>
                <Image style={{
                    width: 130,
                    height: 80,
                    objectFit: 'contain'
                }} source={{
                    uri: 'https://i.ibb.co/fHKVcgN/93c105244c0a3de81267a89cb13386f7.png'
                }} />
                <Text style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.8)'
                }}>Mensajeria</Text>
            </View>
            <View style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                width: 110,
                height: 130,
                borderRadius: 10,
                paddingVertical: 10
            }}>
                <Image style={{
                    width: 130,
                    height: 80,
                    objectFit: 'contain'
                }} source={{
                    uri: 'https://i.ibb.co/fHKVcgN/93c105244c0a3de81267a89cb13386f7.png'
                }} />
                <Text style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.8)'
                }}>Rentar</Text>
            </View>
        </View>

        <Text style={{
            marginTop: 30,
            fontWeight: '600',
            color: 'rgba(0,0,0,0.8)',
            fontSize: 18
        }}>Viajes Recientes</Text>
        <View style={{
            marginTop: 15,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 10
        }}>
            <View style={{
                 flexDirection: 'row',
                 alignItems: 'center',
                 justifyContent: 'space-between',
                 gap: 10
            }}>
            
            <View style={{
                backgroundColor: 'rgba(0,0,0,0.15)',
                borderRadius: 10
            }}>
                <Image 
                style={{
                    width: 70,
                    height: 70,
                    objectFit: 'cover'
                }}
                source={{
                    uri: 'https://i.ibb.co/QHJJTBX/Black-1.webp'
                }} />
            </View>
            
            <View>
                <Text style={{
                    fontWeight: '600',
                    color: 'rgba(0,0,0,0.8)',
                    fontSize: 16
                }}>Centro Comercial Monterrey</Text>
                <Text  style={{
                    fontWeight: '500',
                    color: 'rgba(0,0,0,0.6)',
                    fontSize: 14
                }}>Viaje completado</Text>
            </View>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%'
            }}>
                <Text style={{
                    fontWeight: '500',
                    color: '#333'
                }} >5.8km</Text>
                <Text style={{
                    fontWeight: '500',
                    color: '#333'
                }} >$8.900</Text>
                <Text style={{
                    fontWeight: '500',
                    color: '#333'
                }} >12 Jun, 03:58 PM</Text>
            </View>

        </View>
    </View>
  )
}

export default Home