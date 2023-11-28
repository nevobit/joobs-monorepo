import React from 'react';
import { View, StyleSheet } from 'react-native';

const StepIndicator = ({ currentStep, totalSteps }: any) => {
  return (
    <View style={styles.container}>
      {[...Array(totalSteps)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            index <= currentStep ? styles.currentStep : null,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
    marginBottom: 15, 
  },
  step: {
    height: 7,
    backgroundColor: 'rgba(255,255,255,.3)',
    flex: 1,
    borderRadius: 50,
  },
  currentStep: {
    backgroundColor: '#fff', 
  },
});

export default StepIndicator;
