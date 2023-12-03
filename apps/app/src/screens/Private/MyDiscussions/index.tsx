import { TouchableOpacity, ScrollView, RefreshControl, Pressable, View as DefaultView, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { HomePost } from '../../../components/UI'
import Icon from 'react-native-vector-icons/Ionicons'
import { Instagram } from 'react-content-loader/native'
import { useDiscussions, useMyDiscussions } from '../../../hooks'
import styles from './styles'
import { View } from '../../../components/Shared/View'
import Header from '../../../components/Layout/Header'

const MyDiscussions = ({ navigation, search }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const { discussions, isLoading, error, refetch } = useMyDiscussions();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    })
  }, []);

  return (
    <View >
        <DefaultView style={{
            backgroundColor: '#121212',
            height: 30,
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='chevron-back' size={25} color='#fff' />
            </TouchableOpacity>
            <Text style={{
                fontSize: 20,
                color: '#fff',
            }}>Mis Discusiones</Text>

        </DefaultView>
        <DefaultView style={{
          backgroundColor: "#121212",
          height: 10,
          width: "100%"
        }} />
      <ScrollView contentContainerStyle={{
        backgroundColor: "#f0f0f0",
      }} style={styles.container}
        refreshControl={<RefreshControl tintColor="#fff" refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <DefaultView style={{
          backgroundColor: 'rgba(255,255,255,1)',
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
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
            }}>Todas</Text>
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
            }}>Creadas por mi</Text>
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
            }}>Participaciones</Text>
          </TouchableOpacity>
        </DefaultView>
        {isLoading ?
          <DefaultView style={{
            flex: 1,
            gap: 10
          }}>
            {['1','2','3'].map((v, i) => <Instagram key={v} backgroundColor='#fff' />)}
          </DefaultView>
          : (
            <ScrollView style={{
              marginBottom: 50
            }}
            >
              {discussions?.slice().reverse().filter((disscusion: any) => disscusion.title?.toLowerCase().includes(search?.toLowerCase() || '')).map((discussion: any) => (
                <Pressable key={discussion.id} onPress={() => navigation.navigate('Discussion', { id: discussion.id })} >
                  <HomePost navigation={navigation} id={discussion.user.id} refetch={refetch} discussionId={discussion.id} disliked={discussion.disliked} liked={discussion.liked} likes={discussion.likes} comments={discussion.comments} photo={discussion?.user?.photo} title={discussion.title} image={discussion?.images} text={discussion.description} created_at={discussion.created_at} name={discussion.user.name} type={discussion.club.name} />
                </Pressable>
              ))}

            </ScrollView>
          )}
      </ScrollView>

    </View>
  )
}

export default MyDiscussions