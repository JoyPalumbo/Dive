import React, { useState, useContext } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { SignedInContext } from '../context/UserContext';
import DateTimePicker from '../components/DateTimePicker'

export default function CreateShowModal(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //shwo title
  const [showTitle, setShowTitle] = useState('');
  //band title
  const [bandName, setBandName] = useState('');
  //array of all bands
  const [bandNames, addBandName] = useState([userInfo.username]);
  //venue name
  const [venueName, setVenueName] = useState('');
  //venue address
  const [venueAddress, setvenueAddress] = useState('');
  //venue city
  const [venueCity, setVenueCity] = useState('');
  //venue state
  const [venueState, setvenueState] = useState('');
  //venue zip
  const [venueZip, setVenueZip] = useState('');
  //show date
  const [dateTime, setDateTime] = useState('');
  //show description
  const [showDesc, setShowDesc] = useState('');

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        {/* start of modal when showing */}
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          {/* back button */}
          <Ionicons
            name='ios-arrow-back'
            color='#59C3D1'
            size={32}
            style={styles.menuIcon}
            onPress={() => { setModalVisible(false) }}
          />
          <View style={styles.container}>
            <ScrollView style={styles.title}>
              <Text style={styles.text}>New Show</Text>
              {/* username text box */}
              <TextInput
                placeholder="Show Title"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setShowTitle}
                style={styles.input}
              />
              {/* Bands input */}
              <TextInput
                placeholder="Add Band"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setBandName}
                style={styles.input}
              />
              {/* create show button when modal is showing */}
              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => addBandName([...bandNames, bandName])}
              >
                <Text style={styles.buttonText}>Add Band</Text>
              </TouchableOpacity>

              {/* Venue input */}
              <TextInput
                placeholder="Show Venue"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setVenueName}
                style={styles.input}
              />
              {/* Address input */}
              <TextInput
                placeholder="Address"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setvenueAddress}
                style={styles.input}
              />
              {/* City input */}
              <TextInput
                placeholder="City"
                placeholderTextColor="#75A4AD"
                returnKeyType='next'
                onChangeText={setVenueCity}
                style={styles.input}
              />
              {/* State input */}
              <TextInput
                placeholder="State"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setvenueState}
                style={styles.input}
              />
              {/* Zip input */}
              <TextInput
                placeholder="Zip Code"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setVenueZip}
                style={styles.input}
              />

              {/* date time picker */}
              <DateTimePicker setDateTime={setDateTime}/>
              {/* Description input */}
              <TextInput
                placeholder="Show Description"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setShowDesc}
                style={styles.input}
              />
              {/* create show button when modal is showing */}
              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => {
                  setModalVisible(false);
                  axios.post('http://localhost:8080/venues', {
                    name: venueName,
                    address: venueAddress,
                    city: venueCity,
                    state: venueState,
                    zip_code: venueZip
                  })
                    .then(response => {
                      return axios.post('http://localhost:8080/shows', {
                      name: showTitle,
                      dateTime: dateTime,
                      photo: null,
                      venueName: venueName,
                      bandName: bandNames,
                      description: showDesc
                    })})
                    .then(response => response)
                    .catch(error => console.log('failed to create show', error));
              }}
              >
                <Text style={styles.buttonText}>Create Show</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* create show button when modal is hidden */}
      <TouchableOpacity
        style={styles.createShowContainer}
        onPress={() => { setModalVisible(true); }}
      >
        <Text style={styles.signupButtonText}>Create a show</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 40,
    fontWeight: 'bold'
  },
  title: {
    flex: 1,
    paddingTop: 30
  },
  text: {
    fontSize: 40,
    alignItems: 'center',
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    marginLeft: 75,
    marginBottom: 15
  },
  createShowContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: 140,
    marginHorizontal: 7
  },
  signupContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 15
  },
  modal: {
    marginLeft: 120
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
  },
  signupButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000'
  },
  menuIcon: {
    zIndex: 15,
    position: 'absolute',
    top: 40,
    left: 20,
  }
})