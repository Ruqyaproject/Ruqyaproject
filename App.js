import React from 'react';
import 'react-native-gesture-handler';
import ContextProvider from './src/ContextProvider/ContextProvider';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/Navigation/Stack/StackNavigation';
import { StatusBar } from 'react-native';
import Colors from './src/Colors/Colors';

const App = () => {

  return (
    <ContextProvider>
        <NavigationContainer>
          <StatusBar barStyle='dark-content' backgroundColor={Colors.primaryColor} />
          <StackNavigation />
        </NavigationContainer>
      </ContextProvider>
  );
};

export default App;

