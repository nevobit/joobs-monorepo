import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { WorkCard } from '../../../../components/UI'
import Icon from 'react-native-vector-icons/Ionicons'
import { useMutation, useQuery } from '@apollo/client'
import { WORKS } from '../../../../graphql/queries'
import Button from '../../../../components/Shared/Button'
import { CREATE_WORK } from '../../../../graphql/mutations/works'

const Explorer = ({navigation}: any) => {
  const { data, loading, error, refetch } = useQuery(WORKS);

  console.log("WORKS", data)
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15
      }}>
        <Text style={{
          fontSize: 16,
          color: 'rgba(0,0,0,0.8)'
        }}>Oportunidades para ti</Text>
        <View>
          <TouchableOpacity>
            <Icon name='search-outline' size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? <ActivityIndicator color='#121212' size='large' /> : (


        <ScrollView style={{
          paddingHorizontal: 15,
          marginBottom: 50
        }}>
          {data?.works?.slice().reverse().map((work: any) => (
            <Pressable key={work.id} onPress={() => navigation.navigate('WorkDetails', { id: work.id })} >
              <WorkCard remuneration={work.remuneration} created_at={work.created_at} name={work?.user?.name} title={work.title} money={1000} type={work.role} />
            </Pressable>
          ))}

        </ScrollView>
      )}

    </View>
  )
}

export default Explorer