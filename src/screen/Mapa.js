import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet,  View, Dimensions, Alert, TouchableOpacity,  KeyboardAvoidingView, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as WorkService from '../service/workService'

export default function App() {


  const [lista, setLista] = useState([])
  const [loading, setLoading] = useState(false)



  const [posicaoAtual, setPosicaoAtual] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 2,
    longitudeDelta: 2,
  })

  const getCadastros = () => {
    setLoading(true)
    WorkService.getWorks()
      .then(retorno => {
        console.log(retorno)
        setLista(retorno)
        setLoading(false)
      })
      .catch(erro => setMensagem(erro))
  }

  const getMyPosition = async () => {
    let { status } = await Location.requestPermissionsAsync()

    if (status !== "granted") {
      Alert.alert("Permissão de acesso a localização negado!")
    } else {
      await Location.getCurrentPositionAsync({})
        .then(retorno => setPosicaoAtual(retorno.coords))
        .catch(error => Alert.alert("Parece que o GPS Está desligado ou com problemas!"))
    }
  }
  useEffect(() => {
    getMyPosition()
    getCadastros()



  }, [])



  return  posicaoAtual != undefined ?
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>

          <MapView  ref={map => {this.map = map}}
            style={styles.mapStyle}
            initialRegion={posicaoAtual}
            region={posicaoAtual}
          >
            {
              lista.map((item, key) => <Marker
                key={key}
                coordinate={item.localicacao}
                title={item.nome}
                
                description={item.endereco}
              />)
            }

            {posicaoAtual ? <Marker
              coordinate={posicaoAtual}
              title={"Onde eu estou!"}
              description={"Minha Casa"}
            />

              : null}



          </MapView>
          <View style={styles.caixaBotao}>
            <TouchableOpacity style={styles.myLocationBox}
              onPress={() => {
                setPosicaoAtual({
                  latitude: posicaoAtual.latitude,
                  longitude: posicaoAtual.longitude,
                  latitudeDelta: 3,
                  longitudeDelta: 3,
                })
              }}
            >
              <Icon name="my-location" color={'#fff'} size={30} />
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  :null;
}

const styles = StyleSheet.create({
  caixaBotao: {
    flexDirection: 'row'
  },
  caixaTexto: {
    width: "95%",
    marginBottom: 10,
    marginTop: 25,
    marginLeft: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  positionBox: {
    marginTop: -170,
    marginHorizontal: 40,
    padding: 25
  },
  myLocationBox: {
    borderRadius: 150,
    width: 50,
    height: 50,
    marginTop: -130,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  }
});
