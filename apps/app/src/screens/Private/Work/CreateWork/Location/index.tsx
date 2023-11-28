import { View as DefaultView, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import Input from '../../../../../components/Shared/Input'
import Button from '../../../../../components/Shared/Button'
import { View } from '../../../../../components/Shared/View'

const Location = ({navigation, route}: any) => {

    const [location, setLocation] = useState('');
    console.log(route.params)
    return (
        <View>
                      <Header  title='Crear una publicación' step={3} />

            <DefaultView style={{
                paddingHorizontal: 15,
                paddingVertical: 20,
                backgroundColor: '#fff',
                flex: 1,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
            }}>

                <DefaultView style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 15
                }}>

                    <Text style={{
                        fontWeight: '600',
                        fontSize: 18,
                        color: 'rgba(0,0,0,0.8)'
                    }}>Ubicación</Text>
                </DefaultView>

                <DefaultView style={{
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
                        <DefaultView style={{
                            height: 20,
                            width: 20,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.3)'
                        }} />

                        <DefaultView>
                            <Text style={{
                                fontWeight: '600',
                                color: 'rgba(0,0,0,0.8)',
                                fontSize: 18
                            }}>Trabajo remoto</Text>
                            <Text style={{
                                color: 'rgba(0,0,0,0.8)',
                            }}>El empleado puede trabajar remotamente.</Text>
                        </DefaultView>
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
                        <DefaultView style={{
                            height: 20,
                            width: 20,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.3)'
                        }} />

                        <DefaultView>
                            <Text style={{
                                fontWeight: '600',
                                color: 'rgba(0,0,0,0.8)',
                                fontSize: 18
                            }}>En oficina</Text>
                            <Text style={{
                                color: 'rgba(0,0,0,0.6)',
                            }} >El empelado tiene que ir a la oficina de la empresa.</Text>
                        </DefaultView>
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
                        <DefaultView style={{
                            height: 20,
                            width: 20,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.3)'
                        }} />

                        <DefaultView>
                            <Text style={{
                                fontWeight: '600',
                                color: 'rgba(0,0,0,0.8)',
                                fontSize: 18
                            }}>Híbrido</Text>
                            <Text style={{
                                color: 'rgba(0,0,0,0.8)',
                            }}>Un mix de trabajo remoto y en oficina.</Text>
                        </DefaultView>
                    </TouchableOpacity>
                
                </DefaultView>

                <DefaultView style={{
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
                    }}
                    onPress={() => navigation.goBack()}
                    >
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            fontWeight: '500',
                            fontSize: 14
                        }}>Volver</Text>
                    </TouchableOpacity>

                <Button text='Descripcion ->' onPress={() => navigation.navigate('Description', { remuneration: route.params.remuneration, title: route.params.title, skills: route.params.skills, role: route.params.role, location: { address: location } })}  style={{
                    width: '60%'
                }} />

</DefaultView>

            </DefaultView>

        </View>
    )
}

export default Location