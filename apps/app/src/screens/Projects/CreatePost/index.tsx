import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { CREATE_DISCUSSION } from '../../../graphql/mutations/discussions'
import { useSelector } from 'react-redux'

const CreatePost = ({navigation}: any) => {
    const { user } = useSelector((state: any) => state.auth);

    const [createDiscussion, { loading: isCreating, error: creatingError }] = useMutation(CREATE_DISCUSSION)
    if(creatingError){
      Alert.alert('No se pudo crear la publicacion', creatingError.message);
      return
    }

    const [post, setPost] = useState({
        title: '',
        description: '',
    })

    const onSubmit = async () => {
        await createDiscussion({
            variables: {
                data: {
                    title: post.title,
                    description: post.description,
                }
            },
            context: {
                headers: {
                  authorization: user.token ? `Bearer ${user.token}` : '',
                },
              },
        });
        navigation.navigate('Home')
    }


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
                <TextInput 
                multiline
                onChangeText={(text) => setPost((prev) => ({ ...prev, description: text }))} 
                style={{
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
                }}
                onPress={onSubmit}
                >
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