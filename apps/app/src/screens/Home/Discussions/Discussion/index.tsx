import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons'
import { fromNow } from '../../../../utils';
import { DISCUSSION } from '../../../../graphql/queries/discussions'
import Share from 'react-native-share';
import { useSelector } from 'react-redux';

const DiscussionDetails = ({ navigation, route }: any) => {
    const { user } = useSelector((state: any) => state.auth);
    const [refreshing, setRefreshing] = React.useState(false);

    const { data, loading: isLoading, error, refetch } = useQuery(DISCUSSION, {
        context: {
            headers: {
                authorization: user.token ? `Bearer ${user.token}` : '',
            },
        },
        variables: {
            discussionId: route.params.id
        }
    });

    console.log(data?.discussion)
    const share = async () => {
    const options = {
      message: `Hey, estoy teniendo una discusion interesante sobre ${data?.discussion?.title}`,
      url: 'https://joobs.lat'
    }

    try {
      await Share.open(options)
    }catch(e) {
      Alert.alert('No se puede compartir', String(e))
    }

  }

  useEffect(() => {
    refetch()
  }, [refetch])
  
  return (

    <View style={{
      backgroundColor: '#fff',
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
        {data?.discussion?.user?.photo ? <Image source={{
          uri: data?.discussion?.user?.photo
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
            }}>{data?.discussion?.user?.name.charAt(0)}</Text>
          </View>
        )}

          <View style={{
          }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: 'rgba(0,0,0,0.8)'
            }}>{data?.discussion?.user?.name}</Text>
            <Text style={{
              fontSize: 12,
              color: 'rgba(0,0,0,0.8)'
            }}>{fromNow(data?.discussion?.created_at)}</Text>
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
      }}>{data?.discussion?.title}</Text>

      <Text style={{
        fontSize: 15,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.6)',
        marginBottom: 15
      }}>{data?.discussion?.text}</Text>

      {data?.discussion?.images && (

      <Image source={{
        uri: data.discussion.images[0]
      }} style={{
        flex: 1,
        width: '100%',
        height: 300,
        resizeMode: 'contain',
      }} />

      )}

     <View style={{
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        paddingTop: 10,
        paddingHorizontal: 5
      }}>
         {/* 
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
*/}
        <TouchableOpacity onPress={share} style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7
        }}>
          <Icon name='share-social-outline' size={25} color='rgba(0,0,0,0.8)' />
        </TouchableOpacity>
      </View> 
    </View>
  )
}

export default DiscussionDetails

