import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export const Container = styled.View`
  width: 100%;
  display: flex;
  height: 100%;
  background-color: #0f0f0f;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'PoppinsBold';
  margin-left: 10px;
  color: white;
  margin-top: 28px;
`;

export const Info = styled.Text`
  font-size: 18px;
  font-family: 'PoppinsRegular';
  margin-left: 10px;
  color: white;
  margin-top: 6px;
  margin-top: 20px;
`;