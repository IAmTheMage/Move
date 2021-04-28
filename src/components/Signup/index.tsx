import React, {useEffect, useState} from 'react';
import { View, Text, ActivityIndicator, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Fragment } from 'react';
import { 
  Container,InputView,Input,Title, DontHaveAccountContainer, 
  DontHaveAccount, Link, LoginButton, ButtonText,
  ForgotPasswordContainer, ForgotPassword
} from './styled'
import Lottie from 'lottie-react-native'
import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native'



// import { Container } from './styles';

const SignUp:React.FC = () => {
  const signUpState = useSelector((state:any) => state.signUp);
  const dispatcher = useDispatch();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>(process.env.EMAILUTIL || "");
  const [password, setPassword] = useState<string>(process.env.PASSWORDUTIL || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();


  useEffect(() => {
    if(signUpState?.success) {
      navigation.navigate('Starter');
    }
  }, [signUpState?.success])

  return (
    <Fragment>
      <Container>
        <TouchableHighlight onPress={() => {
          setIsLoading(false);
        }}>
          <Title>MOV<Title style={{color: "#28d8a1"}}>E</Title></Title>
        </TouchableHighlight>
        <InputView>
          <MaterialIcons size={20} name="person" color="white"></MaterialIcons>
          <Input value={name} style={{color: "white"}} onChangeText={(e) => {setName(e)}} placeholderTextColor="white" placeholder="Nome"></Input>
        </InputView>
        <InputView>
          <MaterialIcons size={20} name="email" color="white"></MaterialIcons>
          <Input value={email} style={{color: "white"}} onChangeText={(e) => {setEmail(e)}} placeholderTextColor="white" placeholder="Email"></Input>
        </InputView>
        <InputView>
          <MaterialIcons size={20} name="lock" color="white"></MaterialIcons>
          <Input value={password} style={{color: "white"}} onChangeText={(e) => {setPassword(e)}} placeholderTextColor="white" secureTextEntry={true} placeholder="Senha"></Input>
        </InputView>
        {
          !isLoading ? <LoginButton onPress={() => {
            dispatcher({type: 'SIGNUP_WITH_EMAIL_AND_PASSWORD', email, password, name});
            setIsLoading(true);
          }}>
            <ButtonText>Cadastro</ButtonText>
          </LoginButton> : 
          <LoginButton onPress={() => {
            
          }}>
            <ActivityIndicator color="white" size="small"></ActivityIndicator>
          </LoginButton>
        }
        <DontHaveAccountContainer onPress={() => {
          navigation.navigate('Starter');
        }}>
          <DontHaveAccount>Já possui uma conta? <Link>Logue-se</Link></DontHaveAccount>
        </DontHaveAccountContainer>
      </Container>
    </Fragment>
  );
}

export default SignUp;