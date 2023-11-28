import { View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Field from '../../../components/Shared/Field'
import Input from '../../../components/Shared/Input'
import Button from '../../../components/Shared/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker';

const WhyInformation = ({ navigation, params }: any) => {
    const [selected, setSelected] = useState('');

    return (
        <View style={{
            backgroundColor: '#5368f5',
            flex: 1,
        }}>
            <StatusBar backgroundColor='#5368f5' />
            <Text style={{
                color: '#fff',
                fontWeight: '400',
                fontSize: 16,
                marginTop: 20,
                paddingHorizontal: 15
            }}>Tenemos curiosidad 🤔</Text>
            <Text style={{
                color: '#fff',
                fontWeight: '600',
                fontSize: 18,
                marginTop: 5,
                paddingHorizontal: 15

            }}>¿Cuál es tu objetivo en la app?</Text>

            <View style={{
                backgroundColor: '#fff',
                flex: 1,
                borderTopEndRadius: 20,
                borderTopStartRadius: 20,
                marginTop: 25,
                paddingHorizontal: 15,
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('SkillsInformation')} style={{
                    padding: 15,
                    backgroundColor: '#80ADD840',
                    marginTop: 20,
                    borderRadius: 10
                }}>
                    <Text style={{
                        fontWeight: '600',
                        color: 'rgba(0,0,0,0.8)',
                        maxWidth: 250,
                        fontSize: 18,
                        marginBottom: 5
                    }}>
                        Encontrar trabajo, establecer contactos y aprender
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        color: 'rgba(0,0,0,0.5)',
                        maxWidth: 200
                    }}>
                    Aplicar a ofertas laborales, conocer a personas apasionadas y registrarme en eventos
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('RecruierProfile')} style={{
                    padding: 15,
                    backgroundColor: '#FFFF9940',
                    marginTop: 20,
                    borderRadius: 10
                }}>
                    <Text style={{
                        fontWeight: '600',
                        color: 'rgba(0,0,0,0.8)',
                        maxWidth: 200,
                        fontSize: 18,
                        marginBottom: 5
                    }}>
                        Publicar un trabajo
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        color: 'rgba(0,0,0,0.5)',
                        maxWidth: 200
                    }}>
                    Encontrar practicantes, freelancers, compañeros de equipo y co-fundadores                    </Text>
                </TouchableOpacity>
 
                {/* <Button onPress={() => navigation.navigate('LocationInformation')} style={{
                    marginTop: 'auto',
                    marginBottom: 30
                }} text='Continuar ->' /> */}
            </View>
        </View>
    )
}

export default WhyInformation