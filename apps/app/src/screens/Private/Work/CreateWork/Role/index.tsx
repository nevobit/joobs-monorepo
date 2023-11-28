import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import Input from '../../../../../components/Shared/Input'
import Button from '../../../../../components/Shared/Button'
import Item from './Item'
import Field from '../../../../../components/Shared/Field'
import Icon from 'react-native-vector-icons/Ionicons'

const Role = ({ navigation, route }: any) => {
    const [type, setType] = useState('');
    const [remuneration, setRemuneration] = useState({
        value: 0,
        frecuency: ''
    });

    console.log(remuneration)
    return (
        <ScrollView style={{
            backgroundColor: '#121212',
        }}>

            <View style={{
                backgroundColor: '#fff',
                paddingHorizontal: 15,
                paddingVertical: 20,
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
                        }}>Tipo de rol</Text>
                    </View>

                    <View style={{
                        gap: 20
                    }}>
                        <Item setType={setType} title="Co-Founder" copy='Un partner que te ayude a contruir desde cero.' type={type} />
                        <Item setType={setType} title="Practicante" copy='Un aprendiz que trabaje para ganar experiencia.' type={type} />
                        <Item setType={setType} title="Freelancer" copy='Un profesional que contratas por proyecto.' type={type} />
                        <Item setType={setType} title="Tiempo completo" copy='Un empleado que dedique de 6 a 12 horas por dia.' type={type} />
                        <Item setType={setType} title="No estoy seguro" copy='No estoy seguro todavía' type={type} />

                    </View>

                    <View style={{
                        marginTop: 20
                    }}>
                        <Text style={{
                            fontWeight: '600',
                            fontSize: 18,
                            color: 'rgba(0,0,0,0.8)'
                        }}>Compensacion</Text>
                        <Field label='Desde'>
                            <Input keyboardType='numeric' placeholder='2500000' onChangeText={(text) => {
                                 const parsedValue = parseInt(text);
                                 if (!isNaN(parsedValue)) {
                                   setRemuneration((prev) => ({ ...prev, value: parsedValue }));
                                 }
                            }} />
                        </Field>
                    </View>

                    <View style={{
                        marginTop: 20
                    }}>
                        <Text style={{
                            fontWeight: '600',
                            fontSize: 18,
                            color: 'rgba(0,0,0,0.8)',
                            marginBottom: 10
                        }}>Frecuencia</Text>
                        <View  style={{
                                gap: 20
                            }}>

                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                        onPress={() => setRemuneration((prev) => ({...prev, frecuency: 'project'}))}
                        >
                            <View>
                                <Text style={{
                                    fontWeight: '500',
                                    color: 'rgba(0,0,0,0.8)',
                                    fontSize: 16
                                }}>Proyecto Basico</Text>
                                <Text style={{
                                    fontWeight: '400',
                                    color: 'rgba(0,0,0,0.6)',
                                    fontSize: 14
                                }}>Pago por proyecto terminado</Text>
                            </View>
                            <View style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.5)',
                                width: 30,
                                height: 30,
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: remuneration.frecuency == 'project'? '#5368f5': 'rgba(255,255,255,1)'
                            }}>
                                
                                <Icon name='checkmark' color={remuneration.frecuency == 'project'? '#fff': 'rgba(0,0,0,.8)'} size={25} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                        onPress={() => setRemuneration((prev) => ({...prev, frecuency: 'monthly'}))}
                        >
                            <View>
                                <Text style={{
                                    fontWeight: '500',
                                    color: 'rgba(0,0,0,0.8)',
                                    fontSize: 16
                                }}>Mensual</Text>
                                <Text style={{
                                    fontWeight: '400',
                                    color: 'rgba(0,0,0,0.6)',
                                    fontSize: 14
                                }}>Pago fijo cada mes</Text>
                            </View>
                            <View style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.5)',
                                width: 30,
                                height: 30,
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: remuneration.frecuency == 'monthly'? '#5368f5': 'rgba(255,255,255,1)'
                            }}>
                                
                                <Icon name='checkmark' color={remuneration.frecuency == 'monthly'? '#fff': 'rgba(0,0,0,.8)'} size={25} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                        onPress={() => setRemuneration((prev) => ({...prev, frecuency: 'equity'}))}
                        >
                            <View>
                                <Text style={{
                                    fontWeight: '500',
                                    color: 'rgba(0,0,0,0.8)',
                                    fontSize: 16
                                }}>Division de Acciones </Text>
                                <Text style={{
                                    fontWeight: '400',
                                    color: 'rgba(0,0,0,0.6)',
                                    fontSize: 14
                                }}>Compartir una parte de tu empresa</Text>
                            </View>
                            <View style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.5)',
                                width: 30,
                                height: 30,
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: remuneration.frecuency == 'equity'? '#5368f5': 'rgba(255,255,255,1)'
                            }}>
                                
                                <Icon name='checkmark' color={remuneration.frecuency == 'equity'? '#fff': 'rgba(0,0,0,.8)'} size={25} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                        onPress={() => setRemuneration((prev) => ({...prev, frecuency: 'yearly'}))}
                        >
                            <View>
                                <Text style={{
                                    fontWeight: '500',
                                    color: 'rgba(0,0,0,0.8)',
                                    fontSize: 16
                                }}>Anual</Text>
                                <Text style={{
                                    fontWeight: '400',
                                    color: 'rgba(0,0,0,0.6)',
                                    fontSize: 14
                                }}>Oferta de salario anual</Text>
                            </View>
                            <View style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.5)',
                                width: 30,
                                height: 30,
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: remuneration.frecuency == 'yearly'? '#5368f5': 'rgba(255,255,255,1)'
                            }}>
                                
                                <Icon name='checkmark' color={remuneration.frecuency == 'yearly'? '#fff': 'rgba(0,0,0,.8)'} size={25} />
                            </View>
                        </TouchableOpacity>
                        </View>

                  
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

                    <Button text='Workspace ->' onPress={() => navigation.navigate('Location', { title: route.params.title, skills: route.params.skills, role: type, remuneration})} style={{
                        width: '60%'
                    }} />

                </View>
            </View>


        </ScrollView>
    )
}

export default Role