import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { CLUBS } from '../../../graphql/queries/clubs';

const ProjectsList = () => {
    const { data, loading, error, refetch } = useQuery(CLUBS);

    useEffect(() => {
      refetch()
    }, [refetch]);


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
        marginTop: 20
      }} >No hay Proyectos</Text>
      </ScrollView>
    </>
  )
}

export default ProjectsList