import { View as DefaultView, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Field from '../../../../components/Shared/Field'
import Input from '../../../../components/Shared/Input'
import Textarea from '../../../../components/Shared/Textarea'
import { useUpdateUser, useUploadImage, useUser } from '../../../../hooks'
import Button from '../../../../components/Shared/Button'
import { View } from '../../../../components/Shared/View'

const EditProfileEducation = ({ navigation }: any) => {
    const { isLoading, user, refetch } = useUser();
    const [userInfo, setUserInfo] = useState({
        college: user?.college,
        graduation_year: user?.graduation_year,
    });
    const startYear = 1980;
    const endYear = 2030;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
  
    const { updateUser, isUpdating } = useUpdateUser();

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
        <View >

            <DefaultView style={{
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

            </DefaultView>
            <DefaultView style={{
                height: 10,
                backgroundColor: '#121212'
            }} />
            <ScrollView contentContainerStyle={{
                padding: 15,
                backgroundColor: "#f0f0f0"
            }} style={{
                backgroundColor: "#f0f0f0"
            }} >
                <DefaultView style={{
                    alignItems: 'center',
                }}>
            </DefaultView>
            <Text style={{
                fontSize: 16,
                color: 'rgba(0,0,0,0.8)',
                fontWeight: '600'
            }}>Educación</Text>
                <Field label='Estudie en'>
                    <Input placeholder='' onChangeText={(text) => setUserInfo((prev) => ({...prev, college: text}))} />
                </Field>
                <Field label='Año de graduación'>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                            gap: 10
                        }}>
                            {years.map((year) => (
                                <TouchableOpacity key={year} onPress={() => setUserInfo((prev) => ({...prev, graduation_year: year.toString()}))} style={{
                                backgroundColor: userInfo.graduation_year == String(year)? '#5368f5' : 'rgba(0,0,0,0.1)',
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 5
                            }}>
                                <Text style={{
                                    fontSize:14,
                                    fontWeight: '500',
                                    color: userInfo.graduation_year == String(year) ? "#fff" :  'rgba(0,0,0,0.8)'
                                }}>{year}</Text>
                            </TouchableOpacity>
                            ))}
                        </ScrollView> 
                </Field>
            </ScrollView>
            <DefaultView style={{
                marginTop: 'auto',
                marginBottom: 20,
                paddingHorizontal: 15,
                backgroundColor: "#f0f0f0",
                position: "absolute",
                bottom: -20,
                paddingBottom: 30,
                width: "100%"
            }}>
                <Button loading={isUpdating} onPress={submit} text='Guardar' />
            </DefaultView>

        </View>
    )
}

export default EditProfileEducation