import React from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const BottomSheet = ({ children, isVisible, setIsVisible }: Props) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
    >
      <TouchableWithoutFeedback 
      onPress={() => setIsVisible(false)}>
        <View style={styles.bottomSheetContainer}>
          {/* Parte superior del BottomSheet */}
          <View style={styles.bottomSheetHeader}>
            <View style={{
              backgroundColor: 'rgba(0,0,0,0.15)',
              width: 60,
              height: 4,
              borderRadius: 50
            }} /> 

          </View>

          {/* Contenido del BottomSheet */}
          <View style={styles.bottomSheetContent}>
            {children} 
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomSheetHeader: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  bottomSheetContent: {
    backgroundColor: '#fff',
    padding: 30,
  },
  closeButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red', // Puedes cambiar el color del texto aquí
  },
});

export default BottomSheet;