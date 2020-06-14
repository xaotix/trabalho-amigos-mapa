import React, { useState, useEffect } from 'react';
import {  Image,StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as authService from '../service/authService'

export default function App(props) {
  const [mensagem, setMensagem] = useState("")
  const [email, setEmail] = useState("1119297@imed.edu.br")
  const [password, setPassword] = useState("qwe123")
  const { navigation } = props


  const validarLogin = () => {

    authService.login(email, password)
      .then(retorno => {
        navigation.navigate('Principal', {props})
      })
      .catch(erro => {
        setMensagem(erro.message)
      })
    //     
  }

  return (
    <View style={styles.container}>
      <Image  style={styles.imagem} source={require('./../../assets/logo.png')} style={styles.imagem} />

      <Text>Digite seu e-mail e senha para entrar</Text>
      <Text style={styles.mensagemErro}>{mensagem}</Text>
      <TextInput
        style={styles.caixaTexto}
        placeholder="e-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}

      />
      <TextInput
        style={styles.caixaTexto}
        placeholder="password"
        value={password}
        secureTextEntry
        onChangeText={texto => setPassword(texto)}
      />
      <View style={styles.caixaBotao}>
        <View style={styles.botao}>
          <Button
            title="Login"
            onPress={validarLogin}

          />
        </View>
        <View style={styles.botao}>
          <Button
            title="Novo Registro"
            style={styles.botao}
          />
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  imagem:
  {
    padding:1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, caixaTexto: {
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginTop: 5
  }, caixaBotao: {
    marginTop: 5,
    flexDirection: "row"
  },
  botao: {
    marginRight: 3
  },
  mensagemErro: {
    color: "red",
    marginLeft: 20  }
});
