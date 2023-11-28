import { View as DefaultView, Text } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import Input from '../../../../../components/Shared/Input'
import Button from '../../../../../components/Shared/Button'
import { View } from '../../../../../components/Shared/View'

const Title = ({navigation}: any) => {
    const [title, setTitle] = useState('');
    return (
        <View>
             <Header title='Crear una publicación' step={0}  />
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
                    }}>Agregar título del trabajo</Text>
                    <Text style={{
                        fontWeight: '400',
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.8)'
                    }}>{title.length}/120</Text>
                </DefaultView>

                <Input placeholder='Escribe un título para tu publicación' onChangeText={(text) => setTitle(text)} />

                <Button onPress={() => navigation.navigate('Skills', { title: title })} text='Habilidades ->' style={{
                    marginTop: 'auto'
                }} />
            </DefaultView>

        </View>
    )
}

export default Title