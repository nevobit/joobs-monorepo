import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../../../components/Shared/Button'
import { useQuery } from '@apollo/client'
import { PROJECT } from '../../../../graphql/queries/projects'
import Difficulty from '../../../../utils/color'

const ProjectDetails = ({ navigation, route }: any) => {
    const [refreshing, setRefreshing] = useState(false);  
    const { data, loading, error, refetch } = useQuery(PROJECT, {
        variables: {
            projectId: route.params.id
        }
    });


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch().then(() => {
          setRefreshing(false);
        })
    }, [])


    useEffect(() => {
        refetch();
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1
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
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
            >

                <View style={{
                    backgroundColor: '#fff',
                    padding: 15,
                    borderRadius: 12,
                    position: 'relative'
                }}>
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
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            backgroundColor: Difficulty(data?.project?.difficulty),
                            position: 'absolute',
                            right: -15,
                            top: -15,
                            borderRadius: 12,
                            padding: 10,
                            borderTopStartRadius: 0,
                            borderBottomEndRadius: 0,
                        }}>
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
                        <Text  numberOfLines={2}  ellipsizeMode="tail" style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: 'rgba(0,0,0,0.8)',
                            maxWidth: '80%'
                        }} >{data?.project.prerequisites}</Text>
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
                        <Text numberOfLines={4}  ellipsizeMode="tail" style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: ' rgba(0,0,0,0.8)',
                            maxWidth: '80%'
                        }} >{data?.project.submission}</Text>
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
                        {data?.project?.skills.map((skill:string) => (

                            <Text key={skill} style={{
                                backgroundColor: 'rgba(0,0,0,.05)',
                                borderRadius: 20,
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                                fontSize: 14,
                                color: 'rgba(0,0,0,0.8)',
                                fontWeight: '400'
                            }}>{skill}</Text>
                        ))}

                    </View>
                    {/* <View style={{
                        borderTopColor: 'rgba(0,0,0,0.1)',
                        borderTopWidth: 1,
                        paddingTop: 10,
                        marginTop: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text> 41 Completados </Text>
                        <Icon name='arrow-forward-outline' size={24} />

                    </View> */}
                
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 40
                }}>
                    <View style={{
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: 50,
                        height: 70,
                        width: 70,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 2,
                        borderColor: 'rgba(0,0,0,0.4)'
                    }}>
                        <Icon name='lock-closed' size={40} color='rgba(0,0,0,0.8)' /> 
                    </View>
                    <Text style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: ' rgba(0,0,0,0.8)',
                            textAlign: 'center',
                            marginTop: 10
                        }} >Las instrucciones solo son visibles para aquellos que comienzan el proyecto</Text>
                </View>
                </View>
            </ScrollView>
            )}

<View style={{
                padding: 15,
                paddingTop: 0,
                backgroundColor: '#fff',
                marginTop: 'auto'
            }}>
            <Button text='Comenzar' />

            </View>
        </SafeAreaView>
    )
}

export default ProjectDetails