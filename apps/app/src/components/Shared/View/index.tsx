/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBarStyle,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {ReactNode} from 'react';
import StatusBar from '../../StatusBar';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  statusColor?: any;
  barStyle?: StatusBarStyle;
}

export const View = ({style, children, statusColor, barStyle}: Props) => {
  return (
    <KeyboardAvoidingView
    style={{
      flex: 1,
    }}>

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <SafeAreaView
      style={[
        {
          width: '100%',
          flex: 1,
          backgroundColor: statusColor ?? '#121212',
        },
        style,
      ]}>
    
          <StatusBar
            translucent
            backgroundColor={statusColor ?? '#121212'}
            barStyle={barStyle ?? 'light-content'}
          />
          {children}
        
    </SafeAreaView>
    </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
};
