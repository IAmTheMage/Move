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