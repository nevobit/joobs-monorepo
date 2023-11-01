import { View, Text } from 'react-native'
import React from 'react'
import { EventCard } from '../../../components/UI'

const Events = () => {
  return (
    <>
    <View style={{
          height: 10,
          backgroundColor: '#121212'
        }} />
    <View style={{
        padding: 20
    }}>
        <EventCard image="https://i.ibb.co/qgTbdcg/Screenshot-from-2023-10-12-20-24-59.png" />
    </View>
    </>

  )
}

export default Events