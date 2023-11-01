import { View, Text, TouchableOpacity, FlatList, Pressable, RefreshControl, ActivityIndicator } from 'react-native'
import React from 'react'
import { useQuery } from '@apollo/client'
import { APPLICATIONS } from '../../../../graphql/queries/applications'
import { WorkCard } from '../../../../components/UI'
import { useSelector } from 'react-redux'

const Applications = ({navigation}: any) => {
  const { user } = useSelector((state: any) => state.auth);

  const { data, loading, error, refetch } = useQuery(APPLICATIONS, {
    context: {
      headers: {
        Authorization: user.token ? `Bearer ${user.token}` : '',
      }
    }
  })


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
      refetch().then(() => {
        setRefreshing(false);
      });
  }, []);

  return (
    <View style={{
      alignItems: 'center',
      paddingHorizontal: 20
    }}>
      {data?.applications?.length < 1 && (
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
      }}>Aun no has aplicado a ninguna oportunidad. Aplica a una oferta de trabajo y he impresiona a todos con tus fabulosas habilidades!</Text>

      <TouchableOpacity style={{
        backgroundColor: '#5368f5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
      }}
      onPress={() => navigation.navigate('Work')}
      >
        <Text style={{
          color: '#fff',
          fontSize: 14
        }}>Explorar</Text>
      </TouchableOpacity>
      </>
      )}


      {loading ? <ActivityIndicator color='#121212' size='large' /> : (

<View style={{
  width: '100%',
  marginTop: 15
}}>
<FlatList 
contentContainerStyle={{
  marginBottom: 50
}}
  data={data.applications}
  renderItem={( { item } ) => 
  <Pressable key={item.id} onPress={() => navigation.navigate('WorkDetails', { id: item.id })}>
      <WorkCard {...item.work} />
  </Pressable>  

}
  keyExtractor={(item) =>  item.id}
  onEndReached={() => console.log('Cargando data')}
  onEndReachedThreshold={0.5}
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

/>
</View>
)}
    </View>
  )
}

export default Applications