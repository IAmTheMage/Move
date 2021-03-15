import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Login from './src/components/Login'
import Login1 from './src/components/Login1';
import { Provider } from 'react-redux';
import store from './src/store';
import Navigation from './src/navigation';

//191936
export default function App() {
  const [page, setPage] = useState(1);
 
  function changePage() {
    console.log(page)
    if(page >= 1) {
      setPage(0);
    }
    else {
      setPage(page + 1);
    }
  }

  function setStatusBarColor() {
    const firstColor = [0];
    const secondColor = [1];
    if(firstColor.includes(page)) {
      return "white"
    }
    else if(secondColor.includes(page)) {
      return "#0f0f0f"
    }
  }

  function setTextChangeColor() {
    const firstColor = [0];
    const secondColor = [1];
    if(firstColor.includes(page)) {
      return "#0f0f0f"
    }
    else if(secondColor.includes(page)) {
      return "white"
    }
  }

  return (
    <>
      <Provider store={store}>
        <Navigation></Navigation>
      </Provider>
    </>
  );
}
