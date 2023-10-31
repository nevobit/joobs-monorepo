import { View, Text, StatusBar, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import {
    GoogleSignin,
    statusCodes,
    GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import Button from '../../components/Shared/Button';
import { useMutation } from '@apollo/client';
import { LOGIN_GOOGLE } from '../../graphql/mutations';
import { useDispatch } from 'react-redux';
import { saveUserInfo, signin } from '../../store/features/auth';

GoogleSignin.configure({
    // webClientId: '824309813919-l9eohikp7ovh8a6pd9926tt2r40i2em2.apps.googleusercontent.com',
    webClientId: '824309813919-dn4gsirbmj8i2h208fa3rtssidc3f8p5.apps.googleusercontent.com'
});

const Onboarding = ({ navigation }: any) => {
    const [login, { loading, error }] = useMutation(LOGIN_GOOGLE);
    const dispatch = useDispatch();

    const signinGoogleFn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log({ userInfo })
            const { data } = await login({
                variables: {
                    email: userInfo.user.email
                }
            });
            if (data.userLoginGoogle.type == 'register') {
                dispatch(saveUserInfo({ email: userInfo.user.email, name: userInfo.user.name, photo: userInfo.user.photo }));
                navigation.navigate('Register', { email: userInfo.user.email })
            } else {
                dispatch(signin({ token: data.userLoginGoogle.token }));
            }
        } catch (error: any) {
            console.log({ error })
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#5368f5',
            padding: 15,
        }}>
            <StatusBar backgroundColor='#5368f5' />

            <View>
                <View style={{
                    gap: 15,
                    alignItems: 'center',
                    marginTop: 40
                }}>
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        opacity: .5,
                        borderRadius: 10,
                        height: 105,
                        padding: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        width: '80%',
                        elevation: 5,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'rgba(0,0,0,0.8)'
                        }}>Editor de video para creacio de contenido en IG y Youtube</Text>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        marginTop: 15
                    }}>
                        <Text style={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            color: 'rgba(0,0,0,0.8)',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                            borderRadius: 50,
                            fontSize: 10,
                            fontWeight: '500'
                        }} >Freelance</Text>
                        <Text style={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            color: 'rgba(0,0,0,0.8)',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                            borderRadius: 50,
                            fontSize: 10,
                            fontWeight: '500'
                        }} >Edicion de video</Text>
                        <Text style={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            color: 'rgba(0,0,0,0.8)',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                            borderRadius: 50,
                            fontSize: 10,
                            fontWeight: '500'
                        }} >Premier Pro</Text>
                    </View>
                    </View>
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        borderRadius: 10,
                        height: 105,
                        padding: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        width: '90%',
                        elevation: 5,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'rgba(0,0,0,0.8)'
                        }}>Co-fundador tecnico para una Startup FinTech en Bogota</Text>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        marginTop: 15
                    }}>
                        <Text style={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            color: 'rgba(0,0,0,0.8)',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                            borderRadius: 50,
                            fontSize: 12,
                            fontWeight: '500'
                        }} >Co-Fundador</Text>
                        <Text style={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            color: 'rgba(0,0,0,0.8)',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                            borderRadius: 50,
                            fontSize: 12,
                            fontWeight: '500'
                        }} >Finanzas</Text>
                        <Text style={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            color: 'rgba(0,0,0,0.8)',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                            borderRadius: 50,
                            fontSize: 12,
                            fontWeight: '500'
                        }} >Desarrollo web</Text>
                    </View>
                    </View>
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        opacity: .5,
                        borderRadius: 10,
                        height: 105,
                        padding: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        width: '80%',
                        elevation: 5,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'rgba(0,0,0,0.8)'
                        }}>Experto en Marketing Digital para nuestra agencia</Text>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        marginTop: 15
                    }}>
                        <Text style={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            color: 'rgba(0,0,0,0.8)',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                            borderRadius: 50,
                            fontSize: 10,
                            fontWeight: '500'
                        }} >Freelance</Text>
                        <Text style={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            color: 'rgba(0,0,0,0.8)',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                            borderRadius: 50,
                            fontSize: 10,
                            fontWeight: '500'
                        }} >Manejo de SEO </Text>
                        <Text style={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            color: 'rgba(0,0,0,0.8)',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                            borderRadius: 50,
                            fontSize: 10,
                            fontWeight: '500'
                        }} >Google Ads</Text>
                    </View>
                    </View>
                </View>
            </View>
            <View style={{
                marginTop: 'auto'
            }}>

                <Text style={{
                    color: '#fff',
                    fontSize: 24,
                    textAlign: 'center',
                    fontWeight: '600',
                    marginBottom: 15
                }}>Aprende. Gana. Conéctate.</Text>
                <Text style={{
                    fontSize: 14,
                    textAlign: 'center',
                    marginBottom: 15,
                    color: '#fff'
                }}>Encuentra oportunidades remuneradas, mejora tus habilidades con eventos y establece contactos con mentes brillantes.</Text>
                <TouchableOpacity
                    onPress={() => signinGoogleFn()}
                    style={{
                        backgroundColor: '#fff',
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 50
                    }}>
                    {loading ? <ActivityIndicator color="#000" /> : (

                        <Text style={{
                            textAlign: 'center',
                            fontWeight: '500',
                            fontSize: 14,
                            color: 'rgba(0,0,0,0.8)'
                        }}>Continua con Google</Text>
                    )}

                </TouchableOpacity>
                {/* <Button text={'Sign in with Google'} onPress={() => {
                    GoogleSignin.configure({
                        webClientId: '824309813919-l9eohikp7ovh8a6pd9926tt2r40i2em2.apps.googleusercontent.com',
                    });
                    GoogleSignin.hasPlayServices().then((hasPlayService) => {
                        if (hasPlayService) {
                            GoogleSignin.signIn().then((userInfo) => {
                                console.log(JSON.stringify(userInfo))
                            }).catch((e) => {
                                console.log("ERROR IS: " + JSON.stringify(e));
                            })
                        }
                    }).catch((e) => {
                        console.log("ERROR IS: " + JSON.stringify(e));
                    })
                }} /> */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 15,
                    marginTop: 10,
                    marginBottom: 10,
                }}>
                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(255,255,255,.5)',
                        width: '45%'
                    }} />
                    <Text style={{
                        color: '#fff',
                        fontSize: 14
                    }}>O</Text>
                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(255,255,255,.5)',
                        width: '45%'
                    }} />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Signin')}
                    style={{
                        marginBottom: 10
                    }}>
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 16
                    }}>Continua con tu correo</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Onboarding