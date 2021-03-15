import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import Dialog from './Dialog';

// import { Container } from './styles';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const PasswordReset: React.FC = () => {

  return (
    <View style={styles.Container}>
      <Dialog width={width} height={height}></Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 100,
    zIndex: 10000,
  },
  
});

export default PasswordReset;