import React, {useState, useEffect} from 'react';
import { Alert, Modal, Dimensions } from 'react-native';
import { Container, Title, Info, IconContainer, 
  CenterHorizontaly, ProfileImage, CameraContainer, Row, CameraIcon } from './styles';
import firebase, {Database} from '../../../env/firebase';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

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
  const [displayName, setDisplayName] = useState<string>("");
  const [exercises, setExercises] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [displayImage, setDisplayImage] = useState<string>("");
  const [contentIsLoad, setContentIsLoad] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);


  useEffect(() => {
    setDisplayName(firebase.auth().currentUser?.displayName || "");
    getUserInfo();
  }, [])

  async function getUserInfo() {
    const userInfo = await Database.collection('users').doc(firebase.auth().currentUser?.uid).get();
    const userData = userInfo.data();
    setExercises(userData?.exercisesCompleted);
    const realDate: string = convertDate(userData?.date)
    setDate(realDate);
    setDisplayImage(firebase.auth().currentUser?.photoURL || "");
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
  
  function pickImage() {
    Alert.alert(
      'Selecione uma imagem',
      'Por favor selecione uma imagem',
      [
        {
          text: 'Câmera',
          onPress: async () => {
            const {status} = await Camera.requestPermissionsAsync();
            if(status === 'granted') {
              setIsCameraOpen(true);
            }
          }
        }
      ]
    );
  }

  return (
    <>
      {
        isCameraOpen ?
        <>
          <Camera style={{flex: 1}}></Camera>
          <Row>
            <MaterialCommunityIcons style={{marginTop: height - 100, marginLeft: 10}} size={40} color={"white"} name="close"></MaterialCommunityIcons>
            <MaterialCommunityIcons style={{marginTop: height - 100}} size={40} color={"white"} name="circle"></MaterialCommunityIcons>
          </Row>
        </>
        :
        <Container>
          <CenterHorizontaly>
            {!renderDisplayImage() ?
              <IconContainer onPress={() => {
                pickImage();
              }}>
                <MaterialIcons name="person" size={34} color="white" />
              </IconContainer>
              :
              <></>
            }
          </CenterHorizontaly>
        </Container>
      }
    </>
  );
}

export default Profile;