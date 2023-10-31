import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import Input from '../../../../../components/Shared/Input'
import Button from '../../../../../components/Shared/Button'

const Location = ({navigation, route}: any) => {

    const [location, setLocation] = useState('');
    console.log(route.params)
    return (
        <View style={{
            backgroundColor: '#121212',
            flex: 1,
        }}>
            <View style={{
                paddingHorizontal: 15,
                paddingVertical: 20,
                backgroundColor: '#fff',
                flex: 1,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
            }}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 15
                }}>

                    <Text style={{
                        fontWeight: '600',
                        fontSize: 18,
                        color: 'rgba(0,0,0,0.8)'
                    }}>Ubicacion</Text>
                </View>

                <View style={{
                    gap: 20
                }}>

                    <TouchableOpacity 
                    onPress={() => setLocation('Trabajo Remoto')}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 15,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: location == 'Trabajo Remoto'? '#5368f5' : 'rgba(0,0,0,0.3)',
                        backgroundColor: location == 'Trabajo Remoto'? 'rgba(83, 104, 245, 0.1)' : '#fff',
                        padding: 10
                    }}>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.3)'
                        }} />

                        <View>
                            <Text style={{
                                fontWeight: '600',
                                color: 'rgba(0,0,0,0.8)',
                                fontSize: 18
                            }}>Trabajo remoto</Text>
                            <Text>El empleado puede trabajar remotamente.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setLocation('En oficina')}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: location == 'En oficina'? '#5368f5' : 'rgba(0,0,0,0.3)',
                            backgroundColor: location == 'En oficina'? 'rgba(83, 104, 245, 0.1)' : '#fff',
                            padding: 10
                        }}>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.3)'
                        }} />

                        <View>
                            <Text style={{
                                fontWeight: '600',
                                color: 'rgba(0,0,0,0.8)',
                                fontSize: 18
                            }}>En oficina</Text>
                            <Text>El empelado tiene que ir a la oficina de la empresa.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                       onPress={() => setLocation('Hibrido')}
                       style={{
                           flexDirection: 'row',
                           alignItems: 'center',
                           gap: 15,
                           borderRadius: 10,
                           borderWidth: 1,
                           borderColor: location == 'Hibrido'? '#5368f5' : 'rgba(0,0,0,0.3)',
                           backgroundColor: location == 'Hibrido'? 'rgba(83, 104, 245, 0.1)' : '#fff',
                           padding: 10
                       }}>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.3)'
                        }} />

                        <View>
                            <Text style={{
                                fontWeight: '600',
                                color: 'rgba(0,0,0,0.8)',
                                fontSize: 18
                            }}>Hibrido</Text>
                            <Text>Un mix de trabajo remoto y en oficina.</Text>
                        </View>
                    </TouchableOpacity>
                
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 'auto',
                    gap: 10
                }} >
                    <TouchableOpacity style={{
                        width: '40%',
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.3)',
                        borderRadius: 50,
                        height: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}>
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            fontWeight: '500',
                            fontSize: 14
                        }}>Volver</Text>
                    </TouchableOpacity>

                <Button text='Descripcion ->' onPress={() => navigation.navigate('Description', { remuneration: route.params.remuneration, title: route.params.title, skills: route.params.skills, role: route.params.role, location: { address: location } })}  style={{
                    width: '60%'
                }} />

</View>

            </View>

        </View>
    )
}

export default Location