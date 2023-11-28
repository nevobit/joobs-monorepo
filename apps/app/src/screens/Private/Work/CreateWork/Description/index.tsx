import { View as DefaultView, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Button from '../../../../../components/Shared/Button'
import Textarea from '../../../../../components/Shared/Textarea'
import Header from '../Header'
import { View } from '../../../../../components/Shared/View'

const Description = ({navigation, route}: any) => {
    const [description, setDescription] = useState('');
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
                    }}>Descripcion</Text>
                </DefaultView>

                <DefaultView style={{
                    gap: 20
                }}>
                    <Textarea 
                    onChangeText={(text) => setDescription(text)}
                    placeholder='Manualmente puedes escribir la descripcion aqui'
                    />

                
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

                <Button text='Revisar ->' onPress={() => navigation.navigate('Review', { remuneration: route.params.remuneration, title: route.params.title, skills: route.params.skills, role: route.params.role, location: { address: route.params.location.address }, description: description })}  style={{
                    width: '60%'
                }} />

</DefaultView>

            </DefaultView>

        </View>
    )
}

export default Description