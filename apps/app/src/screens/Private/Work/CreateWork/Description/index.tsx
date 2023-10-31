import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import Input from '../../../../../components/Shared/Input'
import Button from '../../../../../components/Shared/Button'
import Textarea from '../../../../../components/Shared/Textarea'

const Description = ({navigation, route}: any) => {
    const [description, setDescription] = useState('');
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
                    }}>Descripcion</Text>
                </View>

                <View style={{
                    gap: 20
                }}>
                    <Textarea 
                    onChangeText={(text) => setDescription(text)}
                    placeholder='Manualmente puedes escribir la descripcion aqui'
                    />

                
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

                <Button text='Revisar ->' onPress={() => navigation.navigate('Review', { remuneration: route.params.remuneration, title: route.params.title, skills: route.params.skills, role: route.params.role, location: { address: route.params.location.address }, description: description })}  style={{
                    width: '60%'
                }} />

</View>

            </View>

        </View>
    )
}

export default Description