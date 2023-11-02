import { View, Text, TouchableOpacity, ActivityIndicator, Pressable, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { WORKS } from '../../../../graphql/queries';
import { useUser } from '../../../../hooks/users/useUser';
import { WorkCard } from '../../../../components/UI';

const Listing = ({ navigation }: any) => {
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, error, refetch } = useQuery(WORKS, {
    context: {
      headers: {
        authorization: user?.token ? `Bearer ${user.token}` : '',
      },
    },
  });

  console.log(error)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
      refetch().then(() => {
        setRefreshing(false);
      })
  }, []);

  console.log("LISTING", data)
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <View style={{
      alignItems: 'center',
      paddingHorizontal: 20,
    }}>

      {loading ? <ActivityIndicator /> : (
        <>
          {data.works.length == 0 ? (
            <>
              <Text style={{
                fontWeight: '500',
                color: 'rgba(0,0,0,0.8)',
                fontSize: 16,
                marginTop: 60
              }}>
                Parece que esta vacio :/
              </Text>
              <Text style={{
                fontSize: 14,
                textAlign: 'center',
                marginTop: 5,
                marginBottom: 10,
                color: 'rgba(0, 0, 0, 0.6)'
              }}>No dejes este espacio solo. Crea una oferta de trabajo y atrae candidadtos fabulosos en poco tiempo!</Text>

              <TouchableOpacity style={{
                backgroundColor: '#5368f5',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20
              }}
                onPress={() => navigation.navigate('CreateWork')}
              >
                <Text style={{
                  color: '#fff',
                  fontSize: 14
                }}>Crear Publicacion</Text>
              </TouchableOpacity>
            </>
          ) : (
            <ScrollView style={{
              marginTop: 10,
              width: '100%',
            }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
              {data.works.map((work: any) => (
                <Pressable style={{
                  width: '100%'
                }} key={work.id} onPress={() => navigation.navigate('WorkDetails', { id: work.id })} >
                  <WorkCard role={work.role} remuneration={work.remuneration} created_at={work.created_at} user={work?.user} title={work.title}  />
                </Pressable>
              ))}
            </ScrollView>
          )}
        </>
      )}


    </View>
  )
}

export default Listing