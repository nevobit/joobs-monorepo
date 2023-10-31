import { View, Text } from 'react-native'
import React from 'react'
import StepIndicator from './StepIndicator';

interface Props {
    title?: string;
    step: number;
    color?: string;
}

const Header = ({ title, step, color }: Props) => {
  return (
    <View style={{
        backgroundColor: color? color : '#121212',
        paddingTop: 10,
        paddingHorizontal: 15
    }}>
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