import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import Input from '../../../../../components/Shared/Input'
import Button from '../../../../../components/Shared/Button'
import Textarea from '../../../../../components/Shared/Textarea'
import { useMutation } from '@apollo/client'
import { CREATE_WORK } from '../../../../../graphql/mutations/works'

const Review = ({navigation, route}: any) => {
    const [createWork, { loading: creatingLoading, error: creatingError }] = useMutation(CREATE_WORK)
    if(creatingError){
      Alert.alert('No se pudo crear la publicacion', creatingError.message);
      return
    }


    const onSubmit = async () => {
        await createWork({
            variables: {
              data: {
                description: route.params.description,
                role: route.params.role,
                title: route.params.title,
                user: "445g434f3-3f34g3-g45g45-g4g45g4g45",
                skills: [
                  route.params.skills,
                ],
                location: { address: route.params.location.address },
                status: "active" 
              }
            }
          })
          navigation.navigate('Work')
    }
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
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 15
                }}>

                    <Text style={{
                        fontWeight: '600',
                        fontSize: 18,
                        color: 'rgba(0,0,0,0.8)'
                    }}>Revisa tu publicacion</Text>
                         <Text style={{
                        fontWeight: '400',
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.8)'
                    }}>Asi es como tu post aparecera a los candidatos</Text>
                </View>

                <ScrollView contentContainerStyle={{
                    gap: 20,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    // height: 50,
                    borderRadius: 10,
                    padding: 15
                }}>
                    
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View>

                        </View>
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            backgroundColor: '#c1c6fb70',
                            borderRadius: 30,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            fontSize: 12
                        }}>{route.params.role}</Text>
                    </View>
                    <Text style={{
                        fontWeight: '600',
                        fontSize: 18,
                        color: 'rgba(0,0,0,0.8)'
                    }}>{route.params.title}</Text>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            backgroundColor: 'rgba(255,255,255,.6)',
                            borderRadius: 20,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            fontSize: 12,
                            fontWeight: '500'
                        }}>{route.params.skills}</Text>
                    </View>
                    <View style={{
                        width:'100%',
                        height: 3,
                        backgroundColor: 'rgba(255,255,255,.5)',
                        borderRadius: 10
                    }} />

                    <Text>{route.params.description}</Text>
                </ScrollView>

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

                <Button text='Enviar'  onPress={onSubmit}  style={{
                    width: '60%'
                }} loading={creatingLoading} />

</View>

            </View>

        </View>
    )
}

export default Review