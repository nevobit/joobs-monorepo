import { View, Text, Alert, Pressable, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { DivisaFormater, fromNow } from '../../../../utils'
import translateToSpanish from '../../../../utils/frecuency-formater';
import Share from 'react-native-share';
import share from '../../../../utils/share';

interface Props{
  user: {
    name: string;
    photo: string;
    company_name: string;
    company_logo: string;
  }
  title: string;
  role: string;
  skills: string[];
  created_at: string;
  remuneration: {
    value: number;
    frecuency: string;
  }
}
const WorkCard = ({ user, title, skills, created_at, remuneration, role }: Props) => {
  return (
    
    <View style={{
      backgroundColor: '#fff',
      // height: 40,
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
    }}>
       <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'flex-start',
      }}>
        <View style={{
          flexDirection: 'row',
          gap: 8
        }}>
        {user?.photo ? (
             <View style={{
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
            </View>
        ) : (

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
          }}>{user?.company_name?.charAt(0)}</Text>
        </View>
        )}

        <View style={{
        }}>
          <Text style={{
            fontSize: 12,
            color: 'rgba(0,0,0,0.8)'
          }}>{user?.company_name}</Text>
          <Text style={{
            fontSize: 12,
            color: 'rgba(0,0,0,0.8)'
          }}>{fromNow(created_at)}</Text>
        </View>
        </View>

      

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff7e3',
          gap: 7,
          padding: 5,
          paddingHorizontal: 10,
          borderRadius: 20
        }}>
          <Text style={{
            color: 'rgba(0,0,0,.8)',
            fontSize: 12,
            fontWeight: '500'
          }}>{role}</Text>
        </View>
      </View>

      <Text style={{
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.8)',
        marginTop: 10,
        marginBottom: 20
      }}>{title}</Text>
      
      <View style={{
                flexDirection: 'row',
                gap: 10,
                flexWrap: 'wrap',
                marginBottom: 10
            }}>
                {skills?.map((skill: string) => (

                    <Text key={skill} style={{
                        backgroundColor: 'rgba(0,0,0,.05)',
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        fontSize: 12,
                        color: 'rgba(0,0,0,0.8)',
                        fontWeight: '400'
                    }}>{skill}</Text>
                ))}

            </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        paddingTop: 8
      }}>
        <View style={{
          flexDirection: 'row',
          gap: 7,
          alignItems: 'center'
        }}>
          <Icon name='cash-outline' size={20} color='rgba(0,0,0,0.8)' />
          <Text style={{
            fontSize: 12,
            color: 'rgba(0,0,0,0.8)'
          }}>{DivisaFormater({value: remuneration?.value})} / {translateToSpanish(remuneration?.frecuency)}</Text>
        </View>

        <Pressable onPress={() => share(title)} style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7
        }}>
          <Text style={{
            color: 'green'
          }}>Compartir</Text>
          <Icon name='logo-whatsapp' color='green' />
        </Pressable>
      </View>
    </View>
  )
}

export default WorkCard