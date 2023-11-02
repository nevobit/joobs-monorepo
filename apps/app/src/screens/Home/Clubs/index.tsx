import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert, RefreshControl, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { CLUBS } from '../../../graphql/queries/clubs';
import { JOIN } from '../../../graphql/mutations/members';
import { useUser } from '../../../hooks/users/useUser';
import { useSelector } from 'react-redux';

const colors: string[] = [
  "rgba(94, 53, 177, 0.3)", // Rosa claro
  "rgba(0, 121, 107, 0.3)", // Lila claro
  "#E6EE9C70", // Amarillo claro
  "#C5E1A550", // Lima claro
  "#A5D6A750", // Verde claro
  "#80CBC450", // Verde menta
  "rgba(230, 81, 0, 0.3)", // Azul claro
  "rgba(96, 125, 139, 0.3)", // Turquesa claro
  "rgba(0, 96, 100, 0.3)", // Azul cielo
  "rgba(40, 53, 147, 0.3)", // Lavanda
];

const Clubs = ({ navigation }: any) => {
  const { user: userCtx } = useSelector((state: any) => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);
  const [actualId, setActualId] = React.useState('');
  const { isLoading, user, refetch: refetchUser } = useUser();

    const { data, loading, error, refetch,  } = useQuery(CLUBS, {
      context: {
        headers: {
          authorization: userCtx.token ? `Bearer ${userCtx.token}` : '',
        },
      },
    });
 
    const [join, { loading: creatingLoading, error: creatingError }] = useMutation(JOIN, {
      onCompleted: () => {
        refetchUser();
        refetch();
      },
      refetchQueries: [
          { query: CLUBS }
      ]
  })



  const onSubmit = async (id: string) => {
    setActualId(id);
    try{
      await join({
        variables: {
            data: {
                userId: user.id,
                clubId: id,
            }
        }
    })
    await refetchUser() 
    await refetch()
    }catch(e){
      Alert.alert('Error Critico', String(e));
    }
  }
    
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Promise.all([refetchUser(), refetch()]).then(() => {
      setRefreshing(false);
    });

  }, []);

  useEffect(() => {
    Promise.all([refetchUser(), refetch()]).then(() => {
      setRefreshing(false);
    });
  }, [refetchUser, refetch])

  if (creatingError) {
    Alert.alert('No te puedes unir a este club', creatingError.message);
    return;
}

    return (
    <>
      <ScrollView style={{
        paddingVertical: 10,
        height: '100%',
        marginBottom: 10
      }}>

        {loading && isLoading ? <ActivityIndicator color='#121212' size='large' /> : (


          <ScrollView style={{
            paddingHorizontal: 15,
            marginBottom: 50,
          }}
          contentContainerStyle={{
            gap: 10
          }}

          refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  /> }
          >
            {data?.clubs.map((club: any, index: number) => (
              <Pressable key={club.id} onPress={() => navigation.navigate('Club', { id: club.id })}  style={{
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
                    }}>{club.members} miembros</Text>
                    </View>
                    {!club.joined ? (

                    <TouchableOpacity onPress={() => onSubmit(club.id)} style={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        padding: 5,
                        paddingHorizontal: 20,
                        borderRadius: 50,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 14
                        }}>Unirse</Text>
                         { creatingLoading && actualId == club.id &&  <ActivityIndicator color='#fff' /> }
                    </TouchableOpacity>
                    ): (
                      <TouchableOpacity style={{
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.6)',
                        padding: 5,
                        paddingHorizontal: 20,
                        borderRadius: 50
                    }}
                    onPress={() => navigation.navigate('Club', { id: club.id })}
                    >
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            fontSize: 14
                        }}>Ver</Text>
                    </TouchableOpacity>
                    )}

</View>
                <Text numberOfLines={1} ellipsizeMode='tail' style={{
                    maxWidth: 300,
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.6)'
                }}>{club.description}</Text>
              </Pressable>
            ))}

          </ScrollView>
        )}
      </ScrollView>
    </>
  )
}

export default Clubs