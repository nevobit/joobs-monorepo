import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { WorkCard } from '../../../../components/UI'
import Icon from 'react-native-vector-icons/Ionicons'
import { useMutation, useQuery } from '@apollo/client'
import { WORKS } from '../../../../graphql/queries'
import Button from '../../../../components/Shared/Button'
import { CREATE_WORK } from '../../../../graphql/mutations/works'

const Explorer = () => {
  const { data, loading, error, refetch } = useQuery(WORKS);
  

  useEffect(() => {
    refetch();
  }, [refetch])
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

        {loading? <ActivityIndicator color='#121212' size='large' /> : (
          

        <ScrollView style={{
          paddingHorizontal: 15,
          marginBottom: 50
        }}>
          {data.works.map((work: any) => (
            <WorkCard key={work.uuid} name='Andres Rendon' title={work.title} money={1000} type={work.role} />
          ))}

        </ScrollView>
                )}

<View style={{
  paddingHorizontal: 15
}}>

                <Button text='Crear Oportunidad'  />
                </View>

    </View>
  )
}

export default Explorer