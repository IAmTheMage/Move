import styled from 'styled-components/native';
import { Dimensions } from 'react-native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export const Container = styled.View`
  width: ${width}px;
  display: flex;
  height: ${height}px;
  background-color: #0f0f0f;
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: 18px;
  font-size: 28px;
  color: #fff;
  font-weight: bold;
`;