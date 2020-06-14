import React, { useState, useEffect } from 'react';
import { Image, ScrollView,ActivityIndicator, StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import * as WorkService from '../service/workService'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';

export default function App() {

  const [nome, setTitle] = useState("")
  const [endereco, setEndereco] = useState("")
  const [cidade, setCidade] = useState("")
  const [key, setKey] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(false)
  const [resPesquisa, setresPesquisa] = useState({
    latitude: 0,
    longitude: 0,
  })

  const pesquisaLatLong = async (endereco) => {
    let posicao = await Location.geocodeAsync(endereco)
      .then(resultado => {
        setresPesquisa(resultado[0])
        setresPesquisa({latitude: resultado[0].latitude,longitude: resultado[0].longitude })
        console.log(resultado[0])

        const work = {
          nome: nome,
          endereco: endereco,
          cidade: cidade,
          localicacao: {
          latitude: resultado[0].latitude,
          longitude: resultado[0].longitude,
          latitudeDelta: 10,
          longitudeDelta: 10,
          }
        }
        WorkService.saveWork(work, key)
        .then(res => {
          setMensagem("Dados Inseridos com Sucesso!")
          getCadastros()
        })
        .catch(erro => 
          {
            Alert.alert("Endereço Inválido!")
            setMensagem(erro)
          }
            )

      })
      .catch(erro => console.log(endereco + "\n" + erro))
  }

  const limparDados = () => {
    setTitle("")
    setEndereco("")
    setMensagem("")
    setKey("")
  }

  const salvaCadstro = async () => {
    if (!nome || !endereco || !cidade) {
      setMensagem("Campos Inválidos")
    } else {
   let std = await  pesquisaLatLong(endereco + "," + cidade).then(resultado => {

   })


    }
  }

  const apagaCadastro = (work) => {
    setLoading(true)
    WorkService.deleteWork(work)
      .then(() => getCadastros())
      .catch(erro => setMensagem(erro))
  }

  const getCadastros = () => {
    setLoading(true)
    WorkService.getWorks()
      .then(retorno => {
        console.log(retorno)
        setWorks(retorno)
        setLoading(false)
      })
      .catch(erro => setMensagem(erro))
  }


  useEffect(() => {
    getCadastros()

  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
<Image  source={require('./../../assets/logo.png')} style={styles.imagem} />
        
      <View  style={styles.cadastro}>
      <Text>Cadastrar Amigo: {mensagem}</Text>
      <TextInput
        style={nome ? styles.caixaTexto : styles.caixaTextoError}
        placeholder='Informe o nome do Amigo'
        value={nome}
        onChangeText={texto => setTitle(texto)}
      />
      <TextInput
        style={endereco ? styles.caixaTexto : styles.caixaTextoError}
        placeholder='Informe o endereço'
        value={endereco}
        onChangeText={texto => setEndereco(texto)}
      />
      <TextInput
        style={cidade ? styles.caixaTexto : styles.caixaTextoError}
        placeholder='Informe a cidade'
        value={cidade}
        onChangeText={texto => setCidade(texto)}
      />

      <View style={styles.caixaBotao}>
        <View style={styles.botao}>
          <Button
            title="Registrar"
            onPress={salvaCadstro}
          />
        </View>
        <View style={styles.botao}>
          <Button
            title="Limpar Dados"
            onPress={limparDados}
          />
        </View>
      </View>
      </View>
        <ActivityIndicator animating={loading} size="large" color="#00ff00" />

      <View>
      <Text>Cadastros:</Text>

        <FlatList
          data={works}
          renderItem={({ item }) =>
            <TouchableOpacity
              onPress={() => {
                setTitle(item.title)
                setEndereco(item.description)
                setKey(item.key)
              }}
            >

              <View style={styles.box}>
                <View style={styles.boxCollum}>
                  <Text style={styles.boxTitle}>Nome: {item.nome}</Text>
                  <Text>Endereço: {item.endereco}</Text>
                  <Text>Cidade: {item.cidade}</Text>
                  <Text>Lat: {item.localicacao.latitude}</Text>
                  <Text>Long: {item.localicacao.longitude}</Text>
                </View>
                <View style={styles.boxCollumAction}>
                  <Text>
                    <Icon
                      onPress={() => apagaCadastro(item)}
                      name="trash"
                      size={30} color="red" />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          }
        />


      </View>
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
    marginLeft: 10,
  }, 
  caixaTexto: {
    width: "97%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginTop: 7
  },
   caixaTextoError: {
    width: "97%",
    borderWidth: 1,
    borderColor: "red",
    padding: 5,
    marginTop: 7
  }, caixaBotao: {
    marginTop: 5,
    flexDirection: "row"
  },
  botao: {
    marginRight: 3
  },
  mensagemErro: {
    color: "red",
    marginLeft: 20
  },
   box: {
    flexDirection: "row",
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10
  }, 
  cadastro: {
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10
  }, 
  boxCollum: {
    width: "80%"
  },
  boxCollumAction: {
    width: "20%"
  },
  boxTitle: {
    fontWeight: "bold",
    color: "blue"
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
