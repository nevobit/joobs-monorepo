import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import Input from '../../../../../components/Shared/Input'
import Button from '../../../../../components/Shared/Button'
import Item from './Item'

const Role = ({navigation, route}: any) => {
    const [type, setType] = useState('');

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

                <Button text='Workspace ->' onPress={() => navigation.navigate('Location', { title: route.params.title, skills: route.params.skills, role: type })}   style={{
                    width: '60%'
                }} />

</View>

            </View>

        </View>
    )
}

export default Role