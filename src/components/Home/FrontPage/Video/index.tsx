import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {Video as VideoPlayer, Audio} from 'expo-av';
import { Container, VideoContainer, Title } from './styles';
import firebase, {Database, Storage} from '../../../../env/firebase';
import fire from 'firebase';
import { ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  category: string;
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

const Video: React.FC<Props> = ({category}) => {
  const [offset, setOffset] = useState<number>(1);
  const [uri, setUri] = useState<string>("");
  const [audioUri, setAudioUri] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [upAndDownAnimation, setUpAndDownAnimation] = useState<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    //getVideo();
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
    const resp: fire.firestore.QuerySnapshot<fire.firestore.DocumentData> = initialValue || await Database.collection(category).orderBy('name').startAt(offset).limit(1).get();
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
    setIsLoad(false);
    const resp: fire.firestore.QuerySnapshot<fire.firestore.DocumentData> = await Database.collection(category).where('name', '==', `${CATEGORYREFS[category]} ${offset + 1}`).limit(1).get();
    resp.forEach(snapshot => {
      console.log(snapshot.data());
    })
    setOffset(offset + 1);
    getVideo(resp);
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  NextVideoContainer: {
    width: '100%',
    alignItems: 'center'
  }
})

export default Video;