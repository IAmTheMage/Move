import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { TouchableOpacity, Text, LogBox } from 'react-native';
import Login1 from './src/components/Login1';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import store from './src/store';
import Navigation from './src/navigation';


//191936
export default function App() {
  const [loaded] = useFonts({
    'PoppinsRegular': require('./assets/fonts/Poppins-Regular.ttf'),
    'PoppinsBold': require('./assets/fonts/Poppins-Bold.ttf')
  })
  LogBox.ignoreAllLogs()

  return (
    

    <>
      {loaded && <Provider store={store}>
        <Navigation></Navigation>
      </Provider>}
    </>
  );
}
