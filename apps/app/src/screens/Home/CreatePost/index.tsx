import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const CreatePost = ({navigation}: any) => {

    const [post, setPost] = useState({
        title: '',
        description: '',
    })


    return (
        <>
            <View style={{
                backgroundColor: '#121212',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 14,
                paddingVertical: 10
            }}>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 10
                }} >

                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icon name='close' size={25} color='#fff' />
                    </TouchableOpacity>
                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '600',
                        marginBottom: 3
                    }}>Empezar una discusion</Text>
                </View>
                <TouchableOpacity>
                    <Icon size={25} color='rgba(255,255, 255, .6)' name='information-circle' />
                </TouchableOpacity>
            </View>
            <View style={{
                paddingVertical: 5,
                paddingHorizontal: 15,
                flex: 1,
                paddingBottom: 25
            }}>
                <TextInput placeholderTextColor='rgba(0,0,0,0.5)' style={{
                    fontSize: 16,
                    fontWeight: '600'
                }}
                    multiline
                    placeholder='Dale un titulo a tu discusion' onChangeText={(text) => setPost((prev) => ({ ...prev, title: text }))} />
                <Text style={{
                    color: 'rgba(0,0,0,0.5)',
                    fontWeight: '600',
                    fontSize: 16,
                    marginLeft: 5
                }} >{post.title.length}/160</Text>
                <TextInput style={{
                    fontSize: 14
                }} placeholder='Descripcion de la discusion (opcional)' />
                <Text style={{
                    color: 'rgba(0,0,0,0.5)',
                    fontWeight: '600',
                    fontSize: 16,
                    marginLeft: 5
                }} >{post.description.length}/1500</Text>

                <TouchableOpacity style={{
                    backgroundColor: '#5169f6',
                    borderRadius: 50,
                    height: 45,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 'auto'
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 16.
                    }}>Siguiente</Text>
                </TouchableOpacity>
            </View>
        </>

    )
}

export default CreatePost