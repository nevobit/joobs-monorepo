import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { CLUBS } from '../../../graphql/queries/clubs';

const Clubs = () => {
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

        {loading ? <ActivityIndicator color='#121212' size='large' /> : (


          <ScrollView style={{
            paddingHorizontal: 15,
            marginBottom: 50,
          }}
          contentContainerStyle={{
            gap: 10
          }}
          >
            {data?.clubs.map((club: any) => (
              <View key={club.uuid} style={{
                height: 80,
                width: '100%',
                backgroundColor: 'rgba(125, 205, 74, .3)',
                padding: 10,
                borderRadius: 10
              }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View>
                    <Text style={{
                        fontWeight: '600',
                        fontSize: 16,
                        color: 'rgba(0,0,0,0.8)'
                    }}>{club.name}</Text>
                    <Text>1810 miembros</Text>
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        padding: 5,
                        paddingHorizontal: 20,
                        borderRadius: 50
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 14
                        }}>Unirse</Text>
                    </TouchableOpacity>
                </View>
                <Text numberOfLines={1} ellipsizeMode='tail' style={{
                    maxWidth: 300,
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.8)'
                }}>{club.description}</Text>
              </View>
            ))}

          </ScrollView>
        )}
      </ScrollView>
    </>
  )
}

export default Clubs