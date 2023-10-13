import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import Input from '../../../components/Shared/Input'
import Field from '../../../components/Shared/Field'
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/Ionicons'
import { HomePost } from '../../../components/UI'

const Profile = () => {
  Geolocation.getCurrentPosition(info => console.log(info));

  return (
    <View style={{
      height: '100%',
      marginBottom: 10,
    }}>

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
            }}>N</Text>
          </View>

          <Text style={{
            marginTop: 50,
            marginLeft: 10,
            fontSize: 16,
            color: '#fff'
          }}>Nestor Mosquera</Text>


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

    </View>
  )
}

export default Profile