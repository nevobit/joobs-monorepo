import { View, Text } from 'react-native'
import React from 'react'
import { EventCard } from '../../../components/UI'

const Events = () => {
  return (
    <View style={{
        padding: 20
    }}>
        <EventCard image="https://i.ibb.co/qgTbdcg/Screenshot-from-2023-10-12-20-24-59.png" />
    </View>
  )
}

export default Events