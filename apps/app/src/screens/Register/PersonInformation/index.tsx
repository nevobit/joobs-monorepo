import { View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Field from '../../../components/Shared/Field'
import Input from '../../../components/Shared/Input'
import Button from '../../../components/Shared/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux'
import { saveUserInfo } from '../../../store/features/auth'

const PersonInformation = ({ navigation, params }: any) => {
    const [gender, setGender] = useState('');
    const [born_date, setBornDate] = useState('');
    const startYear = 1970;
    const endYear = 2012;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
  
    const dispatch = useDispatch();

    console.log(gender)
    const onSubmit = () => {
        dispatch(saveUserInfo({ gender, born_date }));
        navigation.navigate('LocationInformation')
    }


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
            }}>Impresionante 🚀</Text>
            <Text style={{
                color: '#fff',
                fontWeight: '600',
                fontSize: 18,
                marginTop: 5,
                paddingHorizontal: 15

            }}>¡Preparemos tu perfil!</Text>

            <View style={{
                backgroundColor: '#fff',
                flex: 1,
                borderTopEndRadius: 20,
                borderTopStartRadius: 20,
                marginTop: 70,
                paddingHorizontal: 15,
            }}>

                <View style={{
                    backgroundColor: 'orange',
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    position: 'absolute',
                    top: -50,
                    left: '50%',
                    transform: [{ translateX: -40 }],
                    zIndex: 999,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: 55,
                        fontWeight: '400',
                        color: '#fff'
                    }}>N</Text>
                </View>
                <View style={{
                    marginTop: 50
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '600',
                        color: 'rgba(0,0,0,0.8)',
                        fontSize: 24
                    }}>Nestor Mosquera</Text>


                    <Field label='Cual es tu genero?'>
                        <View  style={{
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.2)',
                            borderRadius: 10
                        }}>

                        <Picker
                            selectedValue={setGender}
                            onValueChange={(itemValue) =>
                                setGender(String(itemValue))
                            }
                            placeholder=''
                            mode='dropdown'
                            >
                            <Picker.Item label="Masculino" value="masculino" />
                            <Picker.Item label="Femenino" value="femenino" />
                            <Picker.Item label="No Binario" value="no binario" />
                            <Picker.Item label="Prefiero no decirlo" value="no" />
                        </Picker>
                        </View>

                    </Field>
                    <Field label='Cuando naciste?'>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                            gap: 10
                        }}>
                            {years.map((year) => (
                                <TouchableOpacity onPress={() => setBornDate(year.toString())} style={{
                                backgroundColor: born_date == String(year)? '#5368f5' : 'rgba(0,0,0,0.1)',
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 5
                            }}>
                                <Text style={{
                                    fontSize:14,
                                    fontWeight: '500',
                                    color: born_date == String(year) ? "#fff" :  'rgba(0,0,0,0.8)'
                                }}>{year}</Text>
                            </TouchableOpacity>
                            ))}
                        </ScrollView> 
                    </Field>
                </View>

                <Button onPress={onSubmit} style={{
                    marginTop: 'auto',
                    marginBottom: 30
                }} text='Continuar ->' />
            </View>
        </View>
    )
}

export default PersonInformation