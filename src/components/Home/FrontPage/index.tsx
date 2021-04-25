import React, {useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Container, Title, Row, Card, CardContent, CardText } from './styles';
import Video from './Video';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FrontPage: React.FC = () => {
  const [category, setCategory] = useState<string>("Top");
  const [visible, setVisible] = useState<boolean>(false);

  function openVideoModal(category: string) {
    setCategory(category);
    setVisible(true);
  }

  return (
    <ScrollView style={{width: '100%'}}>
      <Modal onRequestClose={() => {
        setVisible(false);
      }} transparent={true} visible={visible}>
        <Video category={category}></Video>
      </Modal>
      <Container >
        <Title>MOV<Title style={{color: "#28d8a1"}}>E</Title></Title>
        <Row>
          <TouchableOpacity onPress={() => {
            openVideoModal('Bot')
          }} style={{width: width * 0.9, borderRadius: 5}}>
            <Card resizeMode="cover" source={require('../../../../assets/Inf.jpg')}>
                <CardContent>
                  <CardText>Inferiores</CardText>
                </CardContent>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            openVideoModal('Circ')
          }} style={{width: width * 0.9, borderRadius: 5}}>
            <Card source={require('../../../../assets/Circ.png')}>
              <CardContent>
                <CardText>Circulatórios</CardText>
              </CardContent>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            openVideoModal('Resp')
          }} style={{width: width * 0.9, borderRadius: 5}}>
            <Card source={require('../../../../assets/Resp.jpg')}>
              <CardContent>
                <CardText>Respiratórios</CardText>
              </CardContent>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            openVideoModal('Top')
          }} style={{width: width * 0.9, borderRadius: 5}}>
            <Card source={require('../../../../assets/Sup.jpg')}>
              <CardContent>
                <CardText>Superiores</CardText>
              </CardContent>
            </Card>
          </TouchableOpacity>
        </Row>
      </Container>
    </ScrollView>
  );
}

export default FrontPage;