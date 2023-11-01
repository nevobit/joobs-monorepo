import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { WORK } from '../../../../graphql/queries';
import { DivisaFormater, fromNow } from '../../../../utils';
import translateToSpanish from '../../../../utils/frecuency-formater';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../../../components/Shared/Button';

const WorkDetails = ({ route }: any) => {
    const { data, loading, error, refetch } = useQuery(WORK, {
        variables: {
            workId: route.params.id
        }
    });
    console.log('WORK Details', data)
    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                height: 50,
                backgroundColor: '#121212'
            }}>
            </View>
            {loading ? <ActivityIndicator size='large' color='#121212' style={{
                marginTop: 20
            }} /> : (

                <View style={{
                    backgroundColor: '#fff',
                    // height: '100%',
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20,
                    marginTop: -20,
                    padding: 15,
                    flex: 1
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 10,
                        alignItems: 'flex-start',
                        marginTop: 5
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            gap: 8
                        }}>

                            <View style={{
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
                                }}>{data.work.name?.charAt(0)}</Text>
                            </View>
                            <View style={{
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: 'rgba(0,0,0,0.8)'
                                }}>{data.work.name}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: 'rgba(0,0,0,0.8)'
                                }}>{fromNow(data.work.created_at)}</Text>
                            </View>
                        </View>
                        <View >
                         
                        </View>
                    </View>

                    <View style={{
                        flex: 1
                    }}>
                        <Text style={{
                            color: '#111',
                            fontWeight: '600',
                            fontSize: 18,
                            marginTop: 10
                        }}>{data?.work?.title}</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                            gap: 10
                        }}>
                            <Icon name='cash-outline' size={20} color='rgba(0,0,0,0.8)' />

                            <Text style={{
                                color: 'rgba(0,0,0,0.6)',
                                fontWeight: '500',
                                fontSize: 14
                            }}>{DivisaFormater({ value: data.work.remuneration?.value })} / {translateToSpanish(data.work.remuneration.frecuency)}</Text>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 8,
                            marginTop: 15,
                            borderBottomColor: 'rgba(0,0,0,0.1)',
                            borderBottomWidth: 1,
                            paddingBottom: 15
                        }}>
                            {data.work.skills.map((skill: string) => (
                                <Text style={{
                                    backgroundColor: 'rgba(0,0,0, .1)',
                                    borderRadius: 20,
                                    paddingHorizontal: 10,
                                    paddingVertical: 4,
                                    fontSize: 12,
                                    color: 'rgba(0,0,0,0.8)',
                                    fontWeight: '500'
                                }}>{skill}</Text>
                            ))}

                        </View>
                        <View style={{
                            marginTop: 10
                        }}>
                            <Text style={{
                                color: 'rgba(0,0,0,0.8)',
                                fontSize: 14
                            }}>{data.work.description}</Text>
                        </View>

                        <View style={{
                            marginTop: 'auto'
                        }}>
                            <Button text='Aplicar' style={{
                                marginTop: 'auto'
                            }} />

                        </View>
                    </View>


                </View>
            )}

        </View>
    )
}

export default WorkDetails