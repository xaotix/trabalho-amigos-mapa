import React, { useState, useEffect } from 'react';
import {Image, TouchableHighlight, ActivityIndicator, StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App(props) {
  const { navigation } = props


  return (
    <View style={styles.container}>

<Image  source={require('./../../assets/logo.png')} style={styles.imagem} />

<TouchableHighlight style={styles.sombra}>
<Button   style={styles.botaoDefault}
  title="Mapa"
  onPress={() => navigation.navigate('Mapa', {props})}
/></TouchableHighlight>
<TouchableHighlight style={styles.sombra}>
<Button   style={styles.botaoDefault}

  title="Cadastro Amigos"
  onPress={() => navigation.navigate('Cadastro', {props})}
/></TouchableHighlight>
<TouchableHighlight style={styles.sombra}>
<Button     style={styles.botaoDefault}

  title="Logout"
  onPress={() => navigation.navigate('Login', {props})}
/>
</TouchableHighlight>
</View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
},
  botaoDefault: {
    marginTop: 15,
    padding: 5,
},
sombra:
{
  height: 40,
  borderRadius:10,
  backgroundColor : "black",
  marginLeft :20,
  marginRight:20,
  marginTop :20
}

});
