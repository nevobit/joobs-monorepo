import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const MemberCard = ({ item, navigation }: any) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { id: item.id })} style={{
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
                            {item?.photo ?

                                <Image source={{
                                    uri: item.photo
                                }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 50,
                                        overflow: 'hidden',
                                        backgroundColor: 'rgba(255, 255, 255, 1)',
                                    }}
                                />
                                :
                                <Text style={{
                                    fontSize: 18,
                                    color: 'rgba(0,0,0,0.8)'
                                }}>{item?.name?.charAt(0)}</Text>
                            }
                        </View>
                        <View>
                            
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            fontSize: 16,
                            fontWeight: '500'
                        }}>{item.name}</Text>
                          <Text style={{
                            color: 'rgba(0,0,0,0.6)',
                            fontSize: 13,
                            fontWeight: '400',
                        }}>{item.headline}</Text>
                        </View>

                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 10,
                        marginTop: 15
                    }}>
                        {item?.skills?.map((skill: string) => (
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
                </TouchableOpacity>
  )
}

export default MemberCard