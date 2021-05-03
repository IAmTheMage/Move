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
  font-size: 18px;
  font-family: 'PoppinsSemiBold';
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

export const Center = styled.View`
  width: 100%;
  align-items: center;
`;

export const CenterTouchable = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  margin-top: 14%;
`;

export const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const CameraContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  flex-direction: column;
  flex: 1;
`;


export const CameraIcon = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const ProfileName = styled.Text`
  font-size: 16px;
  color: white;
  font-family: 'PoppinsSemiBold';
  margin-top: 20px;
`;

export const InformationsContainerRow = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  margin-top: 18px;
`;
 
export const InformationContainerColumn = styled.View`
  align-items: center;
  width: 50%;
  justify-content: center;
`;

export const Information = styled.Text`
  font-size: 14px;
  font-family: 'PoppinsRegular';
  color: white;
`;

export const Input = styled.TextInput`
  width: 90%;
  background-color: #212121;
  border-radius: 4px;
  height: 50px;
  margin-top: 20px;
  padding: 10px;
`;

export const ButtonContainer = styled.TouchableOpacity`
  width: 90%;
  height: 40px;
  padding: 5px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background-color:#28d8a1;
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
`;