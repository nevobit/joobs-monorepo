import {View as DefaultView, ScrollView, Text} from 'react-native';
import React from 'react';
import {EventCard} from '../../../components/UI';
import Header from '../../../components/Layout/Header';
import {View} from '../../../components/Shared/View';

const Events = ({navigation}: any) => {
  return (
    <View>
      <Header title="Eventos" notifications messages navigation={navigation} />
      <ScrollView contentContainerStyle={{
        backgroundColor: "#f0f0f0",
        minHeight: "100%"
      }} style={{
        backgroundColor: "#f0f0f0"
      }}>
      <DefaultView
        style={{
          height: 10,
          backgroundColor: '#f0f0f0',
        }}
      />
      <DefaultView
        style={{
          padding: 20,
        }}>
        <EventCard image="https://i.ibb.co/V9QmJd4/TECH-SHOW.png" />
      </DefaultView>
      </ScrollView>

    </View>
  );
};

export default Events;
