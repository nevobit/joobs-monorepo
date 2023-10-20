import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import Input from '../../../../../components/Shared/Input'
import Button from '../../../../../components/Shared/Button'

const Title = ({navigation}: any) => {
    const [title, setTitle] = useState('');
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
                    }}>Agregar titulo del trabajo</Text>
                    <Text style={{
                        fontWeight: '400',
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.8)'
                    }}>0/120</Text>
                </View>

                <Input placeholder='Escribe un titulo para tu publicacion' onChangeText={(text) => setTitle(text)} />

                <Button onPress={() => navigation.navigate('Skills', { title: title })} text='Habilidades ->' style={{
                    marginTop: 'auto'
                }} />
            </View>

        </View>
    )
}

export default Title