import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'; 
import { ButtonText } from '../../../components/Login1/styled';

// import { Container } from './styles';

interface Props {
  width: number;
  height: number;
}

const texts = [
  `Por favor, coloque seu email abaixo para que possamos lhe enviar um 
  email de confirmação para que você possa mudar sua senha.
  `,
  `
  Enviamos um email para você, por favor verifique sua caixa de mensagens.
  `
]

const Dialog: React.FC<Props> = ({width, height}) => {
  const state = useSelector((state: any) => state?.resetPassword);
  const [index, setIndex] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const dispatcher = useDispatch();

  useEffect(() => {
    if(state?.success) {
      setIndex(index + 1);
      setTimeout(() => {
        dispatcher({type: 'CLOSE_RESETPASSWORD_MODAL'})
      }, 3000);
    }
  }, [state?.success])

  return (
    <View style={{...styles.Container}}>
      <Text style={styles.Text}>{texts[index]}</Text>
      <View style={styles.InputContainer}>
        <MaterialIcons style={{marginLeft: 25, marginRight: 5}} size={20} name="email" color="white"></MaterialIcons>
        <TextInput autoCapitalize="none" value={email} onChangeText={(e) => {
          setEmail(e);
        }} placeholder="Email" placeholderTextColor="white" style={styles.Input}></TextInput>
      </View>
      <TouchableOpacity onPress={() => {
        setIsLoad(true);
        dispatcher({type: 'SEND_PASSWORD_RESET_EMAIL', email});
      }} style={styles.Button}>
        {!isLoad ? <ButtonText>Enviar</ButtonText> : <ActivityIndicator size="small" color="white"></ActivityIndicator>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    color: 'white',
    backgroundColor: '#0f0f0f',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    height: 240,
    justifyContent: 'space-between',
    opacity: 1
    
  },
  Text: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginTop: 15
  },
  InputContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#212121',
    alignItems: 'center',
    zIndex: 1000
  },
  Input: {
    width: '80%',
    height: 40,
    color: 'white',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1000,
  },
  Button: {
    backgroundColor: '#28d8a1',
    width: "100%",
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  }
})

export default Dialog;