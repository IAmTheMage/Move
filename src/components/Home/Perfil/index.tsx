import React, {useState} from 'react';
import {Modal} from 'react-native';
import Video from '../Video';
import { CategoryTitle,Category, CardsContainer, Container, Exercises, ExercisesContainer, Title } from './styles';

const Home: React.FC = () => {
  const [videosModalIsOpen, setVideosModalIsOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  
  function openModal(category: string) {
    setVideosModalIsOpen(true);
    setCategory(category);
  }

  return (
    <Container>
      <Modal visible={videosModalIsOpen}>
        <Video category={category}></Video>
      </Modal>
      <Title>MOV<Title style={{color: "#28d8a1"}}>E</Title></Title>
      <ExercisesContainer>
        <Exercises>Categorias:</Exercises>
      </ExercisesContainer>
      <CardsContainer>
        <Category onPress={() => {
          openModal('Top');
        }} style={{shadowColor: '#fff', shadowOffset: {
          width: 0,
          height: 2
        }, shadowOpacity: 0.25
        }}>
          <CategoryTitle>Superior</CategoryTitle>
        </Category>
        <Category>
          <CategoryTitle>Inferior</CategoryTitle>
        </Category>
        <Category>
          <CategoryTitle>Circulatorio</CategoryTitle>
        </Category>
        <Category>
          <CategoryTitle>Respiratorio</CategoryTitle>
        </Category>
      </CardsContainer>
    </Container>
  );
}

export default Home;