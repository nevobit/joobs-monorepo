import { View, Text } from 'react-native'
import React from 'react'
import StepIndicator from './StepIndicator';

interface Props {
    title: string;
    step: number;
}

const Header = ({ title, step }: Props) => {
  return (
    <View style={{
        backgroundColor: '#121212',
        paddingTop: 10,
        paddingHorizontal: 15
    }}>
      <Text style={{
        fontSize: 18,
        color: '#fff',
        fontWeight: '600'
      }}>{title}</Text>
      <StepIndicator  currentStep={step} totalSteps={6} />

    </View>
  )
}

export default Header