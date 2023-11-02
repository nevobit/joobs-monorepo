import { TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { HomePost } from '../../../components/UI'
import Icon from 'react-native-vector-icons/Ionicons'
import { useQuery } from '@apollo/client'
import { DISCUSSIONS } from '../../../graphql/queries'
import { useSelector } from 'react-redux'

const Discussions = ({ navigation, search }: any) => {
  const { user } = useSelector((state: any) => state.auth);

  const { data, loading, error, refetch } = useQuery(DISCUSSIONS, {
    context: {
      headers: {
          authorization: user.token ? `Bearer ${user.token}` : '',
      },
  },
  });


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
      refetch().then(() => {
        setRefreshing(false);
      })
  }, []);

  console.log(data)

  useEffect(() => {
    refetch()
  }, [refetch])
  return (
    <>
      <ScrollView style={{
        paddingVertical: 15,
        height: '100%',
        marginBottom: 10
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      
      >

        {loading ? <ActivityIndicator color='#121212' size='large' /> : (


          <ScrollView style={{
            marginBottom: 50
          }}
          >
            {data?.discussions?.slice().reverse().filter((disscusion: any) => disscusion.title?.toLowerCase().includes(search?.toLowerCase() || '')).map((discussion: any) => (
              <Pressable key={discussion.id} onPress={() => navigation.navigate('Discussion', { id: discussion.id })} > 
                <HomePost refetch={refetch} discussionId={discussion.id} liked={discussion.liked} likes={discussion.likes} comments={discussion.comments} photo={discussion?.user?.photo} title={discussion.title} image={discussion?.images} text={discussion.description} created_at={discussion.created_at} name={discussion.user.name} type='Placements Club' />
              </Pressable>
            ))}

          </ScrollView>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreatePost')}
        style={{
          position: 'absolute',
          backgroundColor: '#5169f6',
          height: 50,
          width: 50,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 25,
          right: 15,
        }}>
        <Icon name='pencil' size={22} color='#fff' />
      </TouchableOpacity>
    </>
  )
}

export default Discussions