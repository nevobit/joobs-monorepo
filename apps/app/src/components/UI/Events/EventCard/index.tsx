import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    image: string;
}
const EventCard = ({ image }: Props) => {
    return (
        <View style={{
            borderRadius: 15,
            overflow: 'hidden',
            height: 380,
            backgroundColor: '#000',
        }}>
            <View style={{
                paddingHorizontal: 20,
                marginTop: 15
            }}>

            <Image source={{
                uri: image
            }}
                style={{
                    width: '100%',
                    // objectFit: 'contain',
                    height: 150
                }}
            />
            </View>


            <View style={{
                padding: 15
            }}>

                <View style={{
                    padding: 10,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                }}>

                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 10,
                            marginTop: 3,
                            marginBottom: 5

                        }}>
                            <Text style={{
                                backgroundColor: '#fff7e3',
                                padding: 5,
                                paddingHorizontal: 10,
                                borderRadius: 50,
                                fontSize: 12,
                                color: 'rgba(0,0,0,0.8)'
                            }}>
                                Jueves, Oct 17 @ 10:30 AM
                            </Text>
                            <View style={{
                                backgroundColor: '#c1c6fb70',
                                padding: 5,
                                paddingHorizontal: 10,
                                borderRadius: 50,
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5
                            }}>
                                <Icon name='person-outline' style={{
                                    color: 'rgba(0,0,0,0.8)'
                                }} />
                                <Text style={{
                                    fontSize: 12,
                                    color: 'rgba(0,0,0,0.8)'
                                }}>
                                    260
                                </Text>
                            </View>


                        </View>
                        <Text style={{
                            fontWeight: '500',
                            fontSize: 16,
                            color: 'rgba(0,0,0,0.8)'
                        }}>Tech Show!</Text>
                        <View style={{
                            marginTop: 10,
                            marginBottom: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10
                        }}>
                            <View style={{
                                backgroundColor: '#5169f6',
                                height: 35, 
                                width: 35,
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontWeight: '600',
                                    fontSize: 16
                                }}>JB</Text>
                            </View>
                            <View>
                                <Text style={{
                                    color: 'rgba(0,0,0,0.8)',
                                    fontSize: 14,
                                    fontWeight: '500'
                                }}>Joobs Events</Text>
                                <Text style={{
                                    color: 'rgba(0,0,0,0.5)',
                                    fontSize: 14,
                                }} >for the community, from the community</Text>
                            </View>

                        </View>
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: '#5169f6',
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 'auto'
                    }}>
                        <Text style={{
                            color: '#fff',
                            textAlign: "center"
                        }}>Registrarme ahora</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default EventCard