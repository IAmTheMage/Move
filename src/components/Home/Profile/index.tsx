import React, {useState, useEffect, useRef} from 'react';
import { Alert, Modal, Dimensions } from 'react-native';
import { Container, Title, Info, IconContainer, 
  CenterHorizontaly, ProfileImage, CameraContainer, CameraIcon, Center, ProfileName, InformationsContainerRow, 
  InformationContainerColumn, Information, CenterTouchable, Input, ButtonContainer, ButtonText
} from './styles';
import firebase, {Database, Storage} from '../../../env/firebase';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import { differenceInDays } from 'date-fns';
import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CameraComponent: React.FC = () => {
  return (
    <CameraContainer>
      <Camera style={{flex: 1}}></Camera>
    </CameraContainer>
  )
}

const Profile: React.FC = () => {
  const [cameraRef, setCameraRef] = useState<any>();
  const [displayName, setDisplayName] = useState<string>("");
  const [exercises, setExercises] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [displayImage, setDisplayImage] = useState<any>();
  const [contentIsLoad, setContentIsLoad] = useState<boolean>(false);
  const [series, setSeries] = useState<number>(0);
  const [average, setAverage] = useState<any>();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");


  useEffect(() => {
    setDisplayName(firebase.auth().currentUser?.displayName || "");
    getUserInfo();
  }, [])

  async function getUserInfo() {
    setDisplayImage(firebase.auth().currentUser?.photoURL || "");
    const userInfo = await Database.collection('users').doc(firebase.auth().currentUser?.uid).get();
    const userData = userInfo.data();
    setExercises(userData?.exercisesCompleted);
    setSeries(userData?.seriesCompleted)
    const realDate: string = userData?.date;
    setDate(realDate);
    const gettedDate = realDate.split('/');
    const averagePeriod = differenceInDays(Date.now(), new Date(parseInt(gettedDate[2]), parseInt(gettedDate[1]) - 1, parseInt(gettedDate[0]), 0, 0));
    const averagePlaceholder = parseInt(exercises) / averagePeriod;
    setAverage(averagePlaceholder);
    setContentIsLoad(true);
  }


  function renderDisplayImage() {
    if(contentIsLoad && displayImage) {
      return true;
    }
    return false;
  }
  
  async function pickImage() {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if(status === 'granted') {
      const image = await ImagePicker.launchCameraAsync();
      if(image.cancelled) {
        return false;
      }
      setDisplayImage(image.uri);
      uploadImage(image.uri);
    }
  }

  async function uploadImage(uri: any) {
    const resp = await fetch(uri);
    const blob = await resp.blob();
    const ref = Storage.ref().child(`/profileImages/${firebase.auth().currentUser?.uid}`);
    const pushed = await ref.put(blob);
    const url = await pushed.ref.getDownloadURL();
    await firebase.auth().currentUser?.updateProfile({
      photoURL: url
    })
  }

  function renderImage() {
    return (
      <CenterTouchable onPress={() => {
        pickImage();
      }}>
        <ProfileImage source={{uri: displayImage}}></ProfileImage>
      </CenterTouchable>
    )
  }

  return (
    <>
      <Container>
          <ScrollView>
            <CenterHorizontaly>
              {!renderDisplayImage() ?
                <IconContainer onPress={() => {
                  pickImage();
                }}>
                  <MaterialIcons name="person" size={34} color="white" />
                </IconContainer>
                :
                <>
                  {renderImage()}
                  <ProfileName>{firebase.auth().currentUser?.displayName}</ProfileName>
                  <InformationsContainerRow>
                    <InformationContainerColumn>
                      <Information>Exercicios completos: </Information>
                      <Information>{exercises}</Information>
                    </InformationContainerColumn>
                    <InformationContainerColumn>
                      <Information>Series completas: </Information>
                      <Information>{series}</Information>
                    </InformationContainerColumn>
                  </InformationsContainerRow>
                  <InformationsContainerRow>
                    <InformationContainerColumn>
                      <Information>Conta criada em: </Information>
                      <Information>{date}</Information>
                    </InformationContainerColumn>
                    <InformationContainerColumn>
                      <Information>Média de exercicios: </Information>
                      <Information>{average.toFixed(2)}</Information>
                    </InformationContainerColumn>
                  </InformationsContainerRow>
                </>
              }
            </CenterHorizontaly>
            <Title>Alterar senha</Title>
            <Center>
              <Input value={currentPassword} onChangeText={(e) => {
                setCurrentPassword(e);
              }} placeholderTextColor="white" secureTextEntry={true} placeholder="Digite sua senha atual"/>
            </Center>
            <Center>
              <Input value={newPassword} onChangeText={(e) => {
                setNewPassword(e);
              }} placeholderTextColor="white" secureTextEntry={true} placeholder="Digite sua nova senha"/>
            </Center>
            <Center>
              <Input value={confirmNewPassword} onChangeText={(e) => {
                setConfirmNewPassword(e);
              }} placeholderTextColor="white" secureTextEntry={true} placeholder="Confirme sua nova senha"/>
            </Center>
            <Center>
              <ButtonContainer>
                <ButtonText>Confimar</ButtonText>
              </ButtonContainer>
            </Center>
          </ScrollView>
        </Container>
    </>
  );
}

export default Profile;