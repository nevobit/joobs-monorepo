import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { CLUBS } from '../../../graphql/queries/clubs';


const colors: string[] = [
  "rgba(94, 53, 177, 0.5)", // Rosa claro
  "rgba(0, 121, 107, 0.5)", // Lila claro
  "rgba(40, 53, 147, 0.5)", // Lavanda
  "rgba(230, 81, 0, 0.5)", // Azul claro
  "rgba(0, 96, 100, 0.5)", // Azul cielo
  "rgba(96, 125, 139, 0.5)", // Turquesa claro
  "#80CBC4", // Verde menta
  "#A5D6A7", // Verde claro
  "#C5E1A5", // Lima claro
  "#E6EE9C", // Amarillo claro
];

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
            {data?.clubs.map((club: any, index: number) => (
              <View key={club.id} style={{
                height: 85,
                width: '100%',
                backgroundColor: colors[index],
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
                    <Text style={{
                      color: 'rgba(0,0,0,0.8)',
                      marginBottom: 5
                    }}>1810 miembros</Text>
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
                    color: 'rgba(0,0,0,0.6)'
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