import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View as DefaultView,
  Alert,
} from 'react-native';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';
import {useUser} from '../../../hooks/users/useUser';
import {BottomSheet} from '../../../containers';
import Button from '../../../components/Shared/Button';
import Field from '../../../components/Shared/Field';
import Input from '../../../components/Shared/Input';
import Textarea from '../../../components/Shared/Textarea';
// import BottomSheet from '@gorhom/bottom-sheet';
import Geolocation from '@react-native-community/geolocation';
import {View} from '../../../components/Shared/View';
import Skill from '../../../components/UI/Skill';
import { useConnect, useConnections, useIsConnected, useIsRequest, useReject } from '../../../hooks';

const UserProfile = ({navigation, route}: any) => {
  const [reported, setReported] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [profileOptions, setProfileOptions] = useState(false);

  const {isLoading, user, refetch, error} = useUser(route.params.id);
  const [location, setLocation] = useState({
    country: '',
    city: '',
  });

  const { isCreating, connect } = useConnect(route.params.id);
  const { isLoading: isLoadingRequest, isRequest, refetch: refetchRequest } = useIsRequest(route.params.id);
  const { isLoading: isLoadingConnected, isConnected } = useIsConnected(route.params.id);
  const { isLoading: isLoadingConnections, connections } = useConnections(route.params.id);
  const { isRejected, reject } = useReject(route.params.id);




  console.log("Request", isConnected)

  const opening = () => {
    setProfileOptions(false);  
    setReported(true)
  }

  const blocking = () => {
    Alert.alert("Bloquear usuario", "Usuario bloqueado con exito");
    navigation.navigate("Home");
  }

  const share = async () => {
    const options = {
      message: `Hey, mira el perfil de ${user.name.split(" ")[0]} En Joobs`,
      url: 'https://joobs.lat',
    };

    try {
      await Share.open(options);
    } catch (error) {
      console.error(error);
      // Alert.alert('Error al compartir', 'No se puede compartir en este momento. Inténtalo de nuevo más tarde.');
    }
  };

  const getLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          // const { latitude, longitude } = position.coords;
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${user?.location?.latitude},${user?.location?.longitude}&key=AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg`,
          )
            .then(response => response.json())
            .then(responseJson => {
              const addressComponents =
                responseJson?.results[0]?.address_components;
              let country = '';
              let city = '';
              for (let component of addressComponents) {
                if (component.types.includes('country')) {
                  country = component?.long_name;
                }
                if (
                  component?.types?.includes('locality') ||
                  component?.types?.includes('administrative_area_level_1')
                ) {
                  city = component.long_name;
                }
              }
              setLocation({country, city});
              return {country, city};
            })
            .catch(error => {
              console.error(error);
              // setError('Error fetching data');
            });
        },
        // (error) => setError(error.message),
        // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLocation();
  }, [isLoading]);

  useEffect(() => {
    refetch();
  }, [refetch]);


  const handleReject = async () => {
    await reject();
    refetchRequest();
  }

  const handleConnect = async () => {
    await connect();
    refetchRequest();
  }

  useEffect(() => {
    refetchRequest();
  }, [refetchRequest]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    });
  }, []);

  if (error) {
    return (
      <DefaultView
        style={{
          minHeight: '100%',
        }}>
        <Text
          style={{
            color: '#121212',
            textAlign: 'center',
          }}>
          Algo salio mal, intentalo mas tarde
        </Text>
      </DefaultView>
    );
  }

  return (
    <View>
      <ScrollView
        style={{
          height: '100%',
          marginBottom: 10,
          backgroundColor: '#f0f0f0',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoading ? (
          <ActivityIndicator
            color="#000"
            style={{
              marginTop: 15,
            }}
            size="large"
          />
        ) : (
          <Pressable>
            <DefaultView
              style={{
                backgroundColor: '#121212',
                padding: 10,
                paddingBottom: 5,
              }}>
              <StatusBar backgroundColor={'#121212'} barStyle="light-content" />
              <DefaultView
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  
                <DefaultView
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                         <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='chevron-back' size={25} color='#fff' />
            </TouchableOpacity>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: '600',
                    }}>{`@${user.email.split('@')[0]}`}</Text>
                </DefaultView>

                <DefaultView
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                  }}>
                      <TouchableOpacity onPress={share} style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
      }}>
          <Icon name="share-social-outline" size={23} color="#fff" />
        </TouchableOpacity>
                  <TouchableOpacity onPress={() => setProfileOptions(true)}>
                    <Icon
                      name="ellipsis-vertical-sharp"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </DefaultView>
              </DefaultView>
            </DefaultView>
            <DefaultView
              style={{
                backgroundColor: '#121212',
                height: 270,
                paddingHorizontal: 15,
                borderBottomEndRadius: 15,
                borderBottomStartRadius: 15,
              }}>
              <DefaultView
                style={{
                  position: 'relative',
                  backgroundColor: '#474747',
                  height: 210,
                  borderRadius: 10,
                  marginTop: 40,
                }}>
                {user?.photo ? (
                  <Image
                    source={{
                      uri: user.photo,
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 50,
                      overflow: 'hidden',
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      borderWidth: 4,
                      borderColor: '#474747',
                      position: 'absolute',
                      top: -25,
                      left: 15,
                    }}
                  />
                ) : (
                  <DefaultView
                    style={{
                      height: 70,
                      width: 70,
                      backgroundColor: '#5368f5',
                      borderRadius: 50,
                      position: 'absolute',
                      top: -25,
                      left: 15,
                      borderWidth: 4,
                      borderColor: '#474747',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 40,
                        fontWeight: '400',
                        color: '#fff',
                      }}>
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </Text>
                  </DefaultView>
                )}
                <Text
                  style={{
                    marginTop: 50,
                    marginLeft: 10,
                    fontSize: 16,
                    fontWeight: "500",
                    color: '#fff',
                  }}>
                  {user?.name}
                </Text>

                {user?.headline && (
                  <Text
                  lineBreakMode="tail"
                  numberOfLines={2}
                    style={{
                      marginTop: 10,
                      marginLeft: 10,
                      fontSize: 13,
                      color: '#fff',
                    }}>
                    {user?.headline}
                  </Text>
                )}

                <Text
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    fontSize: 14,
                    color: '#fff',
                  }}>
                  {connections} conexiones
                </Text>
                <DefaultView style={{
                  paddingHorizontal: 10
                }}>
                  {isRequest ? (
                    <TouchableOpacity onPress={handleReject}  style={{
                      height: 40,
                      marginTop: 15
                    }} > 
                      <Text style={{
                        textAlign: "center",
                        fontWeight: "500",
                        color: "#5368f5"
                      }}>Cancelar solicitud</Text> 
                    </TouchableOpacity>
                  ): (
                    <>
                      {isConnected ? <></> : (

                    <Button loading={isCreating} onPress={handleConnect} text='Conectar' />

                      )}
                    </>

                  )}
              </DefaultView>
              </DefaultView>
              
            </DefaultView>
            <DefaultView
              style={{
                paddingHorizontal: 15,
                paddingBottom: 20,
              }}>
              <DefaultView
                style={{
                  marginTop: 20,
                }}>
                <DefaultView
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: 'rgba(0,0,0,0.8)',
                      fontSize: 16,
                    }}>
                    Sobre {user?.name.split(" ")[0]}
                  </Text>
                </DefaultView>

                <DefaultView
                  style={{
                    marginTop: 15,
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  {user?.about && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.8)',
                        marginBottom: 10,
                      }}>
                      {user?.about}
                    </Text>
                  )}
                  <Text
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {user?.location?.latitude > 0 && (
                      <DefaultView
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text>
                          <Icon
                            name="location-outline"
                            color="rgba(0,0,0,0.8)"
                            size={24}
                          />
                        </Text>
                        <Text
                          style={{
                            fontWeight: '400',
                            color: 'rgba(0,0,0,0.8)',
                          }}>
                          {location?.city}, {location?.country}
                        </Text>
                      </DefaultView>
                    )}
                  </Text>
                  {user?.college && (
                    <DefaultView style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 15
                    }}>
                      <Icon name='school-outline' size={23} color="#121212" />
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.8)',
                      }}>
                      {user?.college}
                    </Text>
                    </DefaultView>

                  )}

                </DefaultView>
              </DefaultView>

              {/* SKILLS */}
              <DefaultView
                style={{
                  marginTop: 20,
                }}>
                <DefaultView
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: 'rgba(0,0,0,0.8)',
                      fontSize: 16,
                    }}>
                    Habilidades
                  </Text>
                </DefaultView>

                <DefaultView
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 10,
                    gap: 10
                  }}>
                  {user?.skills?.map((skill: string) => (
                    <Skill key={skill} skill={skill} />
                  ))}
                </DefaultView>
              </DefaultView>

    
            </DefaultView>
          </Pressable>
        )}
      </ScrollView>

      <>
       
    <BottomSheet isVisible={profileOptions} setIsVisible={() => setProfileOptions(!profileOptions)}>
     
    <TouchableOpacity style={{
      height: 40,
      justifyContent: "center"
     }} onPress={blocking}>
       <Text style={{
         textAlign: 'center',
         color: 'rgba(0,0,0,0.8)',
         fontSize: 14
       }}>Bloquear</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{
      height: 40,
      justifyContent: "center"
     }} onPress={opening}>
       <Text style={{
         textAlign: 'center',
         color: 'rgba(0,0,0,0.8)',
         fontSize: 14
       }}>Reportar</Text>
     </TouchableOpacity>
   </BottomSheet>

   <BottomSheet isVisible={reported} setIsVisible={() => setReported(!reported)}>
       <Text style={{
         textAlign: "center",
         fontSize: 16,
         fontWeight: "600"
       }} >Reporte</Text>
       <Text style={{
         textAlign: "center",
         fontSize: 12,
         marginBottom: 20
       }} >Ayúdanos a entender lo que está pasando y lo investigaremos.</Text>

       <DefaultView style={{
         width: 50,
         height: 50,
         borderRadius: 100,
         backgroundColor: "#5368f5",
         alignItems: "center",
         justifyContent: "center",
         alignSelf: "center",
         marginBottom: 10
       }}>
         <Icon name='checkmark-outline' size={30} color="#fff" style={{
           zIndex: 9999
         }} />
       </DefaultView>
       <Text style={{
         textAlign: "center",
         fontSize: 16,
         fontWeight: "600"
       }} >Gracias por hacernos saber</Text>
       <Text style={{
         textAlign: "center",
         fontSize: 12,
         marginBottom: 20
       }} >Tus comentarios son importantes para ayudarnos a mantener la comunidad Joobs segura y de calidad.</Text>
       <Button text='Listo' onPress={() => setReported(false)} />
</BottomSheet>
      </>
    </View>
  );
};

export default UserProfile;
