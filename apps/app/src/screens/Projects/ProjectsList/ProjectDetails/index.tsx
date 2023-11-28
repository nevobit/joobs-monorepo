import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../../../components/Shared/Button'
import { useMutation, useQuery } from '@apollo/client'
import { PROJECT } from '../../../../graphql/queries/projects'
import Difficulty from '../../../../utils/color'
import { PARTICIPATE } from '../../../../graphql/mutations/participations'
import { Alert } from 'react-native'
import { useUser } from '../../../../hooks/users/useUser'
import { useIsParticipant } from '../../../../hooks/participants/useIsParticipant'
import styles from './styles'

const ProjectDetails = ({ navigation, route }: any) => {
    const [refreshing, setRefreshing] = useState(false);
    const { user: userInfo, refetch: refetchUser } = useUser();
    const { data, loading, error, refetch } = useQuery(PROJECT, {
        variables: {
            projectId: route.params.id
        }
    });
    const { isParticipant, refetch: refetchParticipant } = useIsParticipant(route.params.id);

    console.log(isParticipant)
    const [participate, { data: dataCreating, loading: isCreating, error: creatingError }] = useMutation(PARTICIPATE)

    const onSubmit = async () => {
        try {
            await participate({
                variables: {
                    data: {
                        user: userInfo.id,
                        project: route.params.id,
                    }
                },
            });
            await refetchParticipant();

        } catch (err) {
            if (creatingError) {
                Alert.alert('No se pudo crear la publicacion', creatingError.message);
                return
            }
        }
        // refetch()
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch().then(() => {
            setRefreshing(false);
        })
    }, [])

    useEffect(() => {
        refetchUser();
        refetch();
        refetchParticipant();
    }, [refetchParticipant, refetchUser, refetch])

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={25} color='#fff' />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    color: '#fff',
                }}>Detalles del Proyecto</Text>
            </View>
            <View style={{
                height: 10,
                backgroundColor: '#121212'
            }} />

            {loading ? <ActivityIndicator style={{
                marginTop: 10
            }} size='large' color='rgba(0,0,0,0.8)' /> : (

                <ScrollView contentContainerStyle={{
                    padding: 15
                }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >

                    <View style={styles.card}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                backgroundColor: Difficulty(data?.project?.difficulty),
                                padding: 5,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                fontSize: 12,
                                color: 'rgba(0,0,0,0.8)'
                            }}>{data?.project.difficulty}</Text>
                            <View style={[styles.duration, {
                                backgroundColor: Difficulty(data?.project?.difficulty),
                            }]}>
                                <Icon name='time-outline' size={25} color='rgba(0,0,0,0.8)' />
                                <Text style={{
                                    fontSize: 14,
                                    color: 'rgba(0,0,0,0.8)'
                                }}>{data?.project.duration}</Text>
                            </View>
                        </View>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: ' rgba(0,0,0,0.8)',
                            marginTop: 15
                        }}>{data?.project.title}</Text>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: ' rgba(0,0,0,0.8)',
                            marginTop: 5
                        }}>{data?.project.description}</Text>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            marginTop: 15
                        }}>

                            <Text style={{
                                fontSize: 14,
                                fontWeight: '600',
                                color: 'rgba(0,0,0,0.8)',
                            }} >Prerequisito: </Text>
                            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text} >{data?.project.prerequisites}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            marginTop: 15
                        }}>

                            <Text style={{
                                fontSize: 14,
                                fontWeight: '600',
                                color: ' rgba(0,0,0,0.8)',
                            }} >Metodo de entrega: </Text>
                            <Text numberOfLines={4} ellipsizeMode="tail" style={styles.text} >{data?.project.submission}</Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: ' rgba(0,0,0,0.8)',
                            marginTop: 15
                        }}>Habilidades que aprenderás</Text>

                        <View style={{
                            flexDirection: 'row',
                            gap: 10,
                            flexWrap: 'wrap',
                            marginTop: 10
                        }}>
                            {data?.project?.skills.map((skill: string) => (
                                <Text key={skill} style={styles.skill}>{skill}</Text>
                            ))}

                        </View>
                        {!isParticipant ? (
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 40
                            }}>
                                <View style={styles.lock}>
                                    <Icon name='lock-closed' size={40} color='rgba(0,0,0,0.8)' />
                                </View>
                                <Text style={styles.message} >Las instrucciones solo son visibles para aquellos que comienzan el proyecto</Text>
                            </View>
                        ) : (
                            <View style={{
                                marginTop: 20
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    color: 'rgba(0,0,0,0.6)'
                                }}>
                                    Instrucciones
                                </Text>
                                <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 15
                                }}>
                                    <TouchableOpacity style={{
                                        borderWidth: 1,
                                        borderColor: 'rgba(0,0,0,0.1)',
                                        borderRadius: 5,
                                        height: 45,
                                        width: 45,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text> <Icon name='chevron-back-outline' size={20} /> </Text>
                                    </TouchableOpacity>
                                    <View style={{
                                        borderWidth: 1,
                                        borderColor: 'rgba(0,0,0,0.1)',
                                        borderRadius: 5,
                                        height: 45,
                                        width: '60%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: 'rgba(0,0,0,0.8)'
                                        }}>Etapa</Text>
                                          <Text style={{
                                            fontSize: 12,
                                            fontWeight: '400',
                                            color: 'rgba(0,0,0,0.6)'
                                        }}>{data?.project?.stages[0]?.steps?.length} paso{data?.project?.stages[0]?.steps?.length > 1 ? 's': ''}</Text>
                                    </View>
                                    <TouchableOpacity style={{
                                        borderWidth: 1,
                                        borderColor: 'rgba(0,0,0,0.1)',
                                        borderRadius: 5,
                                        height: 45,
                                        width: 45,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text> <Icon name='chevron-forward-outline' size={20} /> </Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={{
                                    marginTop: 15
                                }}>
                                {data?.project?.stages[0]?.steps.map((step: any, index: number) => (
                                    <View key={step.title} style={{
                                        marginBottom: 10
                                    }}>
                                        <Text style={{
                                            color: '#5368f5',
                                            fontWeight: '400',
                                            fontSize: 14
                                        }}>Paso {index + 1}</Text>
                                        <Text style={{
                                            color: 'rgba(0,0,0,0.8)',
                                            fontWeight: '500',
                                            fontSize: 16
                                        }}>{step.title}</Text>
                                    </View>
                                ))}
                                </View>
                                
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}


            <View style={styles.btn}>
            {!isParticipant && (
                <Button loading={isCreating} onPress={onSubmit} text='Comenzar' />
            )}
            </View>

</SafeAreaView>
    )
}

export default ProjectDetails