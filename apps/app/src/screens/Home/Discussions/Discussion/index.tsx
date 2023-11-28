import { View, Text, Image, TouchableOpacity, Alert, ScrollView, ActivityIndicator, RefreshControl, SafeAreaView, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons'
import { fromNow } from '../../../../utils';
import { DISCUSSION } from '../../../../graphql/queries/discussions'
import Share from 'react-native-share';
import { useSelector } from 'react-redux';
import Input from '../../../../components/Shared/Input';
import Button from '../../../../components/Shared/Button';
import { COMMENTS } from '../../../../graphql/queries/comments';
import { COMMENT } from '../../../../graphql/mutations/comments';
import { useUser } from '../../../../hooks/users/useUser';
import { LIKES } from '../../../../graphql/queries/likes';
import { DELETELIKE, LIKE } from '../../../../graphql/mutations/likes';

const DiscussionDetails = ({ navigation, route }: any) => {
  const [text, setText] = useState('');
    const { user } = useSelector((state: any) => state.auth);
    const { user: userInfo, refetch: refetchUser } = useUser();
    const [refreshing, setRefreshing] = React.useState(false);
  const scrollViewRef = useRef<ScrollView>();
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

    const { data: dataComments, loading: isLoadingComments, error: errorComments, refetch: refetchComments } = useQuery(COMMENTS, {
      context: {
          headers: {
              authorization: user.token ? `Bearer ${user.token}` : '',
          },
      },
      variables: {
          commentsId: route.params.id
      }
  });

  const { data: dataLikes, loading: isLoadingLikes, error: errorLikes, refetch: refetchLikes } = useQuery(LIKES, {
    context: {
        headers: {
            authorization: user.token ? `Bearer ${user.token}` : '',
        },
    },
    variables: {
        likesId: route.params.id
    }
});


  const [comment, { loading: creatingLoading, error: creatingError }] = useMutation(COMMENT, {
    onCompleted: () => {
      setText('')
      refetchUser()
      refetch()
    },
    refetchQueries: [
        { query: COMMENTS }
    ]
})

const [like, { loading: likeLoading, error: likeError }] = useMutation(LIKE, {
  refetchQueries: [
      { query: LIKES }
  ]
})

const [likeDelete, { loading: likeDeleteLoading, error: likeDeleteError }] = useMutation(DELETELIKE, {
  refetchQueries: [
      { query: LIKES }
  ]
})


    const share = async () => {
    const options = {
      message: `Hey, estoy teniendo una discusion interesante sobre ${data?.discussion?.title}`,
      url: 'https://joobs.lat'
    }

    try {
      await Share.open(options)
    }catch(e) {
      console.log(e)
      // Alert.alert('No se puede compartir', String(e))
    }

  }

  const onSubmit = async () => {
    if(text.length > 1){

    await comment({
      variables: {
        data: {
          discussionId: route.params.id,
          text: text,
          userId: userInfo.id
        }
      }
    })

    Keyboard.dismiss();
    scrollViewRef.current?.scrollToEnd({animated: true})
    await setText('')
    await refetchComments()
    await refetchUser()
    await refetch()
  }
  }

  const onSubmitLike = async() => {
    if(!data?.discussion.liked){

    await like({
      variables: {
        data: {
          discussionId: route.params.id,
          userId: userInfo.id
        }
      }
    })

    await refetchLikes();
    await refetchUser();
    await refetch();
  }else{
    await likeDelete({
      context: {
        headers: {
            authorization: user.token ? `Bearer ${user.token}` : '',
        },
    },
      variables: {
        data: {
          discussionId: route.params.id,
          userId: userInfo.id
        }
      }
    })

    await refetchLikes();
    await refetchUser();
    await refetch();
  }

  }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch().then(() => {
            setRefreshing(false);
        })
    }, []);

  useEffect(() => {
    refetchLikes()
    refetchUser()
    refetch()
  }, [refetch])
  
  return (
    <SafeAreaView style={{
      backgroundColor: '#fff',
      height: '100%',
      paddingBottom: 10
    }}>

<View style={{
                backgroundColor: '#121212',
                // height: 30,
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingTop: 5,
                paddingBottom: 10
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={25} color='#fff' />
                </TouchableOpacity>

            </View>

    <ScrollView 
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    contentContainerStyle={{
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
            }}>{data?.discussion?.user?.name?.charAt(0)}</Text>
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
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.6)',
        marginBottom: 15
      }}>{data?.discussion?.description}</Text>

      {data?.discussion?.images && (

      <Image source={{
        uri: data?.discussion.images[0]
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
        paddingHorizontal: 5,
        marginBottom: 10
      }}>
         
        <TouchableOpacity 
        
        disabled={likeDeleteLoading || likeLoading} onPress={onSubmitLike} style={{
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center'
        }}>
          <Icon name={!data?.discussion.liked? 'triangle-outline': 'triangle'} size={20} color='rgba(0,0,0,0.8)' />
          <Text style={{
            fontSize: 14,
            color: 'rgba(0,0,0,0.8)'
          }}>{dataLikes?.likes.length}</Text>
        </TouchableOpacity>
        

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7
        }}>
          <Icon name='chatbubble-outline' size={20} color="rgba(0,0,0,0.8)"  />
          <Text style={{
            fontSize: 14,
            color:'rgba(0,0,0,0.8)'
          }}>{dataComments?.comments.length}</Text>
        </View>

        <TouchableOpacity onPress={share} style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7
        }}>
          <Icon name='share-social-outline' size={25} color='rgba(0,0,0,0.8)' />
        </TouchableOpacity>
      </View> 

      <View>

        {dataComments?.comments.length == 0 ? (
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15
          }}>
            <Image source={{
              uri:'https://i.ibb.co/N6PvW1M/Screenshot-from-2023-11-02-11-46-00-removebg-preview.png'
            }} style={{
            width: 150,
            height: 150
            }} />
          <Text style={{
            color: 'rgba(0,0,0,0.5)',
            fontWeight: '500',
            fontSize: 14

          }}>Sé el primero en comentar</Text>
          </View> 

        ): (
          <>
          {dataComments?.comments.map((comment: any) => (
          <View key={comment.id} style={{
            backgroundColor: '#fff',
            padding: 10,
            marginBottom: 15,
            borderBottomWidth: 2,
            borderBottomColor: 'rgba(0,0,0,0.1)',
            paddingBottom: 20,
            paddingTop: 5,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
            }}>
                <View style={{
                    backgroundColor: 'rgba(230, 81, 0, 0.5)',
                    width: 25,
                    height: 25,
                    flexDirection: 'row',
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: 'rgba(0,0,0,0.8)'
                    }}>{comment.user.name.charAt(0)}</Text>
                </View>
                <Text style={{
                    color: 'rgba(0,0,0,0.8)',
                    fontSize: 14,
                    fontWeight: '500'
                }}>{comment.user.name.split(' ')[0]}</Text>
                <Text style={{
                    color: 'rgba(0,0,0,0.6)',
                    fontSize: 14,
                    fontWeight: '400'
                }}>{fromNow(comment.created_at)}</Text>
                
            </View>

            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
                marginTop: 5
            }}>
                <Text style={{
                  fontSize: 14,
                  color: 'rgba(0,0,0,0.6)'
                }}>{comment.text}</Text>

            </View>
        </View> 
          ))}

        </>


        )}
      </View>
    </ScrollView>
    <View style={{
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>

    <Input  value={text} onChangeText={(text) => setText(text)} placeholder='Salta a la conversacion'style={{
      marginBottom: 10,
      width: '83%'
    }} />
    <TouchableOpacity disabled={creatingLoading} onPress={onSubmit} style={{
      backgroundColor: '#5368f5',
      borderRadius: 50,
      height: 50,
      width: 50,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  }}>
    {creatingLoading ? <ActivityIndicator  color='#fff' /> : (

     <Icon name='send' size={30} color='#fff' /> 
     )}

     </TouchableOpacity>
    </View>

    </SafeAreaView>

  )
}

export default DiscussionDetails
