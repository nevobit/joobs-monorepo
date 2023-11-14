import { View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Field from '../../../components/Shared/Field'
import Input from '../../../components/Shared/Input'
import Button from '../../../components/Shared/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux'
import { saveUserInfo } from '../../../store/features/auth'
import SelectDropdown from 'react-native-select-dropdown'

const genders = ['Masculino', 'Femenino', 'No Binario', 'Prefiero no decirlo']

const PersonInformation = ({ navigation, params }: any) => {
    const [gender, setGender] = useState('');
    const [born_date, setBornDate] = useState('');
    const { userInfo } = useSelector((state: any) => state.auth);


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
                    }}>{userInfo?.name.charAt(0)}</Text>
                </View>
                <View style={{
                    marginTop: 50
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '600',
                        color: 'rgba(0,0,0,0.8)',
                        fontSize: 24
                    }}>{userInfo?.name}</Text>


                    <Field label='¿Cual es tu genero?'>
                        <View style={{
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.2)',
                            borderRadius: 10,
                            overflow: 'hidden'
                        }}>

                            <SelectDropdown
                                data={genders}
                                onSelect={(selectedItem, index) => {
                                    setGender(String(selectedItem))
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                                buttonStyle={{
                                    width: "100%",
                                    backgroundColor: '#fff',
                                }}
                                buttonTextStyle={{
                                    fontSize: 14,
                                    color: 'rgba(0,0,0,0.8)'
                                }}
                                rowTextStyle={{
                                    fontSize: 14,
                                    color: 'rgba(0,0,0,0.8)'
                                }}

                                defaultButtonText='Selecciona una opción'
                            />
                            {/* 
                        <Picker
                            selectedValue={setGender}
                            onValueChange={(itemValue) =>
                                setGender(String(itemValue))
                            }
                            placeholder=''
                            mode='dropdown'
                            >
                            <Picker.Item style={{
                                color: 'rgba(0,0,0,0.8)',
                            }} label="Selecciona un genero" value="" />
                            <Picker.Item style={{
                                color: 'rgba(0,0,0,0.8)',
                            }}   label="Masculino" value="masculino" />
                            <Picker.Item style={{
                                color: 'rgba(0,0,0,0.8)',
                            }}  label="Femenino" value="femenino" />
                            <Picker.Item style={{
                                color: 'rgba(0,0,0,0.8)',
                            }}  label="No Binario" value="no binario" />
                            <Picker.Item style={{
                                color: 'rgba(0,0,0,0.8)',
                            }}  label="Prefiero no decirlo" value="no" />
                        </Picker> */}
                        </View>

                    </Field>
                    <Field label='Cuando naciste?'>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                            gap: 10
                        }}>
                            {years.map((year) => (
                                <TouchableOpacity key={year} onPress={() => setBornDate(year.toString())} style={{
                                    backgroundColor: born_date == String(year) ? '#5368f5' : 'rgba(0,0,0,0.05)',
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 5
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: '500',
                                        color: born_date == String(year) ? "#fff" : 'rgba(0,0,0,0.8)'
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