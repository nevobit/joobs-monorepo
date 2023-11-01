import { View, Text, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { WORKS } from '../../../../graphql/queries';
import { useUser } from '../../../../hooks/users/useUser';
import { WorkCard } from '../../../../components/UI';

const Listing = ({ navigation }: any) => {
  const { user } = useUser();
  const { data, loading, error, refetch } = useQuery(WORKS, {
    context: {
      headers: {
        authorization: user?.token ? `Bearer ${user.token}` : '',
      },
    },
  });

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
            <View style={{
              marginTop: 10,
              width: '100%',
            }}>
              {data.works.map((work: any) => (
                <Pressable style={{
                  width: '100%'
                }} key={work.id} onPress={() => navigation.navigate('WorkDetails', { id: work.id })} >
                  <WorkCard role={work.role} remuneration={work.remuneration} created_at={work.created_at} user={work?.user} title={work.title}  />
                </Pressable>
              ))}
            </View>
          )}
        </>
      )}


    </View>
  )
}

export default Listing