import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View as DefaultView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Field from '../../components/Shared/Field';
import Input from '../../components/Shared/Input';
import Button from '../../components/Shared/Button';
import {useDispatch} from 'react-redux';
import {saveUserInfo, signin} from '../../store/features/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import {useMutation} from '@apollo/client';
import {LOGIN, VERIFY_CODE} from '../../graphql/mutations';
import {View} from '../../components/Shared/View';

const VerificationCode = ({navigation, route}: any) => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const [verify, {loading, error}] = useMutation(VERIFY_CODE);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const {data} = await verify({
        variables: {
          code,
          email: route.params.email,
        },
      });

      console.log(route.params.type);
      if (route.params.type == 'register') {
        dispatch(saveUserInfo({email: route.params.email}));
        navigation.navigate('Register', {email: route.params.email});
      } else {
        dispatch(signin({token: data.verifyCode.token}));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <KeyboardAvoidingView
    style={{
      flex: 1
    }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>


    <View statusColor="#fff" barStyle="dark-content">
      <DefaultView
        style={{
          backgroundColor: '#fff',
          height: '100%',
          paddingHorizontal: 15,
          paddingTop: 10,
          paddingBottom: 25,
        }}>
        <TouchableOpacity
          style={{
            marginBottom: 10,
          }}
          onPress={() => navigation.navigate('Onboarding')}>
          <Icon name="arrow-back" size={25} color="rgba(0,0,0,0.8)" />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 20,
            color: 'rgba(0,0,0,0.8)',
            marginBottom: 20,
          }}>
          Te hemos enviado un correo electrónico
        </Text>

        <Field label="Codigo">
          <Input
            keyboardType="number-pad"
            contextMenuHidden
            onChangeText={text => setCode(text)}
            maxLength={6}
            placeholder="Ingresa el codigo"
          />
        </Field>

        <Text
          style={{
            fontWeight: '400',
            fontSize: 13,
            color: 'rgba(0,0,0,0.8)',
            marginTop: 15,
            marginBottom: 20,
          }}>
          Te enviamos un codigo a{' '}
          <Text
            style={{
              fontWeight: '600',
            }}>
            {route.params.email}
          </Text>
          .
        </Text>

        <Button
          style={{
            marginTop: 'auto',
          }}
          loading={loading}
          onPress={onSubmit}
          text="Continuar"
        />
      </DefaultView>
    </View>
    </TouchableWithoutFeedback>

    </KeyboardAvoidingView>

  );
};

export default VerificationCode;
