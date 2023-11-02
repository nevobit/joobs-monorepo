import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { fromNow } from '../../../../utils';

interface Props {
  name: string,
  type: string,
  title: string,
  money?: number
  text: string;
  image?: string;
  created_at: string;
  photo?: string;
}
const HomePost = ({ name, photo, type, title, image, created_at, text }: Props) => {
  return (

    <View style={{
      backgroundColor: '#fff',
      // height: 40,
      padding: 15,
      borderRadius: 5,
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
        {photo ? <Image source={{
          uri: photo
        }}  width={30} height={30} style={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.1)'
        }} /> : (

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
              color: 'rgba(0,0,0,0.8)',
            }}>{name.charAt(0)}</Text>
          </View>
        )}

          <View style={{
          }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: 'rgba(0,0,0,0.8)'
            }}>{name}</Text>
            <Text style={{
              fontSize: 12,
              color: 'rgba(0,0,0,0.8)'
            }}>{fromNow(created_at)}</Text>
          </View>
        </View>

        {/* <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#c1c6fb70',
          gap: 7,
          padding: 5,
          paddingHorizontal: 10,
          borderRadius: 20
        }}>
          <Text style={{
            color: 'rgba(0,0,0,.8)',
            fontSize: 12,
            fontWeight: '500'
          }}>{type}</Text>
        </View> */}
      </View>

      <Text style={{
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.8)',
        marginTop: 10,
        marginBottom: 8
      }}>{title}</Text>

      <Text style={{
        fontSize: 15,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.6)',
        marginBottom: 15
      }}>{text}</Text>

      {image && (

      <Image source={{
        uri: image[0]
      }} style={{
        flex: 1,
        width: '100%',
        height: 300,
        resizeMode: 'contain',
      }} />

      )}

      {/* <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        paddingTop: 8
      }}>
        <View style={{
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center'
        }}>
          <Icon name='triangle-outline' size={20} color='rgba(0,0,0,0.8)' />
          <Text style={{
            fontSize: 14,
            color: 'rgba(0,0,0,0.8)'
          }}>11</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7
        }}>
          <Icon name='chatbubble-outline' size={20} color="rgba(0,0,0,0.8)"  />
          <Text style={{
            fontSize: 14,
            color:'rgba(0,0,0,0.8)'
          }}>0</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7
        }}>
          <Icon name='share-social-outline' size={20} color='rgba(0,0,0,0.8)' />
        </View>
      </View> */}
    </View>
  )
}

export default HomePost

function success(width: number, height: number): void {
  throw new Error('Function not implemented.');
}
