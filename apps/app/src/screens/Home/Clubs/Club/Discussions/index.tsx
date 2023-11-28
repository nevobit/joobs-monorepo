import { View as DefaultView, Pressable, ScrollView, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDiscussions, useMembersClubs } from '../../../../../hooks'
import { HomePost } from '../../../../../components/UI';
import Icon from 'react-native-vector-icons/Ionicons';

const DiscussionsClub = ({navigation, id}: { navigation: any, id: string }) => {
    const { discussions, isLoading, refetch } = useDiscussions();

    return (
      <>
        
      
        <ScrollView contentContainerStyle={{
            marginBottom: 50
          }}
          >
            {discussions?.slice().reverse().filter((disscusion: any) => disscusion.club.id == id).map((discussion: any) => (
              <Pressable key={discussion.id} onPress={() => navigation.navigate('Discussion', { id: discussion.id })} >
                <HomePost navigation={navigation} id={discussion.user.id} refetch={refetch} discussionId={discussion.id} liked={discussion.liked} likes={discussion.likes} comments={discussion.comments} photo={discussion?.user?.photo} title={discussion.title} image={discussion?.images} text={discussion.description} created_at={discussion.created_at} name={discussion.user.name} type={discussion.club.name} />
              </Pressable>
            ))}

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

export default DiscussionsClub