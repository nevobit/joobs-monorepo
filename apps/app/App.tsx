import React, { useEffect } from 'react';
import {
  StatusBar,
} from 'react-native';
import { NavigatorContainer } from './src/navigator/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { ApolloProvider } from '@apollo/client';
import client from './src/graphql';
import { PaperProvider } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons"
import { registerListenerWithFCM } from './src/utils/fcmHelper';
import firebase from '@react-native-firebase/app';
import { useUpdateUser } from './src/hooks';

function App(): JSX.Element {

  const RNfirebaseConfig = {
    apiKey: "AIzaSyCQ7jeQx4N1m3UTLMVJ-ajJeynfOxDrdJU",
    authDomain: "joobs-93292.firebaseapp.com",
    projectId: "joobs-93292",
    storageBucket: "joobs-93292.appspot.com",
    messagingSenderId: ".....",
    appId: "1:987824436257:android:0c471c2cf3eb22f177df60",
    databaseURL: "joobs-93292.firebaseio.com"
  };
  
  let app;
  if (firebase.apps.length === 0) {
  app = firebase.initializeApp(RNfirebaseConfig )

} else {
    app = firebase.app()
}
  

  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PaperProvider settings={{
          icon: props => <Icon {...props} />
        }} >
        <SafeAreaProvider>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <NavigationContainer>
            <NavigatorContainer />
          </NavigationContainer>
        </SafeAreaProvider>
        </PaperProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;