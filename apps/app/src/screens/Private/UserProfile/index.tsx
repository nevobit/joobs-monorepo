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
} from 'react-native';
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

const UserProfile = ({navigation, route}: any) => {
  const [editProfile, setEditProfile] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [profileOptions, setProfileOptions] = useState(false);

  const {isLoading, user, refetch, error} = useUser(route.params.id);
  const [location, setLocation] = useState({
    country: '',
    city: '',
  });

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
              console.log({responseJson});
              const addressComponents =
                responseJson.results[0].address_components;
              let country = '';
              let city = '';
              for (let component of addressComponents) {
                if (component.types.includes('country')) {
                  country = component.long_name;
                }
                if (
                  component.types.includes('locality') ||
                  component.types.includes('administrative_area_level_1')
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

  console.log(location);

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
          <>
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
                height: 200,
                paddingHorizontal: 15,
                borderBottomEndRadius: 15,
                borderBottomStartRadius: 15,
              }}>
              <DefaultView
                style={{
                  position: 'relative',
                  backgroundColor: '#474747',
                  height: 150,
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
                    color: '#fff',
                  }}>
                  {user?.name}
                </Text>

                {user?.headline && (
                  <Text
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
                  0 conexiones
                </Text>
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
                    Sobre mi
                  </Text>
                </DefaultView>

                <DefaultView
                  style={{
                    marginTop: 15,
                    backgroundColor: 'rgba(0,0,0,0.05)',
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
                          gap: 1,
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
                </DefaultView>
              </DefaultView>

              {/* Private Information */}
              {/* <View style={{
                marginTop: 15,
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: 10,
                padding: 10
              }} >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontWeight: '600',
                    fontSize: 16,
                    color: 'rgba(0,0,0,0.8)',
                  }}>Informacion Privada </Text>
                  <View style={{

                    backgroundColor: 'rgba(255,255,255, .8)',
                    marginLeft: 10,
                    borderRadius: 50,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row'
                  }}>
                    <Text> <Icon name="time-outline" color='rgba(0,0,0,0.8)' /> </Text>
                    <Text style={{
                      fontWeight: '400',
                      fontSize: 12,
                      color: 'rgba(0,0,0,0.8)'
                    }}>Solo visible para ti</Text>
                  </View>
                </View>
                <View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10
                  }}>
                    <Text style={{
                      fontSize: 14,
                      color: 'rgba(0,0,0,0.8)'
                    }} >Genero</Text>
                    <Text style={{
                      fontSize: 14,
                      color: 'rgba(0,0,0,0.8)'
                    }} >{user?.gender}</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10
                  }}>
                    <Text style={{
                      fontSize: 14,
                      color: 'rgba(0,0,0,0.8)'
                    }} >Telefono</Text>
                    <Text style={{
                      fontSize: 14,
                      color: 'rgba(0,0,0,0.8)'
                    }} >{user?.phone}</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10
                  }}>
                    <Text style={{
                      fontSize: 14,
                      color: 'rgba(0,0,0,0.8)'
                    }} >Nacimiento</Text>
                    <Text style={{
                      fontSize: 14,
                      color: 'rgba(0,0,0,0.8)'
                    }} >{user?.born_date}</Text>
                  </View>

                </View>
              </View> */}

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
                  }}>
                  {user?.skills?.map((skill: string) => (
                    <Text
                      style={{
                        color: 'rgba(0,0,0,0.8)',
                        fontSize: 15,
                        marginRight: 10,
                      }}
                      key={skill}>
                      {skill},
                    </Text>
                  ))}
                </DefaultView>
              </DefaultView>

              {/* SOCIAL LINKS */}
              {/* <Text style={{
                fontSize: 16,
                color: 'rgba(0,0,0,0.8)',
                fontWeight: '600',
                marginTop: 25
              }}>Redes sociales</Text>
              <Text style={{
                color: 'rgba(0,0,0,0.6)',
                fontSize: 14,
                fontWeight: '400'
              }}>Para que las personas puedan conocerte mejor</Text> */}

              {/* <Pressable onPress={() => navigation.navigate('EditProfileNetwork', { id: 'g' })}   style={{
                marginTop: 20
              }}
              >
               
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15
                }}>
                  <Icon name='logo-instagram' color='#E1306C' size={28} />
                  <Input style={{
                    width: '85%'
                  }} editable={false} placeholder='Agregar usuario de Instagram' value={user?.instagram} />
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                  marginTop: 15
                }}>
                  <Icon name='logo-twitter' color='#1DA1F2' size={28} />
                  <Input editable={false} style={{
                    width: '85%'
                  }} placeholder='Agregar usuario de Twitter' value={user?.twitter} />
                </View>
              </Pressable> */}

              {/* <View style={{
                marginTop: 20
              }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15
                }}>
                  <Icon name='logo-facebook' color='#3b5998' size={28} />
                  <Input  style={{
                    width: '85%',
                  }} editable={false} placeholder='Agregar link de Facebook' value={user?.facebook} />
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                  marginTop: 15
                }}>
                  <Icon name='logo-linkedin' color='#0A66C2' size={28} />
                  <Input style={{
                    width: '85%'
                  }} editable={false} placeholder='Agregar link de Linkedin' value={user?.linkedin} />
                </View>
              </View> */}
            </DefaultView>
          </>
        )}
      </ScrollView>

      <>
        <BottomSheet
          isVisible={profileOptions}
          setIsVisible={() => setProfileOptions(!profileOptions)}>
          <TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                color: 'rgba(0,0,0,0.8)',
                fontSize: 14,
              }}>
              Reportar
            </Text>
          </TouchableOpacity>
        </BottomSheet>
      </>
    </View>
  );
};

export default UserProfile;
