import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { fromNow } from '../../../../utils';
import Share from 'react-native-share';
import { useMutation } from '@apollo/client';
import { DELETELIKE, LIKE } from '../../../../graphql/mutations/likes';
import { LIKES } from '../../../../graphql/queries/likes';
import { useUser } from '../../../../hooks/users/useUser';
import { useSelector } from 'react-redux';
import { DISCUSSIONS } from '../../../../graphql/queries';
import { getColorForClub } from '../../../../screens/Home/club-color';
interface Props {
  name: string,
  id: string,
  type: string,
  title: string,
  money?: number
  text: string;
  image?: string;
  created_at: string;
  comments: number;
  likes: number;
  liked: number;
  photo?: string;
  refetch:any
  discussionId: string;
  navigation: any
}

const HomePost = ({ refetch, id, navigation, liked, likes, discussionId, comments, name, photo, type, title, image, created_at, text }: Props) => {
  const { user: userInfo, refetch: refetchUser } = useUser();
  const { user } = useSelector((state: any) => state.auth);

  const share = async () => {
    const options = {
      message: `Hey, estoy teniendo una discusion interesante sobre ${title}`,
      url: 'https://joobs.lat'
    }

    try {
      await Share.open(options)
    } catch (e) {
      console.log(e);
      // Alert.alert('No se puede compartir', String(e))
    }

  }


  const [like, { loading: likeLoading, error: likeError }] = useMutation(LIKE, {
    refetchQueries: [
      { query: DISCUSSIONS }
    ]
  })

  const [likeDelete, { loading: likeDeleteLoading, error: likeDeleteError }] = useMutation(DELETELIKE, {
    refetchQueries: [
      { query: DISCUSSIONS }
    ]
  })

  const onSubmitLike = async () => {
    if (!liked) {

      await like({
        variables: {
          data: {
            discussionId: discussionId,
            userId: userInfo.id
          }
        }
      })

      await refetchUser();
      await refetch();
    } else {
      await likeDelete({
        context: {
          headers: {
            authorization: user.token ? `Bearer ${user.token}` : '',
          },
        },
        variables: {
          data: {
            discussionId: discussionId,
            userId: userInfo.id
          }
        }
      })

      await refetchUser();
      await refetch();
    }

  }

  return (

    <View style={{
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 5,
      marginBottom: 15,
    }}>
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { id: id })} style={{
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
          }} width={30} height={30} style={{
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
              }}>{name?.charAt(0)}</Text>
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

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: getColorForClub(type),
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
        </View> 
      </TouchableOpacity>

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

      {image && image?.length > 0 && (

        <Image source={{
          uri: image[0]
        }} style={{
          flex: 1,
          width: '100%',
          height: 300,
          resizeMode: 'contain',
        }} />

      )}

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        paddingTop: 10,
        paddingHorizontal: 5
      }}>

        <View style={{
          flexDirection: "row",
          gap: 20
        }}>

        <TouchableOpacity

disabled={likeDeleteLoading || likeLoading} onPress={onSubmitLike} style={{
  flexDirection: 'row',
  gap: 5,
  alignItems: 'center'
}}>
<Icon name={!liked ? 'triangle-outline' : 'triangle'} size={20} color='rgba(0,0,0,0.8)' />
<Text style={{
  fontSize: 14,
  color: 'rgba(0,0,0,0.8)'
}}>{likes}</Text>
</TouchableOpacity>

        <TouchableOpacity

// disabled={likeDeleteLoading || likeLoading} onPress={onSubmitLike} 
style={{
  flexDirection: 'row',
  gap: 5,
  alignItems: 'center',
  transform: [{ rotate: '180deg' }],
}}>
<Icon name={'triangle-outline'} size={20} color='rgba(0,0,0,0.8)' />

</TouchableOpacity>
        </View>

      
        

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7
        }}>
          <Icon name='chatbubble-outline' size={20} color="rgba(0,0,0,0.8)" />
          <Text style={{
            fontSize: 14,
            color: 'rgba(0,0,0,0.8)'
          }}>{comments}</Text>
        </View>

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

export default HomePost

function success(width: number, height: number): void {
  throw new Error('Function not implemented.');
}
