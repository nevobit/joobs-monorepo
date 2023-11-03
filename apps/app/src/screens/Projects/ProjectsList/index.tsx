import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Pressable, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { CLUBS } from '../../../graphql/queries/clubs';
import { ProjectCard } from '../../../components/UI';
import { PROJECTS } from '../../../graphql/queries/projects';

const ProjectsList = ({navigation}: any) => {
  const [refreshing, setRefreshing] = useState(false);  
  const { data, loading, error, refetch } = useQuery(PROJECTS);


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch().then(() => {
          setRefreshing(false);
        })
    }, [])

    useEffect(() => {
      refetch()
    }, [refetch]);


    return (
    <>
      <ScrollView contentContainerStyle={{
        paddingVertical: 10,
        height: '100%',
        marginBottom: 10,
        paddingHorizontal: 15
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >

      {/* <Text style={{
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        color: 'rgba(0,0,0,0.8)'
      }} >No hay Proyectos</Text> */}

      {data?.projects.map((project: any) => (
      <Pressable key={project.id} onPress={() => navigation.navigate('ProjectDetails', { id: project.id })}>
        <ProjectCard {...project} />
      </Pressable>
      ))}

</ScrollView>
    </>
  )
}

export default ProjectsList