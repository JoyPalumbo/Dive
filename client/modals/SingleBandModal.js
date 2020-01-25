import React, { useState, useEffect } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import { Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';


export default function SingleBandModal(props) {
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //set username to text in username textInput
  const [showTitle, setShowTitle] = useState('');
  const [singleBand, setBand] = useState([]);
  const [shows, setShows] = useState([]);
  let band = props.bandID;
  // console.log(band)

  useEffect(() => {
    axios.get(`http://localhost:8080/bands/${band}/shows`)
      .then((response) => {
        // console.log("getting a bands shows from db", response.data)
        setShows(response.data);
      })
      .catch((err) => {
        // console.log("frontend not getting band shows from db", err);
      })
  }, [])

  console.log("getting a bands all their shows", shows.shows);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        {/* start of modal when showing */}
        <SafeAreaView behavior="padding" style={styles.container}>
          {/* back button */}
          <Ionicons
            name='ios-arrow-back'
            color='#59C3D1'
            size={32}
            style={styles.menuIcon}
            onPress={() => { setModalVisible(false) }}
          />

          <ScrollView style={{ marginTop: 30 }}>
            <Text style={styles.headerText} key={singleBand.id}>{singleBand.name}</Text>

            <Text style={{ marginBottom: 10, color: '#fff', fontSize: 30 }}>Name: {singleBand.name}</Text>
            <Text style={{ marginBottom: 10, color: '#fff', fontSize: 30 }}>Bio: {singleBand.bio}</Text>
            <Text style={styles.headerText}>Shows</Text>
            {shows.shows.map(show => {
              return (
                <Card
                  title={show.name}
                  style={styles.card}
                  key={show.id}
                  backgroundColor='#fff'
                  borderRadius={10}
                  padding={10}
                // image={require('../images/pic2.jpg')}
                >


                </Card>
              )
            })}

          </ScrollView>
        </SafeAreaView>
      </Modal>
      {/* create show button when modal is hidden */}
      <TouchableOpacity
        style={styles.signupContainer}
        onPress={() => {
          setModalVisible(true);
          //axios
          axios.get(`http://localhost:8080/users/${band}`)
            .then((response) => {
              console.log("getting single band", response)
              setBand(response.data);
            })
            .catch((err) => {
              console.log("frontend not getting single band from db", err);
            })
        }}
      >
        <Text style={styles.signupButtonText}>Show More</Text>
      </TouchableOpacity >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 50,
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20
  },
  card: {
    backgroundColor: '#75A4AD',
    borderRadius: 10
  },
  button: {
    borderRadius: 5,
    marginHorizontal: 40,
    backgroundColor: '#59C3D1',
  },
  cardText: {
    fontSize: 30,
  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20,
  }
})