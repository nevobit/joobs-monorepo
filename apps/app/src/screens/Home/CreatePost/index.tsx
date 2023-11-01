import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { CREATE_DISCUSSION } from '../../../graphql/mutations/discussions'
import { useSelector } from 'react-redux'
import { useUploadImage } from '../../../hooks'
import { DISCUSSIONS } from '../../../graphql/queries'

const CreatePost = ({navigation}: any) => {
    const { user } = useSelector((state: any) => state.auth);

    const [createDiscussion, { loading: isCreating, error: creatingError }] = useMutation(CREATE_DISCUSSION, {
        refetchQueries: [
            { query: DISCUSSIONS }
        ]
    })
    if(creatingError){
      Alert.alert('No se pudo crear la publicacion', creatingError.message);
      return
    }

    const { photo, isLoading, getPhoto, error } = useUploadImage();

    const [post, setPost] = useState<{
        title: string,
        description: string,
        images: string[]
    }>({
        title: '',
        description: '',
        images: []
    });

    useEffect(() => {
        if(photo.length > 4){
            setPost((prev) => ({ ...prev, images: [photo] }))
        }
    }, [photo])

    const onSubmit = async () => {
        await createDiscussion({
            variables: {
                data: {
                    title: post.title,
                    description: post.description,
                    images: post.images
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

console.log(post.images)
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
                    fontWeight: '600',
                    color: 'rgba(0,0,0,0.8)'
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
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.8)',
                }} placeholder='Descripcion de la discusion (opcional)' placeholderTextColor='rgba(0,0,0,0.4)' />
                <Text style={{
                    color: 'rgba(0,0,0,0.5)',
                    fontWeight: '600',
                    fontSize: 16,
                    marginLeft: 5
                }} >{post.description.length}/1500</Text>
                {isLoading && <ActivityIndicator  color='#000' />}
                {post.images.length > 0 && (
                <View style={{
                    marginTop: 10
                }}>
                    <View style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.1)',
                        width:80,
                        height:80,
                        borderRadius: 5
                    }}>
                    <Image source={{
                        uri: photo
                    }} 
                    style={{
                        width: 80,
                        height: 80,
                        objectFit: 'contain'
                    }}
                    />
                    </View>

                </View>
                )}


                <View style={{
                    marginTop: 'auto'
                }}>
                    <TouchableOpacity 
                    onPress={getPhoto}
                    style={{
                        padding: 5,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(0,0,0,0.1)',
                        borderTopColor: 'rgba(0,0,0,0.1)',
                        marginBottom: 10
                    }}>
                        <Icon name='image' size={30} color='rgba(0,0,0,0.8)' />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                    backgroundColor: '#5169f6',
                    borderRadius: 50,
                    height: 45,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={onSubmit}
                >
                    {isCreating? <ActivityIndicator /> : 
                    <Text style={{
                        color: '#fff',
                        fontSize: 16.
                    }}>Siguiente</Text>
                }
                </TouchableOpacity>
                </View>
               
            </View>
        </>

    )
}

export default CreatePost