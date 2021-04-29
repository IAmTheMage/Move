import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {Video as VideoPlayer, Audio} from 'expo-av';
import { Container, VideoContainer, Title, FinishContainer,
  Column, FinishTitle, FinishText, CloseButton, CloseText
} from './styles';
import {Database, Storage} from '../../../../env/firebase';
import {useDispatch} from 'react-redux';
import fire from 'firebase';
import { ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Lottie from 'lottie-react-native';

import sleep from '../../../../../assets/lottie/sleep.json';

interface Props {
  category: string;
  onClose: () => void;
}

const CATEGORYREFS: any = {
  Bot: "Inferior",
  Top: "Superior",
  Resp: "Respiratorio",
  Circ: "Circulatorio"
}

interface VideoInformations {
  videoRef: string;
  audioRef: string;
  name: string;
  repetitions: number;
}

const Video: React.FC<Props> = ({category, onClose}) => {
  const dispatcher = useDispatch();
  const [offset, setOffset] = useState<number>(5);
  const [uri, setUri] = useState<string>("");
  const [audioUri, setAudioUri] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [upAndDownAnimation, setUpAndDownAnimation] = useState<Animated.Value>(new Animated.Value(0));
  const [renderFinishAnimation, setRenderFinishAnimation] = useState<boolean>(false);

  useEffect(() => {
    getVideo();
    animate();
  }, [])

  function animate() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(upAndDownAnimation, {
          duration: 1000,
          toValue: 5,
          useNativeDriver: true
        }),
        Animated.timing(upAndDownAnimation, {
          duration: 1000,
          toValue: 0,
          useNativeDriver: true
        })
      ])
    ).start();
  }

  async function getVideo(initialValue: any = null) {
    const resp: fire.firestore.QuerySnapshot<fire.firestore.DocumentData> = await Database.collection(category).where('name', '==', `${CATEGORYREFS[category]} ${offset}`).limit(1).get();
    let data: any = [];
    resp.forEach(element => {
      data.push(element.data());
    })
    const videoInformations: VideoInformations = data[0];
    const ref = Storage.ref();
    const videoRef = ref.child(videoInformations.videoRef);
    const audioRef = ref.child(videoInformations.audioRef);
    const videoUri = await videoRef.getDownloadURL();
    const audioUri = await audioRef.getDownloadURL();
    setUri(videoUri);
    setAudioUri(audioUri);
    setTitle(videoInformations.name);
    setIsLoad(true);
  }

  async function execSound() {
    const {sound} = await Audio.Sound.createAsync({uri: audioUri});
    const status: any = await sound.getStatusAsync();
    const milisecs = status?.durationMillis;
    await sound.playAsync();
    setTimeout(() => {
      repetitionsPlay();
    }, milisecs)
  }

  async function repetitionsPlay() {
    let repetitionSound: Audio.Sound;
    if(category == "Resp") {
      const {sound: repetitionsSound} = await Audio.Sound.createAsync(require('../../../../../assets/10_vezes.mp3'));
      repetitionSound = repetitionsSound;
    }
    else {
      const {sound: repetitionsSound} = await Audio.Sound.createAsync(require('../../../../../assets/10a20_vezes.mp3'));
      repetitionSound = repetitionsSound;
    }
    await repetitionSound.playAsync();
  }

  async function nextVideo() {
    setOffset(offset + 1);
    dispatcher({type: 'END_VIDEO'})
    setIsLoad(false);
    const resp: fire.firestore.QuerySnapshot<fire.firestore.DocumentData> = await Database.collection(category).where('name', '==', `${CATEGORYREFS[category]} ${offset}`).limit(1).get();
    let data: any[] = [];
    resp.forEach(snapshot => {
      data.push(snapshot.data());
    })
    if(data.length === 0) {
      setRenderFinishAnimation(true);
    }
    getVideo(resp);
  }

  return (
    <>
      {!renderFinishAnimation ? 
        <Container>
          {isLoad && <Title>{title}</Title>}
          <VideoContainer>
            {
              isLoad ? <VideoPlayer resizeMode="cover" shouldPlay isLooping={true} onLoad={execSound} source={{uri}} style={{width: '100%', height: '100%'}}></VideoPlayer> 
              : 
              <ActivityIndicator size="small" color="#28d8a1" style={{marginTop: 50}}></ActivityIndicator>
            }
          </VideoContainer>
          {isLoad && 
            <Animated.View style={{...styles.NextVideoContainer, transform: [
              {
                translateY: upAndDownAnimation
              }
            ]}}>
              <TouchableOpacity onPress={() => {
                nextVideo();
              }}>
                <MaterialIcons name="arrow-drop-down" size={60} color="white"></MaterialIcons>
              </TouchableOpacity>
            </Animated.View>
          }
        </Container>
        :
        <FinishContainer>
          <Column>
            <Lottie source={sleep} style={{width: 250, height: 250}}></Lottie>
            <FinishTitle>Ufa...acabou</FinishTitle>
            <FinishText>Agora descanse um pouco, bebe uma água e reponha as energias antes de começar outra série.</FinishText>
          </Column>
          <CloseButton onPress={onClose}>
            <CloseText>Fechar</CloseText>
          </CloseButton>
        </FinishContainer>
      }
    </>
  );
}

const styles = StyleSheet.create({
  NextVideoContainer: {
    width: '100%',
    alignItems: 'center'
  }
})

export default Video;