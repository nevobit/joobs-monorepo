import { TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl, Pressable, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { HomePost } from '../../../components/UI'
import Icon from 'react-native-vector-icons/Ionicons'
import { useQuery } from '@apollo/client'
import { USERS } from '../../../graphql/queries'
import { useSelector } from 'react-redux'

const Members = ({ navigation }: any) => {
    const { user } = useSelector((state: any) => state.auth);

    const { data, loading, error, refetch } = useQuery(USERS, {
        context: {
            headers: {
                authorization: user.token ? `Bearer ${user.token}` : '',
            },
        },
    });


    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch().then(() => {
            setRefreshing(false);
        })
    }, []);

    console.log(data)

    useEffect(() => {
        refetch()
    }, [refetch])
    return (
        <>
            <ScrollView contentContainerStyle={{
                paddingVertical: 15,
                paddingHorizontal: 15,
                marginBottom: 10,
                backgroundColor: 'rgba(255,255,255,0.3)'
            }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

            >

                {loading ? <ActivityIndicator color='#121212' size='large' /> : (
                    <ScrollView contentContainerStyle={{
                        marginBottom: 50,
                    }}
                    >
                        {data?.users?.slice().reverse().map((user: any) => (
                            //   <Pressable key={user.id} onPress={() => navigation.navigate('Discussion', { id: discussion.id })} > 
                            <View key={user.id} style={{
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
                                        }}>{user?.name?.charAt(0)}</Text>
                                    </View>
                                    <Text style={{
                                        color: 'rgba(0,0,0,0.8)',
                                        fontSize: 16,
                                        fontWeight: '500'
                                    }}>{user.name}</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: 10,
                                    marginTop: 15
                                }}>
                                    {user?.skills?.map((skill: string) => (
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
                            //  </Pressable>
                        ))}

                    </ScrollView>
                )}
            </ScrollView>
        </>
    )
}

export default Members