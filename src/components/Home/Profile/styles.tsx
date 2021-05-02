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
  margin-top: 30px;
`;

export const CenterHorizontaly = styled.View`
  width: 100%;
  align-items: center;
`;

export const IconContainer = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 1px solid white;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
`;

export const ProfileImage = styled.ImageBackground`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const CameraContainer = styled.View`
  position: absolute;
  bottom: 0;
  flex-direction: row;
  flex: 1;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  position: absolute;
  height: 100%;
  justify-content: space-between;
`;

export const CameraIcon = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;