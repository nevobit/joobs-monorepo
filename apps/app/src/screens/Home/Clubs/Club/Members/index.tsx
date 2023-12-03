import { View as DefaultView, Pressable, ScrollView, Text } from 'react-native'
import React from 'react'
import { useMembersClubs } from '../../../../../hooks'

const MembersClub = ({id}: { id: string }) => {
    const { members, isLoading } = useMembersClubs(id);
    return (
        <ScrollView  contentContainerStyle={{
            marginBottom: 50,
            paddingHorizontal: 15,
            paddingTop: 10,
        }}>
            {members?.map((member: any) => (
                <Pressable key={member.user.id} >
                <DefaultView  style={{
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 10
                }}>
                    <DefaultView style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10
                    }}>
                        <DefaultView style={{
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
                            }}>{member?.user?.name?.charAt(0)}</Text>
                        </DefaultView>
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            fontSize: 16,
                            fontWeight: '500'
                        }}>{member?.user?.name}</Text>
                    </DefaultView>

                    <DefaultView style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 10,
                        marginTop: 15
                    }}>
                        {member?.user?.skills?.map((skill: string) => (
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

                    </DefaultView>
                </DefaultView>
                </Pressable>

            ))}

        </ScrollView>
  )
}

export default MembersClub