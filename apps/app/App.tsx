import React from 'react';
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
function App(): JSX.Element {
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