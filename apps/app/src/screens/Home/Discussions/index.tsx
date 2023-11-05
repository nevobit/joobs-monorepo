import { TouchableOpacity, ScrollView, RefreshControl, Pressable, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { HomePost } from '../../../components/UI'
import Icon from 'react-native-vector-icons/Ionicons'
import { Instagram } from 'react-content-loader/native'
import { useDiscussions } from '../../../hooks'
import styles from './styles'

const Discussions = ({ navigation, search }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const { discussions, isLoading, error, refetch } = useDiscussions();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    })
  }, []);

  return (
    <>
      <ScrollView style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {isLoading ?
          <View style={{
            flex: 1,
            gap: 10
          }}>
            {['1','2','3'].map((v, i) => <Instagram key={v} backgroundColor='#fff' />)}
          </View>
          : (
            <ScrollView style={{
              marginBottom: 50
            }}
            >
              {discussions?.slice().reverse().filter((disscusion: any) => disscusion.title?.toLowerCase().includes(search?.toLowerCase() || '')).map((discussion: any) => (
                <Pressable key={discussion.id} onPress={() => navigation.navigate('Discussion', { id: discussion.id })} >
                  <HomePost refetch={refetch} discussionId={discussion.id} liked={discussion.liked} likes={discussion.likes} comments={discussion.comments} photo={discussion?.user?.photo} title={discussion.title} image={discussion?.images} text={discussion.description} created_at={discussion.created_at} name={discussion.user.name} type='Placements Club' />
                </Pressable>
              ))}

            </ScrollView>
          )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreatePost')}
        style={styles.button}>
        <Icon name='pencil' size={22} color='#fff' />
      </TouchableOpacity>
    </>
  )
}

export default Discussions