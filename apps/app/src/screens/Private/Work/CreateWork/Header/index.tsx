import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import StepIndicator from './StepIndicator';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface Props {
    title?: string;
    step: number;
    color?: string;
}

const Header = ({ title, step, color }: Props) => {
  const navigate = useNavigation();
  return (
    <View style={{
        backgroundColor: color? color : '#121212',
        paddingTop: 10,
        paddingHorizontal: 15
    }}>
      <TouchableOpacity onPress={() => navigate.goBack()}>
        <Icon name='chevron-back' color='#fff' size={25} />
      </TouchableOpacity>
      {title && (

      <Text style={{
        fontSize: 18,
        color: '#fff',
        fontWeight: '600'
      }}>{title}</Text>
      )}
      <StepIndicator  currentStep={step} totalSteps={5} />

    </View>
  )
}

export default Header