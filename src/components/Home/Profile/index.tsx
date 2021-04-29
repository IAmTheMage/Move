import React, {useState, useEffect} from 'react';
import { Container, Title, Info } from './styles';
import firebase, {Database} from '../../../env/firebase';

const Profile: React.FC = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [exercises, setExercises] = useState<string>("");
  const [date, setDate] = useState<string>("");

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
  }

  function convertDate(date: any) {
    const splitedDate = date.split('/');
    const month = splitedDate[1];
    if(parseInt(month) < 10) {
      return `${splitedDate[0]}/0${month}/${splitedDate[2]}`
    }
    return date;
  }

  return (
    <Container>
      <Title>Perfil</Title>
      <Info>Nome: {displayName}</Info>
      <Info>Número de exercicios feitos: {exercises}</Info>
      <Info>Series completas: 8</Info>
      <Info>Conta criada em: {date}</Info>
    </Container>
  );
}

export default Profile;