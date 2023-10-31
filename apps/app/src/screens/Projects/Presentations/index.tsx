import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { HomePost } from '../../../components/UI'
import Icon from 'react-native-vector-icons/Ionicons'
import { useQuery } from '@apollo/client'
import { DISCUSSIONS } from '../../../graphql/queries'

const Presentations = ({ navigation }: any) => {
  const { data, loading, error, refetch } = useQuery(DISCUSSIONS);

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
  <Text style={{
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        color: 'rgba(0,0,0,0.8)'
      }} >No hay Presentaciones</Text>
       
      </ScrollView>
    
    </>
  )
}

export default Presentations