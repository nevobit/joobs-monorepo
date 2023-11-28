import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Pressable, RefreshControl, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WorkCard } from '../../../../components/UI'
import Icon from 'react-native-vector-icons/Ionicons'
import { useMutation, useQuery } from '@apollo/client'
import { WORKS } from '../../../../graphql/queries'
import Button from '../../../../components/Shared/Button'
import { CREATE_WORK } from '../../../../graphql/mutations/works'
import {  Instagram, List, Facebook } from 'react-content-loader/native'

const Explorer = ({navigation}: any) => {
  const { data, loading, error, refetch } = useQuery(WORKS);
  const [refreshing, setRefreshing] = React.useState(false);
  const [show, setShow] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
      refetch().then(() => {
        setRefreshing(false);
      });
  }, []);

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
          <TouchableOpacity onPress={() => setShow(true)}>
            <Icon name='search-outline' size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
        {show && (

        <View style={{
          paddingHorizontal: 15,
          marginBottom: 15
        }}>

      <View style={{
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 10,
        height: 40
      }}>
        <Icon name='search-outline' size={24} color="#000" />
        <TextInput placeholder='Buscar Oportunidades' style={{
          width: '80%',
          fontSize: 14,
          color: 'rgba(0,0,0,0.8)'
        }} />
        <TouchableOpacity onPress={() => setShow(false)}>
          <Icon name='close-outline' size={24} color="#000" />
        </TouchableOpacity>
      </View>
      </View>
        )}

      {loading ? 
      <View style={{
        paddingHorizontal: 15,
        gap: 10
      }}>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 5
        }}>
          <Facebook   /> 
        </View>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 5
        }}>
          <Facebook   /> 
        </View>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 5
        }}>
          <Facebook   /> 
        </View>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 5
        }}>
          <Facebook   /> 
        </View>

      </View>
      
      : (


        <FlatList 
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 50
        }}
          data={data.works.slice().reverse()}
          renderItem={( { item } ) => 
          <Pressable key={item.id} onPress={() => navigation.navigate('WorkDetails', { id: item.id })}>
              <WorkCard {...item} />
          </Pressable>  
        }
          keyExtractor={(item) =>  item.id}
          onEndReached={() => console.log('Cargando data')}
          onEndReachedThreshold={0.5}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

        />
      )}

    </View>
  )
}

export default Explorer