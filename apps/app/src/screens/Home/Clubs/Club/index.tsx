import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { ActivityIndicator, Alert, Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { CLUB } from '../../../../graphql/queries/clubs';
import { useSelector } from 'react-redux';
import { MEMBERS } from '../../../../graphql/queries/members';
import { JOIN } from '../../../../graphql/mutations/members';
import { useUser } from '../../../../hooks/users/useUser';

const Club = ({ navigation, route }: any) => {
    const { user } = useSelector((state: any) => state.auth);
    const { user: userInfo } = useUser(); 
    const [refreshing, setRefreshing] = React.useState(false);

    const { data, loading: isLoading, error, refetch } = useQuery(CLUB, {
        context: {
            headers: {
                authorization: user.token ? `Bearer ${user.token}` : '',
            },
        },
        variables: {
            clubId: route.params.id
        }
    });

    const { data: dataMembers, loading, refetch: refetchMembers } = useQuery(MEMBERS, {
        context: {
            headers: {
                authorization: user.token ? `Bearer ${user.token}` : '',
            },
        },
        variables: {
            membersId: route.params.id
        }
    });

    const [join, { loading: creatingLoading, error: creatingError }] = useMutation(JOIN, {
        onCompleted: () => {
            refetch()
        },
        refetchQueries: [
            { query: CLUB }
        ]
    })


    const onSubmit = async (id: string) => {
        try {
            await join({
                variables: {
                    data: {
                        userId: userInfo.id,
                        clubId: id,
                    }
                }
            })
        } catch (e) {
            Alert.alert('Error Critico', String(e));
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch().then(() => {
            setRefreshing(false);
        })
    }, []);


    useEffect(() => {
        refetch()
    }, [refetch])
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={{
                backgroundColor: '#121212',
                // height: 30,
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingTop: 5,
                paddingBottom: 5
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={25} color='#fff' />
                </TouchableOpacity>

            </View>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{
                    flex: 1,
                    height: '100%',
                    marginTop:-15,
                    marginBottom: 10,
                    backgroundColor: 'rgba(255, 255, 255, .2)'
                }}
            >
                {isLoading ? <ActivityIndicator color='#000' size='large' style={{
                    marginTop: 30
                }} /> : (
                    <>
                        <View style={{
                            backgroundColor: '#121212',
                            // height: 180,
                            paddingHorizontal: 15,
                        }}>
                            <View style={{
                                position: 'relative',
                                borderRadius: 10,
                                marginTop: 40,
                                paddingBottom: 15,
                                borderBottomWidth: 1,
                                borderBottomColor: 'rgba(255,255,255,.3)',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: '#fff'
                                }}>{data.club.name}</Text>

                                {!data.club.joined ? (
                                    <TouchableOpacity
                                        onPress={() => onSubmit(route.params.id)}
                                        style={{
                                            borderWidth: 1,
                                            backgroundColor: 'rgba(255, 255, 255, 1)',
                                            borderRadius: 40,
                                            paddingHorizontal: 20,
                                            paddingVertical: 5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            gap: 6
                                        }}>
                                        <Text style={{
                                            fontSize: 14, color: 'rgba(0,0,0,0.8)'
                                        }}>Unirse</Text>
                                        {creatingLoading? <ActivityIndicator color='#000' /> : (
                                            <Icon name='add-outline' size={20} color='rgba(0,0,0,0.8)' />
                                        )}
                                    </TouchableOpacity>


                                ) : (
                                    <TouchableOpacity style={{
                                        borderWidth: 1,
                                        borderColor: 'rgba(255, 255, 255, 1)',
                                        borderRadius: 40,
                                        paddingHorizontal: 20,
                                        paddingVertical: 5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        gap: 6
                                    }}>
                                        <Text style={{
                                            fontSize: 14, color: '#fff'
                                        }}>Unido</Text>
                                        <Icon name='checkmark-outline' size={20} color='#fff' />
                                    </TouchableOpacity>

                                )}



                            </View>
                            <View>
                                <Text style={{
                                    color: 'rgba(255,255,255,0.6)',
                                    marginTop: 15,
                                    fontSize: 14,
                                    fontWeight: '500'
                                }}>{data.club.members} integrantes</Text>

                                <Text style={{
                                    color: 'rgba(255,255,255,0.8)',
                                    marginTop: 15,
                                    fontSize: 14,
                                    fontWeight: '400'
                                }}>{data.club.description}</Text>
                            </View>
                            <Text style={{
                                fontSize: 18,
                                color: '#FFFFFF',
                                marginTop: 20,
                                marginBottom: 20
                            }}>Integrantes</Text>
                        </View>
                        <ScrollView contentContainerStyle={{
                            paddingHorizontal: 15,
                            paddingTop: 10,
                            backgroundColor: 'rgba(255, 255, 255, .2)',
                            flex: 1,
                            height: '100%',
                        }}>
                            {dataMembers?.members.map((member: any) => (
                                <View key={member.id} style={{
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    padding: 10,
                                    marginBottom: 10
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 10
                                    }}>
                                        <View style={{
                                            backgroundColor: 'rgba(230, 81, 0, 0.5)',
                                            width: 50,
                                            height: 50,
                                            flexDirection: 'row',
                                            borderRadius: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Text style={{
                                                fontSize: 18,
                                                color: 'rgba(0,0,0,0.8)'
                                            }}>{member?.user?.name.charAt(0)}</Text>
                                        </View>
                                        <Text style={{
                                            color: 'rgba(0,0,0,0.8)',
                                            fontSize: 16,
                                            fontWeight: '500'
                                        }}>{member.user.name}</Text>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        gap: 10,
                                        marginTop: 15
                                    }}>
                                        {member.user.skills.map((skill: string) => (
                                            <Text key={skill} style={{
                                                backgroundColor: 'rgba(0,0,0,.05)',
                                                borderRadius: 20,
                                                paddingHorizontal: 10,
                                                paddingVertical: 4,
                                                fontSize: 10,
                                                color: 'rgba(0,0,0,0.8)',
                                                fontWeight: '400'
                                            }}>{skill}</Text>
                                        ))}

                                    </View>
                                </View>

                            ))}

                        </ScrollView>
                    </>

                )}


            </ScrollView>
        </SafeAreaView>

    )
}

export default Club