import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import WorkTopTap from '../../../navigator/WorkTopTab'
import Icon from 'react-native-vector-icons/Ionicons'
import { WorkCard } from '../../../components/UI'

const Work = () => {
  return (
    <View>
        <WorkTopTap />
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
            <TouchableOpacity>
              <Icon name='search-outline' size={22} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={{
          paddingHorizontal: 15,
          marginBottom: 50
        }}>

        {/* CARD */}
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Camilo Aristizabal' title='Prompt engineering que pueda generar recursos de imagenes con IA para un nichorelogiosos, cultural y espiritual.' money={1000} type='Practicante' />
        <WorkCard name='Fernando Matos' title='Desarrollador web para la contruccion de un sitio web para una Edtech' money={1000} type='Tiempo completo' />
        <WorkCard name='Victoria Palacios' title='Editor de videos para IG Reels' money={1000} type='Freelancer' />
        <WorkCard name='Adan Rodriguez' title='Co-Founder tecnico para una startup fintech' money={1000} type='Co-founder' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />
        <WorkCard name='Andres Rendon' title='Editor de videos para IG Reels' money={1000} type='Tiempo completo' />

        </ScrollView>

    </View>
  )
}

export default Work