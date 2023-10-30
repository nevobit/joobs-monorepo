import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { HomePost } from '../../../components/UI'
import Icon from 'react-native-vector-icons/Ionicons'
import { useQuery } from '@apollo/client'
import { DISCUSSIONS } from '../../../graphql/queries'

const Discussions = ({ navigation }: any) => {
  const { data, loading, error, refetch } = useQuery(DISCUSSIONS);

  console.log(data)
  console.log(loading)

  useEffect(() => {
    refetch()
  }, [refetch])
  return (
    <>
      <ScrollView style={{
        paddingVertical: 10,
        height: '100%',
        marginBottom: 10
      }}>

        {loading ? <ActivityIndicator color='#121212' size='large' /> : (


          <ScrollView style={{
            paddingHorizontal: 15,
            marginBottom: 50
          }}>
            {data.discussions.map((discussion: any) => (
              <HomePost title={discussion.title} text={discussion.description} name={discussion.user.name} type='Placements Club' />
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