import React, {useState, useEffect, useRef} from 'react';
import { Alert, Modal, Dimensions } from 'react-native';
import { Container, Title, Info, IconContainer, 
  CenterHorizontaly, ProfileImage, CameraContainer, CameraIcon, Center, ProfileName, InformationsContainerRow, InformationContainerColumn, Information } from './styles';
import firebase, {Database, Storage} from '../../../env/firebase';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    const realDate: string = convertDate(userData?.date)
    setDate(realDate);
    setContentIsLoad(true);
  }

  function convertDate(date: any) {
    const splitedDate = date.split('/');
    const month = splitedDate[1];
    if(parseInt(month) < 10) {
      return `${splitedDate[0]}/0${month}/${splitedDate[2]}`
    }
    return date;
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

  async function takePicture() {
    console.log("Camera tirou foto");
    cameraRef.takePictureAsync({onPictureSave: pictureSave});
  }

  function pictureSave(photo: any) {
    console.log(photo);
  }

  function renderImage() {
    console.log(displayImage);
    return (
      <Center>
        <ProfileImage source={{uri: displayImage}}></ProfileImage>
      </Center>
    )
  }

  return (
    <>
      <Container>
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
              </>
            }
          </CenterHorizontaly>
        </Container>
    </>
  );
}

export default Profile;