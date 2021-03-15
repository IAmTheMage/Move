import React, {useEffect, useState} from 'react';
import { View, Text, ActivityIndicator, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Fragment } from 'react';
import { Font } from 'expo';
import { 
  Container,InputView,Input,Title, DontHaveAccountContainer, 
  DontHaveAccount, Link, LoginButton, ButtonText,
  ForgotPasswordContainer, ForgotPassword,
} from './styled'
import Lottie from 'lottie-react-native'
import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import PasswordReset from '../../utils/components/PasswordReset';
import { TouchableOpacity } from 'react-native-gesture-handler';


// import { Container } from './styles';

const Login:React.FC = () => {
  const login = useSelector((state:any) => state?.login);
  const resetPasswordModal = useSelector((state: any) => state?.resetPasswordModal);
  const dispatcher = useDispatch();
  const [email, setEmail] = useState<string>(process.env.EMAILUTIL || "");
  const [password, setPassword] = useState<string>(process.env.PASSWORDUTIL || "");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const navigator = useNavigation();

  useEffect(() => {
    if(login?.success) {
      navigator.navigate('Home');
    }
  }, [login?.success])

  useEffect(() => {
    if(login?.fail) {
      console.log("Deu ruim" + " " + login?.fail);
    }
  }, [login?.fail])

  function openResetPasswordModal() {
    dispatcher({type: 'OPEN_RESETPASSWORD_MODAL'})
  }

  return (
    <>
      <Modal transparent={true} visible={resetPasswordModal?.isOpen}>
        <PasswordReset></PasswordReset>
      </Modal>
      <Container>
        <Title>MOV<Title style={{color: "#28d8a1"}}>E</Title></Title>
        <InputView>
          <MaterialIcons size={20} name="email" color="white"></MaterialIcons>
          <Input value={email} style={{color: "white"}} onChangeText={(e) => {setEmail(e)}} placeholderTextColor="white" placeholder="Email"></Input>
        </InputView>
        <InputView>
          <MaterialIcons size={20} name="lock" color="white"></MaterialIcons>
          <Input  value={password} style={{color: "white"}} onChangeText={(e) => {setPassword(e)}} placeholderTextColor="white" secureTextEntry={true} placeholder="Senha"></Input>
        </InputView>
        <ForgotPasswordContainer onPress={() => {
          
        }}>
          <TouchableOpacity onPress={() => {
            openResetPasswordModal();
          }}><ForgotPassword>Esqueceu sua senha?</ForgotPassword></TouchableOpacity>
          
        </ForgotPasswordContainer>
        <LoginButton onPress={() => {
          setIsLoad(true);
          dispatcher({type: "USER_LOGIN_REQUEST", email: email, password: password});
        }}>
          {
            !isLoad ? <ButtonText>Login</ButtonText> : <ActivityIndicator color="white" size={20}></ActivityIndicator>
          }
        </LoginButton>
        
        <DontHaveAccountContainer onPress={() => {
          navigator.navigate('Signup');
        }}>
          <DontHaveAccount>Não possui uma conta? <Link>Cadastre-se</Link></DontHaveAccount>
        </DontHaveAccountContainer>
      </Container>
    </>
  );
}

export default Login;