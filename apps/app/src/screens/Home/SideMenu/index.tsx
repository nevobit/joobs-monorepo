import {View as DefaultView, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {View} from '../../../components/Shared/View';

const SideMenu = () => {
  return (
    <DefaultView style={{
        backgroundColor: "rgba(0,0,0,0.1)",
        width: "100%",
        height: "100%"
    }}>
      <DefaultView
        style={{
          position: 'absolute',
          top: 60,
          left: 0,
          width: '50%',
          height: '100%',
          zIndex: 999999,
          backgroundColor: '#121212',
        }}>
        <Text>Sidemenu</Text>
      </DefaultView>
    </DefaultView>
  );
};

export default SideMenu;
