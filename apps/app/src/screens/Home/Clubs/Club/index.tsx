import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { ActivityIndicator, Alert, Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View as DefaultView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { CLUB } from '../../../../graphql/queries/clubs';
import { useSelector } from 'react-redux';
import { MEMBERS } from '../../../../graphql/queries/members';
import { JOIN } from '../../../../graphql/mutations/members';
import { useUser } from '../../../../hooks/users/useUser';
import { View } from '../../../../components/Shared/View';
import ClubTopTap from '../../../../navigator/ClubTopTab';

const Club = ({ navigation, route }: any) => {
    const { user: userInfo } = useUser(); 
    const [refreshing, setRefreshing] = React.useState(false);

    const { data, loading: isLoading, error, refetch } = useQuery(CLUB, {
        variables: {
            clubId: route.params.id
        }
    });

    const { data: dataMembers, loading, refetch: refetchMembers } = useQuery(MEMBERS, {
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
        <View>
            <DefaultView style={{
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
                    <Icon name='chevron-back' size={25} color='#fff' />
                </TouchableOpacity>

            </DefaultView>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{
                    flex: 1,
                    height: '100%',
                    marginTop:-15,
                    marginBottom: 10,
                    backgroundColor: '#f0f0f0',
                }}
            >
                {isLoading ? <ActivityIndicator color='#000' size='large' style={{
                    marginTop: 30
                }} /> : (
                    <>
                        <DefaultView style={{
                            backgroundColor: '#121212',
                            // height: 180,
                            paddingHorizontal: 15,
                        }}>
                            <DefaultView style={{
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
                                }}>{data?.club.name}</Text>

                                {!data?.club.joined ? (
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



                            </DefaultView>
                            <DefaultView>
                                <Text style={{
                                    color: 'rgba(255,255,255,0.6)',
                                    marginTop: 15,
                                    fontSize: 14,
                                    fontWeight: '500'
                                }}>{data?.club.members} integrantes</Text>

                                <Text style={{
                                    color: 'rgba(255,255,255,0.8)',
                                    marginTop: 15,
                                    fontSize: 14,
                                    fontWeight: '400'
                                }}>{data?.club.description}</Text>
                            </DefaultView>
                            <Text style={{
                                marginTop: 5,
                                marginBottom:5
                            }}></Text>
                        </DefaultView>
                        <ClubTopTap navigation={navigation} id={route.params.id} />
                    
                    </>

                )}


            </ScrollView>
        </View>

    )
}

export default Club