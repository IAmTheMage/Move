import styled from 'styled-components/native';
import { Dimensions } from 'react-native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
//ede9ff
export const Container = styled.View`
  width: ${width}px;
  display: flex;
  align-items: center;
  height: ${height}px;
  background-color: #0f0f0f;
`;

export const Title = styled.Text`
  margin-top: 150px;
  font-size: 28px;
  color: #fff;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  width: 60%;
  background-color: #212121;
  border-radius: 4px;
  margin-left: 2%;
`;

export const DontHaveAccountContainer = styled.TouchableOpacity`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  width: 100%;
`;

export const DontHaveAccount = styled.Text`
  font-size: 14px;
  color: #999;
  margin-top: 10px;
`;

export const ForgotPasswordContainer = styled.View`
  display: flex;
  align-items: flex-end;
  width: 80%;
  margin-top: 10px;
`;

export const ForgotPassword = styled.Text`
  color:#28d8a1;
  font-size: 15px;
`;

export const LoginButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  width: 80%;
  padding: 13px 8px 13px 8px;
  color: white;
  font-weight: bold;
  background-color:#28d8a1;
  border-radius: 4px;
  margin-top: 20px;
  
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

export const Link = styled.Text`
  color: #28d8a1;
  font-size: 15px;
`;

export const InputView = styled.View`
  margin-top: 30px;
  width: 80%;
  background-color: #212121;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
