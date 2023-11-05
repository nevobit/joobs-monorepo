import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Field from '../../../../components/Shared/Field'
import Input from '../../../../components/Shared/Input'
import Textarea from '../../../../components/Shared/Textarea'
import { useUpdateUser, useUploadImage, useUser } from '../../../../hooks'
import Button from '../../../../components/Shared/Button'
import styles from './styles'

const EditProfile = ({ navigation }: any) => {
    const { isLoading, user, refetch } = useUser();
    const { photo, isLoading: isLoadingPhoto, error, getPhoto } = useUploadImage();
    const [userInfo, setUserInfo] = useState({
        photo: photo,
        name: user?.name,
        headline: user?.headline,
        company_name: user?.company_name,
        about: user?.about,
    });

    const { updateUser, isUpdating } = useUpdateUser();
    let showPhoto = photo?.length > 5 ? photo : user?.photo?.length > 5 ? user?.photo : ""

    const submit = async () => {
        try {
            await updateUser({
                variables: {
                    data: { ...userInfo, photo: photo }
                }
            });

            navigation.navigate('Profile')
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        refetch()
    }, []);

    useEffect(() => {
        showPhoto = photo;
    }, [photo])
    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: '#fff'
        }}>

            <View style={{
                backgroundColor: '#121212',
                height: 30,
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={25} color='#fff' />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    color: '#fff',
                }}>Editar perfil</Text>

            </View>
            <View style={{
                height: 10,
                backgroundColor: '#121212'
            }} />
            <ScrollView contentContainerStyle={{
                padding: 15,
            }}>
                <View style={{
                    alignItems: 'center',
                    marginTop: 20
                }}>

                    <TouchableOpacity
                        onPress={getPhoto}
                        style={{
                            backgroundColor: photo?.length > 5 || user?.photo?.length > 5 ? '#fff' : 'orange',
                            height: 100,
                            width: 100,
                            borderRadius: 100,
                            zIndex: 999,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>

                        {showPhoto.length > 5 ? (
                            <Image
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    resizeMode: 'cover',
                                    borderRadius: 50
                                }}
                                source={{
                                    uri: showPhoto
                                }} />
                        ) :
                            (
                                <>
                                    {isLoadingPhoto ? <ActivityIndicator /> : (

                                        <Text style={{
                                            fontSize: 55,
                                            fontWeight: '400',
                                            color: '#fff'
                                        }}>{user?.name?.charAt(0).toUpperCase()}</Text>
                                    )}

                                </>

                            )}

                        <View style={styles.camera}>
                            <Icon name='camera' color='rgba(0,0,0,0.8)' size={18} />
                        </View>
                    </TouchableOpacity>
                </View>

                <Field label='Nombre completo'>
                    <Input placeholder=''  value={userInfo.name} onChangeText={(text) => setUserInfo((prev) => ({ ...prev, name: text }))} />
                </Field>
                <Field label='Presentacion'>
                    <Text style={{
                        color: 'rgba(0,0,0,0.5)',
                        marginBottom: 5
                    }}>Usa este espacio para describirte en una linea</Text>
                    <Textarea placeholder='' value={userInfo.headline} onChangeText={(text) => setUserInfo((prev) => ({ ...prev, headline: text }))} />
                </Field>
                <Field label='Nombre de tu Empresa'>
                    <Input placeholder='' value={userInfo.company_name} onChangeText={(text) => setUserInfo((prev) => ({ ...prev, company_name: text }))} />
                </Field>
                <Field label='Sobre mi'>
                    <Text style={{
                        color: 'rgba(0,0,0,0.5)',
                        marginBottom: 5
                    }}>Hable sobre tus intereses, metas, logos y cualquier otra cosa!</Text>
                    <Textarea placeholder='' value={userInfo.about} onChangeText={(text) => setUserInfo((prev) => ({ ...prev, about: text }))} />
                </Field>
            </ScrollView>
            <View style={{
                marginTop: 'auto',
                marginBottom: 20,
                paddingHorizontal: 15
            }}>
                <Button loading={isUpdating} text='Guardar' onPress={submit} />
            </View>
        </SafeAreaView>
    )
}

export default EditProfile