import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #0f0f0f;
`;

export const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 5px;
`;

export const VideoContainer = styled.View`
  width: 100%;
  height: 400px;
`; 

export const FinishContainer = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: #0f0f0f;
`;

export const Column = styled.View`
  width: 100%;
  align-items: center;
`;

export const FinishTitle = styled.Text`
  font-size: 20px;
  margin-top: 8px;
  font-family: 'PoppinsSemiBold';
  color: white;
`;

export const FinishText = styled.Text`
  font-size: 16px;
  color: white;
  font-family: 'PoppinsRegular';
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;
  margin-top: 8px;
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: #28d8a1;
  padding: 8px;
  width: 80%;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-bottom: 40px;
`;

export const CloseText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;