import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { HomePost } from '../../../components/UI'
import Icon from 'react-native-vector-icons/Ionicons'
import { useQuery } from '@apollo/client'
import { DISCUSSIONS } from '../../../graphql/queries'

const Discussions = ({ navigation }: any) => {
  const { data, loading, error, refetch } = useQuery(DISCUSSIONS);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
      refetch().then(() => {
        setRefreshing(false);
      })
  }, []);

  useEffect(() => {
    refetch()
  }, [refetch])
  return (
    <>
      <ScrollView style={{
        paddingVertical: 10,
        height: '100%',
        marginBottom: 10
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      
      >

        {loading ? <ActivityIndicator color='#121212' size='large' /> : (


          <ScrollView style={{
            paddingHorizontal: 15,
            marginBottom: 50
          }}
          >
            {data?.discussions?.slice().reverse().map((discussion: any) => (
              <HomePost key={discussion.id} photo={discussion?.user?.photo} title={discussion.title} image={discussion?.images} text={discussion.description} created_at={discussion.created_at} name={discussion.user.name} type='Placements Club' />
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