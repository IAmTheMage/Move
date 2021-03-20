import styled from 'styled-components/native';
import { Dimensions } from 'react-native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export const Container = styled.View`
  width: ${width}px;
  display: flex;
  height: 100%;
  background-color: #0f0f0f;
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: 18px;
  font-size: 28px;
  color: #fff;
  font-weight: bold;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  margin-top:10px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Card = styled.ImageBackground`
  width: 100%;
  height: 150px;
  margin-bottom: 30px;
  justify-content: flex-end;
`;

export const CardContent = styled.View`
  width: 100%;
  height: 30px;
  background-color: black;
  opacity: 0.8;
`;

export const CardText = styled.Text`
  color: white;
  font-size: 18px;
  margin-left: 5px;
  font-weight: bold;
`;