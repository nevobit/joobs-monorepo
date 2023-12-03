import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, View as DefaultView } from 'react-native'
import { WORK, WORKS } from '../../../../graphql/queries';
import { DivisaFormater, fromNow } from '../../../../utils';
import translateToSpanish from '../../../../utils/frecuency-formater';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../../../components/Shared/Button';
import { APPLY } from '../../../../graphql/mutations/applications';
import { useUser } from '../../../../hooks/users/useUser';
import { BottomSheet } from '../../../../containers';
import Field from '../../../../components/Shared/Field';
import Input from '../../../../components/Shared/Input';
import share from '../../../../utils/share';
import { View } from '../../../../components/Shared/View';

const WorkDetails = ({ navigation, route }: any) => {
    const [proof, setProof] = useState('');
    const [modal, setModal] = useState(false);

    const { data, loading, error, refetch } = useQuery(WORK, {
        variables: {
            workId: route.params.id
        }
    });

    const [createApplication, { loading: creatingLoading, error: creatingError }] = useMutation(APPLY, {
        refetchQueries: [
            { query: WORKS }
        ]
    })
    const { isLoading, user } = useUser();

    const onSubmit = async () => {
        await createApplication({
            variables: {
                data: {
                    workId: route.params.id,
                    userId: user.id,
                    proof_of_work: proof
                }
            }
        })
        navigation.navigate('Work', { screen: 'Aplicaciones' })
    }



    useEffect(() => {
        refetch();
    }, [refetch]);


    if (creatingError) {
        Alert.alert('No puedes aplicar', "No puedes aplicar a está oferta porque ya lo hiciste, revisa tus aplicaciones");
        setModal(false);
        navigation.navigate('Work', { screen: 'Aplicaciones' })
    }

    return (
        <View>
            <DefaultView style={{
                // height: 80,
                backgroundColor: '#121212',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingBottom: 30,
                paddingTop: 5,
                zIndex:-1
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 7
                }}>
                    <Icon name='chevron-back-outline' size={24} color='#fff' />
                </TouchableOpacity>
                <Pressable onPress={() => share(data?.work?.title)} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 7
                }}>
                    <Icon name='share-social-outline' size={24} color='#fff' />
                </Pressable>
            </DefaultView>
            {loading ? <ActivityIndicator size='large' color='#121212' style={{
                marginTop: 20
            }} /> : (

                <ScrollView  style={{
                    zIndex: 999,
                    marginTop: -20,
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20,

                }}
                    contentContainerStyle={{
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20,
                    // flex: 1,
                    minHeight: '100%',
                    backgroundColor: '#fff',
                    zIndex: 99
                }}>

                    <DefaultView style={{
                        borderTopEndRadius: 20,
                        borderTopStartRadius: 20,
                        marginTop: -20,
                        paddingTop: 30,
                        padding: 15,
                        zIndex: 999,
                        flex: 1
                    }}>
                        <DefaultView style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: 10,
                            alignItems: 'flex-start',
                            marginTop: 5
                        }}>
                            <DefaultView style={{
                                flexDirection: 'row',
                                gap: 8
                            }}>
   {data?.work?.user?.photo ? (
                                        <DefaultView style={{
                                            backgroundColor: '#d5bffd',
                                            height: 30,
                                            width: 30,
                                            borderRadius: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden'
                                        }}>
                                            <Image source={{
                                                uri: user?.photo
                                            }} style={{
                                                width: 30,
                                                height: 30,
                                                objectFit: 'cover'

                                            }} />
                                        </DefaultView>
                                    ) : (

                                        <DefaultView style={{
                                            backgroundColor: '#d5bffd',
                                            height: 30,
                                            width: 30,
                                            borderRadius: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                fontWeight: '600',
                                                fontSize: 16,
                                                color: 'rgba(0,0,0,0.8)'
                                            }}>{data?.work?.user?.company_name?.charAt(0)}</Text>
                                        </DefaultView>
                                    )}
                                <DefaultView style={{
                                }}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: 'rgba(0,0,0,0.8)'
                                        }}>{data?.work?.user?.company_name}</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            color: 'rgba(0,0,0,0.8)'
                                        }}>{fromNow(data?.work?.created_at)}</Text>
                                  

                                </DefaultView>
                            </DefaultView>
                            <DefaultView >

                            </DefaultView>
                        </DefaultView>

                        <DefaultView style={{
                            flex: 1
                        }}>

                            <Text style={{
                                color: '#111',
                                fontWeight: '600',
                                fontSize: 18,
                                marginTop: 10
                            }}>{data?.work?.title}</Text>
                            <DefaultView style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10,
                                gap: 10
                            }}>
                                <Icon name='cash-outline' size={20} color='rgba(0,0,0,0.8)' />

                                <Text style={{
                                    color: 'rgba(0,0,0,0.8)',
                                    fontWeight: '500',
                                    fontSize: 14
                                }}>{DivisaFormater({ value: data?.work?.remuneration?.value })} / {translateToSpanish(data?.work?.remuneration?.frecuency)}</Text>
                            </DefaultView>


                            <DefaultView style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: 8,
                                marginTop: 15,
                                borderBottomColor: 'rgba(0,0,0,0.1)',
                                borderBottomWidth: 1,
                                paddingBottom: 15
                            }}>
                                {data?.work?.skills?.map((skill: string) => (
                                    <Text key={skill} style={{
                                        backgroundColor: 'rgba(0,0,0, .05)',
                                        borderRadius: 20,
                                        paddingHorizontal: 10,
                                        paddingVertical: 4,
                                        fontSize: 12,
                                        color: 'rgba(0,0,0,0.8)',
                                        fontWeight: '500'
                                    }}>{skill}</Text>
                                ))}

                            </DefaultView>
                            <DefaultView style={{
                                marginTop: 10
                            }}>
                                <Text style={{
                                    color: 'rgba(0,0,0,0.8)',
                                    fontSize: 14
                                }}>{data?.work?.description}</Text>
                            </DefaultView>

                            <DefaultView style={{
                                marginTop: 'auto',
                                marginBottom: 30
                            }}>
                                <Button text='Aplicar' onPress={() => setModal(true)} style={{
                                    marginTop: 'auto'
                                }} />

                            </DefaultView>
                        </DefaultView>


                    </DefaultView>
                </ScrollView>

            )}

            <BottomSheet isVisible={modal} setIsVisible={setModal}>
                <DefaultView style={{
                    height: 400
                }}>
                    <Text style={{
                        fontWeight: '600',
                        color: 'rgba(0,0,0,0.8)',
                        fontSize: 18
                    }}>Agrega tu prueba de trabajo</Text>

                    <Text style={{
                        fontWeight: '400',
                        color: 'rgba(0,0,0,0.6)',
                        fontSize: 14,
                        lineHeight: 20,
                        marginTop: 10
                    }}>Tu prueba de trabajo (portafolio) puede ser un drive, behance, github, links, proyecto independiente o  incluso tu hoja de vida (CV)</Text>

                    <Field label='URL'>
                        <Input onChangeText={(text) => setProof(text)} placeholder='https://dominio.com/react/marketing' keyboardAppearance='dark' />
                    </Field>
                    <DefaultView style={{
                        marginTop: 'auto'
                    }}>
                        <Button loading={creatingLoading} text='Siguiente' onPress={onSubmit} />
                        <TouchableOpacity
                            onPress={onSubmit}
                            style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.1)',
                                height: 45,
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 15
                            }}>
                            <Text style={{
                                color: '#5368f5',
                                fontSize: 16
                            }}>Saltar por ahora</Text>
                        </TouchableOpacity>
                    </DefaultView>
                </DefaultView>
            </BottomSheet>

        </View>
    )
}

export default WorkDetails