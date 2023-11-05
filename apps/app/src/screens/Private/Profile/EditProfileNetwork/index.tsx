import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, ActivityIndicator, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Field from '../../../../components/Shared/Field'
import Input from '../../../../components/Shared/Input'
import Textarea from '../../../../components/Shared/Textarea'
import { useUpdateUser, useUploadImage, useUser } from '../../../../hooks'
import Button from '../../../../components/Shared/Button'

const EditProfileNetwork = ({ navigation }: any) => {
    const { isLoading, user, refetch } = useUser();
    const [userInfo, setUserInfo] = useState({
        instagram: user.instagram,
        twitter: user.twitter,
        facebook: user.facebook,
        linkedin: user.linkedin,
        icebreaker: user.icebreaker || []
    });
  
    const { updateUser, isUpdating } = useUpdateUser();

    const handleAddIcebreaker = () => {
        setUserInfo({ ...userInfo, icebreaker: [...userInfo.icebreaker, ''] });
    };
      
    const handleIcebreakerChange = (index:any, text:any) => {
        const updatedIcebreakers = [...userInfo.icebreaker];
        updatedIcebreakers[index] = text;
        setUserInfo({ ...userInfo, icebreaker: updatedIcebreakers });
      };
      const handleRemoveIcebreaker = (index: any) => {
        const updatedIcebreakers = userInfo.icebreaker.filter((_:any, i:any) => i !== index);
        setUserInfo({ ...userInfo, icebreaker: updatedIcebreakers });
      };
      
    const submit = async () => {
        try{
            await updateUser({variables: {
                data: { ...userInfo }
            }});

            navigation.navigate('Profile')
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        refetch()
    }, [])

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
                }}>
            </View>
            <Text style={{
                fontSize: 16,
                color: 'rgba(0,0,0,0.8)',
                fontWeight: '600'
            }}>Mis enlaces</Text>
            <Text style={{
                color: 'rgba(0,0,0,0.6)',
                fontSize: 14,
                fontWeight: '400'
            }}>Para que las personas puedan conocerte mejor</Text>

<View style={{
        marginTop: 20
    }}
    >   
        <Text style={{
            fontSize: 15,
            color: 'rgba(0,0,0,0.7)',
            marginBottom: 5,
            fontWeight: '500'
        }}>Agrega nombre de usuario</Text>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15
        }}>
        <Icon name='logo-instagram' color='#E1306C' size={28} />
                    <Input style={{
                        width: '85%'
                    }} placeholder='Ej: curious_harish' onChangeText={(text) => setUserInfo((prev) => ({...prev, instagram: text}))} />
        </View>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginTop: 15
        }}>
        <Icon name='logo-twitter' color='#1DA1F2' size={28} />
                    <Input style={{
                        width: '85%'
                    }} placeholder='Ej: curiousharish' onChangeText={(text) => setUserInfo((prev) => ({...prev, twitter: text}))} />
        </View>
    </View>

    <View style={{
        marginTop: 20
    }}
    >   
        <Text style={{
            fontSize: 15,
            color: 'rgba(0,0,0,0.7)',
            marginBottom: 5,
            fontWeight: '500'
        }}>Agrega link del perfil</Text>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15
        }}>
        <Icon name='logo-facebook' color='#3b5998' size={28} />
                    <Input style={{
                        width: '85%',
                    }} placeholder='Ej: https://www.facebook.com/curios' onChangeText={(text) => setUserInfo((prev) => ({...prev, facebook: text}))} />
        </View>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginTop: 15
        }}>
        <Icon name='logo-linkedin' color='#0A66C2' size={28} />
                    <Input style={{
                        width: '85%'
                    }} placeholder='Ej: https://www.linkedin.com/curios' onChangeText={(text) => setUserInfo((prev) => ({...prev, linkedin: text}))} />
        </View>
    </View>

                <Field label='Rompehielos' style={{

                }}>
               {userInfo?.icebreaker.map((icebreaker:any, index:any) => (
    <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 15, marginTop: 15 }}>
      <Icon name='remove-circle' style={{
        marginTop: 5
      }} size={28} onPress={() => handleRemoveIcebreaker(index)} />
      <Textarea
        placeholder='Soy bueno en | Actualmente haciendo...'
        value={icebreaker}
        onChangeText={(text) => handleIcebreakerChange(index, text)}
        style={{ height: 100, textAlignVertical: 'top', width: '85%' }}
      />
    </View>
  ))}
  <TouchableOpacity onPress={handleAddIcebreaker}>
    <Text style={{ color: '#5368f5', marginTop: 10 }}>Agregar Frase Rompehielo</Text>
  </TouchableOpacity>
                </Field>
            </ScrollView>
            <View style={{
                marginTop: 'auto',
                marginBottom: 20,
                paddingHorizontal: 15
            }}>
                <Button loading={isUpdating} onPress={submit} text='Guardar' />
            </View>

        </SafeAreaView>
    )
}


    
export default EditProfileNetwork