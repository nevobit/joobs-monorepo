import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Input from '../../components/Shared/Input'
import Field from '../../components/Shared/Field'
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/Ionicons'
import { HomePost } from '../../components/UI'

const Home = () => {
    Geolocation.getCurrentPosition(info => console.log(info));

  return (
    <>
    <ScrollView style={{
        paddingVertical: 10,
        height: '100%',
        marginBottom: 10
    }}>
        <HomePost title={'title'} text='Hola a todos, quien esta interesado en formar un equipo conmigo para una hackaton de IA/ML ' name="Shivam" type='Placements Club' />
        <HomePost title={'title'} image='https://i.ibb.co/tqzTj7R/Start-Up-Serie-de-TV-261373962-large.jpg' text='Hola a todos, quien esta interesado en formar un equipo conmigo para una hackaton de IA/ML ' name="Shivam" type='Placements Club' />
        <HomePost title={'title'} image='https://i.ibb.co/g4Cv474/ai-generated-7770524-1280.webp' text='Hola a todos, quien esta interesado en formar un equipo conmigo para una hackaton de IA/ML ' name="Shivam" type='Placements Club' />
        <HomePost title={'title'} text='Hola a todos, quien esta interesado en formar un equipo conmigo para una hackaton de IA/ML ' name="Shivam" type='Placements Club' />
    </ScrollView>
       
       <TouchableOpacity style={{
      position: 'absolute',
      backgroundColor: '#5169f6',
      height: 50,
      width: 50,
      borderRadius: 50,
      alignItems:'center',
      justifyContent: 'center',
      bottom: 25,
      right: 15,
    }}>
      <Icon name='pencil' size={22} color='#fff' />
    </TouchableOpacity>
    </>
  )
}

export default Home