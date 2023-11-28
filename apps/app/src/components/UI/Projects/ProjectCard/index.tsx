import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Difficulty from '../../../../utils/color'

const ProjectCard = ({difficulty, duration, skills, title}: any) => {
    return (
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
                    backgroundColor: Difficulty(difficulty),
                    padding: 5,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    fontSize: 12,
                    color: 'rgba(0,0,0,0.8)'
                }}>{difficulty}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    backgroundColor: Difficulty(difficulty),
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
                    }}>{duration}</Text>
                </View>
            </View>
            <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: ' rgba(0,0,0,0.8)',
                marginTop: 15
            }}>{title}</Text>

            <Text style={{
                fontSize: 12,
                fontWeight: '300',
                color: ' rgba(0,0,0,0.8)',
                marginTop: 15
            }}>Habilidades que aprenderás</Text>

            <View style={{
                flexDirection: 'row',
                gap: 10,
                flexWrap: 'wrap',
                marginTop: 10
            }}>
                {skills?.map((skill: string) => (

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
                <View style={{
                    borderTopColor: 'rgba(0,0,0,0.1)',
                    borderTopWidth: 1,
                    paddingTop: 10,
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text> 
                        {/* 41 Completados */}
                    </Text>
                    <Icon name='arrow-forward-outline' size={24} />

                </View>
        </View>
    )
}

export default ProjectCard