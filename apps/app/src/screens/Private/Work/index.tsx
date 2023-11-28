import React, { useEffect, useState } from 'react'
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View as DefaultView } from 'react-native'
import WorkTopTap from '../../../navigator/WorkTopTab'
import Icon from 'react-native-vector-icons/Ionicons'
import { WorkCard } from '../../../components/UI'
import styles from '../../Home/Discussions/styles'
import { BottomSheet } from '../../../containers'
import Field from '../../../components/Shared/Field'
import Input from '../../../components/Shared/Input'
import Button from '../../../components/Shared/Button'
import { useUpdateUser, useUploadImage, useUser } from '../../../hooks'
import Textarea from '../../../components/Shared/Textarea'
import Header from '../../../components/Layout/Header'
import { View } from '../../../components/Shared/View'

const Work = ({ navigation }: any) => {
  const [modal, setModal] = useState(false)
  const { user, refetch } = useUser();
  const { isUpdating, updateUser }  = useUpdateUser(); 
  const { photo, getPhoto } = useUploadImage();

  const [companyInfo, setCompanyInfo] = useState({
    company_name: '',
    company_logo: '',
    company_website: '',
    company_description: '',
  });

  const [step, setStep] = useState('1');

  const submit = () => {
    if(user.company_name || user.company_name){
      navigation.navigate('CreateWork')
    }else{
      setModal(true);
    }
  }

  const updateAndCreate = async() => {

    if(companyInfo.company_name  == '' ||companyInfo.company_description == ''){
      Alert.alert('El nombre y la descripción son requeridos');
      return;
    }

    await updateUser({
      variables: {
          data: { ...companyInfo }
      }
  });
    navigation.navigate('CreateWork')
  }

  useEffect(() => {
    refetch()
  }, [refetch])
  return (
    <View>

<Header title='Trabajo' whathsapp notifications messages navigation={navigation} />

      <WorkTopTap />
      <TouchableOpacity
        onPress={submit}
        style={styles.button}>
        <Icon name='add-outline' size={26} color='#fff' />
      </TouchableOpacity>


      <BottomSheet isVisible={modal} setIsVisible={setModal}>
        {step == '1' && (
          <DefaultView style={{
            height: '80%'
          }}>
            <Text style={{
              fontWeight: '600',
              color: 'rgba(0,0,0,0.8)',
              fontSize: 18
            }}>Hablamos sobre tu empresa</Text>

            <Text style={{
              fontWeight: '400',
              color: 'rgba(0,0,0,0.6)',
              fontSize: 14,
              lineHeight: 20,
              marginTop: 10
            }}>Agregando un el link de tu sitio web hace que tu oferta sea mas creible y visible</Text>

            <Field label='Tu sitio web'>
              <Input onChangeText={(text) => setCompanyInfo((prev) => ({ ...prev, company_website: text }))} placeholder='Ej: www.joobs.lat' />
            </Field>
            <DefaultView style={{
              marginTop: 'auto'
            }}>
              <Button onPress={() => setStep('2')} text='Siguiente' />
            </DefaultView>
          </DefaultView>
        )}
        {step == '2' && (

          <ScrollView style={{
            height: '80%'
          }}>
            <Text style={{
              fontWeight: '600',
              color: 'rgba(0,0,0,0.8)',
              fontSize: 18
            }}>Algunos detalles mas</Text>

            <Text style={{
              fontWeight: '400',
              color: 'rgba(0,0,0,0.6)',
              fontSize: 14,
              lineHeight: 20,
              marginTop: 10
            }}>Agrega un logo, un nombre y una descripcion para atraer al mejor talento!</Text>


            <DefaultView style={{
              marginTop: 20
            }}>
              <Text style={{
                fontSize: 14,
                color: 'rgba(0,0,0,0.8)'
              }}>Logo</Text>
              <DefaultView style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20
              }}>

                <Image source={{
                  uri: photo ? photo : 'https://i.ibb.co/Nnhw9xg/companylogo.png'
                }} style={{
                  width: 80,
                  height: 80,
                  borderRadius: 15,
                  marginTop: 15
                }} />
                <TouchableOpacity onPress={getPhoto} style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  width: 150,
                  justifyContent: 'center',
                }}>
                  <Icon name='share-outline' size={22} color='rgba(0,0,0,0.8)' />
                  <Text style={{
                    color: 'rgba(0,0,0,0.8)',
                    fontSize: 14
                  }}>Subir logo</Text>
                </TouchableOpacity>
              </DefaultView>

            </DefaultView>
            <Field label='Nombre empresa / Proyecto'>
              <Input onChangeText={(text) => setCompanyInfo((prev) => ({ ...prev, company_name: text }))} placeholder='Ej: www.joobs.lat' />
            </Field>

            <Field label='Descripcion empresa / Proyecto'>
              <Textarea onChangeText={(text) => setCompanyInfo((prev) => ({ ...prev, company_description: text }))} placeholder='Escribe un resumen de tu empresa o proyecto' />
            </Field>
            <DefaultView style={{
              // marginTop: 'auto',
              position: 'relative',
              width: '100%',
            }}>
              <Button loading={isUpdating} onPress={updateAndCreate} text='Siguiente' />
            </DefaultView>
          </ScrollView>
        )}
      </BottomSheet>
    </View>
  )
}

export default Work