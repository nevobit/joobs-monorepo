import { TouchableOpacity, ScrollView, RefreshControl, Pressable, View as DefaultView, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { HomePost } from '../../../components/UI'
import Icon from 'react-native-vector-icons/Ionicons'
import { Instagram } from 'react-content-loader/native'
import { useDiscussions } from '../../../hooks'
import styles from './styles'
import { View } from '../../../components/Shared/View'

const Discussions = ({ navigation, search }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const { discussions, isLoading, error, refetch } = useDiscussions();

  console.log(discussions)
  console.log(error)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    })
  }, []);

  return (
    <View  >
      <ScrollView contentContainerStyle={{
        backgroundColor: "#f0f0f0",
        marginBottom: 10
      }} style={styles.container}
        refreshControl={<RefreshControl tintColor="#fff" refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <DefaultView style={{
          backgroundColor: 'rgba(255,255,255,1)',
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
          height: 50,
          paddingHorizontal: 15,
          paddingTop: 10
        }}>
          <TouchableOpacity style={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 50
          }}>
            <Text style={{
              color: 'rgba(0,0,0,0.8)',
              fontWeight: '400',
              fontSize: 13
            }}>Para ti</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 50
          }}>
            <Text style={{
              color: 'rgba(0,0,0,0.8)',
              fontWeight: '400',
              fontSize: 13
            }}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 50
          }}>
            <Text style={{
              color: 'rgba(0,0,0,0.8)',
              fontWeight: '400',
              fontSize: 13
            }}>Lo último</Text>
          </TouchableOpacity>
        </DefaultView>
        {isLoading ?
          <DefaultView style={{
            flex: 1,
            gap: 10
          }}>
            {['1','2','3'].map((v) => <Instagram key={v} backgroundColor='#fff' />)}
          </DefaultView>
          : (
            <ScrollView style={{
              marginBottom: 50
            }}
            >
              {discussions?.slice().reverse().filter((disscusion: any) => disscusion.title?.toLowerCase().includes(search?.toLowerCase() || '')).map((discussion: any) => (
                <Pressable key={discussion.id} onPress={() => navigation.navigate('Discussion', { id: discussion.id })} >
                  <HomePost navigation={navigation} id={discussion.user.id} refetch={refetch} discussionId={discussion.id} liked={discussion.liked} disliked={discussion.disliked} likes={discussion.likes} comments={discussion.comments} photo={discussion?.user?.photo} title={discussion.title} image={discussion?.images} text={discussion.description} created_at={discussion.created_at} name={discussion.user.name} type={discussion.club.name} />
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
    </View>
  )
}

export default Discussions