import React, {useState, useEffect} from 'react';
import {Video as VideoPlayer, Audio} from 'expo-av';
import { Container, VideoContainer, Title } from './styles';
import firebase, {Database, Storage} from '../../../../env/firebase';
import fire from 'firebase';
import { ActivityIndicator } from 'react-native';

interface Props {
  category: string;
}

interface VideoInformations {
  videoRef: string;
  audioRef: string;
  name: string;
  repetitions: number;
}

const Video: React.FC<Props> = ({category}) => {
  const [uri, setUri] = useState<string>("");
  const [audioUri, setAudioUri] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    getVideo();
  }, [])

  async function getVideo() {
    const resp: fire.firestore.QuerySnapshot<fire.firestore.DocumentData> = await Database.collection(category).limit(1).get();
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

  return (
    <Container>
      <Title>{title}</Title>
      <VideoContainer>
        {
          isLoad ? <VideoPlayer resizeMode="cover" shouldPlay isLooping={true} onLoad={execSound} source={{uri}} style={{width: '100%', height: '100%'}}></VideoPlayer> 
          : 
          <ActivityIndicator size="small" color="#28d8a1" style={{marginTop: 50}}></ActivityIndicator>
        }
      </VideoContainer>
    </Container>
  );
}

export default Video;