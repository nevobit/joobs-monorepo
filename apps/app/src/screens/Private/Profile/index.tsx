import React, { useEffect } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useUser } from '../../../hooks/users/useUser'

const Profile = () => {
  const { isLoading, user, refetch } = useUser();

  useEffect(() => {
    refetch()
},[refetch])
  return (
    <ScrollView style={{
      height: '100%',
      marginBottom: 10,
      backgroundColor: 'rgba(255, 255, 255, .6)'
    }}>
      {isLoading ? <ActivityIndicator color='#000' /> : (
        <>

      <View style={{
        backgroundColor: '#121212',
        height: 370,
        paddingHorizontal: 15,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15
      }}>
        <View style={{
          position: 'relative',
          backgroundColor: '#474747',
          height: 150,
          borderRadius: 10,
          marginTop: 40
        }}>
          {user?.photo? 

          <Image source={{
            uri: user.photo
          }} 
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 4,
            borderColor: '#474747',
            position: 'absolute',
            top: -25,
            left: 15,
          }}
          />
            :
            <View style={{
            height: 70,
            width: 70,
            backgroundColor: '#5368f5',
            borderRadius: 50,
            position: 'absolute',
            top: -25,
            left: 15,
            borderWidth: 4,
            borderColor: '#474747',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: 40,
              fontWeight: '400',
              color: '#fff'
            }}>{user?.name.charAt(0).toUpperCase()}</Text>
          </View>
}
          <Text style={{
            marginTop: 50,
            marginLeft: 10,
            fontSize: 16,
            color: '#fff'
          }}>{user?.name}</Text>


          <Text style={{
            marginTop: 10,
            marginLeft: 10,
            fontSize: 14,
            color: '#fff'
          }}>0 conexiones</Text>



        </View>

        <ScrollView horizontal style={{
          flex: 1,
          marginTop: 20,
          flexDirection: 'row',
          gap: 10,
          position: 'relative',
        }}>
          <View style={{
            backgroundColor: '#f2f2f2',
            width: 112,
            height: 135,
            borderRadius: 10,
            padding: 10,
            marginRight: 8,
            position: 'relative',
            marginTop: 10
          }}>
            <View style={{
              position: 'absolute',
              top: -10,
              left: 10,
              backgroundColor: '#fddf8e',
              height: 30,
              width: 30,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name='information-circle-outline' size={25} color='rgba(0,0,0,0.8)' />

            </View>
            <Text style={{
              marginTop: 10,
              fontWeight: '600',
              color: 'rgba(0,0,0,0.8)',
              fontSize: 16
            }}>Informacion Personal</Text>
            <Text style={{
              fontSize: 12,
              color: 'rgba(0,0,0,0.8)',
            }}>Agrega tu descripcion</Text>

            <Text style={{
              marginTop: 'auto',
              fontSize: 12,
              color: 'rgba(0,0,0,0.8)',
            }}>4/5 completados</Text>
          </View>
          <View style={{
            backgroundColor: '#f2f2f2',
            width: 112,
            height: 135,
            borderRadius: 10,
            padding: 10,
            marginRight: 8,
            marginTop: 10
          }}>
            <View style={{
              position: 'absolute',
              top: -10,
              left: 10,
              backgroundColor: '#a4eba4',
              height: 30,
              width: 30,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name='school-outline' size={25} color='rgba(0,0,0,0.8)' />

            </View>
            <Text style={{
              marginTop: 10,
              fontWeight: '600',
              color: 'rgba(0,0,0,0.8)',
              fontSize: 16
            }}>Educacion</Text>
            <Text style={{
              fontSize: 12,
              color: 'rgba(0,0,0,0.8)',
            }}>Agrega tu descripcion</Text>

            <Text style={{
              marginTop: 'auto',
              fontSize: 12,
              color: 'rgba(0,0,0,0.8)',
            }}>4/5 completados</Text>
          </View>
          <View style={{
            backgroundColor: '#f2f2f2',
            width: 112,
            height: 135,
            borderRadius: 10,
            padding: 10,
            marginTop: 10
          }}>
            <View style={{
              position: 'absolute',
              top: -10,
              left: 10,
              backgroundColor: '#c09ffb',
              height: 30,
              width: 30,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name='chatbubble-outline' size={20} color='rgba(0,0,0,0.8)' />

            </View>
            <Text style={{
              marginTop: 10,
              fontWeight: '600',
              color: 'rgba(0,0,0,0.8)',
              fontSize: 16
            }}>Networking</Text>
            <Text style={{
              fontSize: 12,
              color: 'rgba(0,0,0,0.8)',
            }}>Agrega tu descripcion</Text>

            <Text style={{
              marginTop: 'auto',
              fontSize: 12,
              color: 'rgba(0,0,0,0.8)',
            }}>4/5 completados</Text>
          </View>
        </ScrollView>
      </View>
            <View style={{
              paddingHorizontal: 15
            }}>

      <View style={{
        marginTop: 15,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 10,
        padding: 10
      }} >
        <View style={{
          flexDirection:'row',
          alignItems: 'center'
        }}>
        <Text style={{
          fontWeight: '600',
          fontSize: 16,
          color: 'rgba(0,0,0,0.8)',
        }}>Informacion Privada </Text>
       <View style={{
          
          backgroundColor: 'rgba(255,255,255, .8)',
          marginLeft: 10,
          borderRadius: 50,
          paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row'
        }}> 
        <Text> <Icon name="time-outline"  /> </Text> 
        <Text style={{
          fontWeight: '400',
          fontSize: 12,
          color: 'rgba(0,0,0,0.8)'
        }}>Solo visible para ti</Text>
        </View>
        </View>
        <View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10
          }}>
            <Text style={{
              fontSize: 14,
              color: 'rgba(0,0,0,0.8)'
            }} >Genero</Text>
            <Text style={{
              fontSize: 14,
              color: 'rgba(0,0,0,0.8)'
            }} >{user?.gender}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10
          }}>
            <Text style={{
              fontSize: 14,
              color: 'rgba(0,0,0,0.8)'
            }} >Telefono</Text>
            <Text style={{
              fontSize: 14,
              color: 'rgba(0,0,0,0.8)'
            }} >{user?.phone}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10
          }}>
            <Text style={{
              fontSize: 14,
              color: 'rgba(0,0,0,0.8)'
            }} >Nacimiento</Text>
            <Text style={{
              fontSize: 14,
              color: 'rgba(0,0,0,0.8)'
            }} >{user?.born_date}</Text>
          </View>

        </View>
      </View>
      </View>
      </>

      )}


    </ScrollView>
  )
}

export default Profile