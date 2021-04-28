import React, {useState} from 'react';
import {Modal} from 'react-native';
import { Container, Title, Info } from './styles';

const Profile: React.FC = () => {

  return (
    <Container>
      <Title>Perfil</Title>
      <Info>Nome: Gustavo Gonçalves Silva</Info>
      <Info>Exercicios feitos por hora: 2 horas</Info>
      <Info>Número de exercicios feitos: 25</Info>
      <Info>Series completas: 8</Info>
      <Info>Conta criada em: 26/04/2021</Info>
    </Container>
  );
}

export default Profile;