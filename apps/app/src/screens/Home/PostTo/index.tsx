import {useMutation} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View as DefaultView,
  ScrollView,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CREATE_DISCUSSION} from '../../../graphql/mutations/discussions';
import {useSelector} from 'react-redux';
import {useClubs, useUploadImage} from '../../../hooks';
import {DISCUSSIONS} from '../../../graphql/queries';
import {View} from '../../../components/Shared/View';
const colors: string[] = [
    'rgba(94, 53, 177, 0.3)', // Rosa claro
    'rgba(0, 121, 107, 0.3)', // Lila claro
    '#E6EE9C70', // Amarillo claro
    '#C5E1A550', // Lima claro
    '#A5D6A750', // Verde claro
    '#80CBC450', // Verde menta
    'rgba(230, 81, 0, 0.3)', // Azul claro
    'rgba(96, 125, 139, 0.3)', // Turquesa claro
    'rgba(0, 96, 100, 0.3)', // Azul cielo
    'rgba(40, 53, 147, 0.3)', // Lavanda
    '#E6EE9C70', // Amarillo claro
    '#C5E1A550', // Lima claro
    '#A5D6A750', // Verde claro
  ];

const PostTo = ({navigation, route}: any) => {
  const {user} = useSelector((state: any) => state.auth);
  const { isLoading, clubs } = useClubs();
    const [ search, setSearch ] = useState("");
    const [ clubId, setClubId ] = useState("");

  console.log(route.params.post);
  const [createDiscussion, {loading: isCreating, error: creatingError}] =
    useMutation(CREATE_DISCUSSION, {
      refetchQueries: [{query: DISCUSSIONS}],
    });
  if (creatingError) {
    Alert.alert('No se pudo crear la publicacion', creatingError.message);
    return;
  }

  const onSubmit = async () => {
    if (route.params.post.title.length > 1) {
      await createDiscussion({
        variables: {
          data: {
            title: route.params.post.title,
            description: route.params.post.description,
            images: route.params.post.images,
            clubId
          },
        },
        context: {
          headers: {
            authorization: user.token ? `Bearer ${user.token}` : '',
          },
        },
      });
      navigation.navigate('Home');
    }
  };

  return (
    <View>
      <DefaultView
        style={{
          backgroundColor: '#121212',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}>
        <DefaultView
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
            <Icon name="chevron-back" size={25} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 3,
            }}>
            Publicar en
          </Text>
        </DefaultView>
        <TouchableOpacity>
          <Icon
            size={25}
            color="rgba(255,255, 255, .6)"
            name="information-circle"
          />
        </TouchableOpacity>
      </DefaultView>
      <DefaultView
        style={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          flex: 1,
          paddingBottom: 25,
          backgroundColor: '#f0f0f0',
        }}>
        <DefaultView
          style={{
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: 40,
            height: 40,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 10,
          }}>
          <Icon name="search-outline" size={22} />
          <TextInput
            style={{
              height: 40,
              width: '90%',
              color: "#000"
            }}
            onChangeText={(text) => setSearch(text)}
            placeholder="Buscar clubs. ej: Finanzas, Startup, etc."
          />
        </DefaultView>
        <Text style={{
            color: "#000",
            marginTop: 20 
        }}>Selecciona a qué club se dirige esta discusión:</Text>
        {isLoading ? (
          <ActivityIndicator color="#121212" size="large" />
        ) : (
          <ScrollView
            style={{
              marginBottom: 50,
              marginTop: 15
            }}
            contentContainerStyle={{
              gap: 10,
            }}
           >
            {clubs?.filter((club: any) => club.name.toLowerCase().includes(search.toLowerCase())).map((club: any, index: number) => (
                <TouchableOpacity onPress={() => setClubId(club.id)} key={club.id} style={{
                    backgroundColor: colors[index],
                    height: 55,
                    borderRadius: 10,
                    padding: 10,
                    justifyContent: "center",
                    paddingHorizontal: 15,
                    borderWidth: 1,
                    borderColor: clubId == club.id ? "#000" : "#f2f2f2"
                }}>
                    <Text style={{
                        fontWeight: "500",
                        fontSize: 16
                    }}>{club.name}</Text>
                </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <DefaultView
          style={{
            marginTop: 'auto',
          }}>
            {clubId.length > 0 && (

          <TouchableOpacity
            style={{
              backgroundColor: '#5169f6',
              borderRadius: 50,
              height: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onSubmit}>
            {isCreating ? (
              <ActivityIndicator />
            ) : (
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                }}>
                Siguiente
              </Text>
            )}
          </TouchableOpacity>
            )}

        </DefaultView>
      </DefaultView>
    </View>
  );
};

export default PostTo;
