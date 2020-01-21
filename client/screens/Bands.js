import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MenuButton from '../components/MenuButton'

export default class LinksScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <Text style={styles.text}>Bands</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: '#fff'
  }
})