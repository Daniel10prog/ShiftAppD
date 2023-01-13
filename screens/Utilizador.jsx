import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartaoTarefa from '../components/CartaoTarefa';
import firestore from '@react-native-firebase/firestore';

const Utilizador = ({route, navigation}) => {
  const {nome, id, email} = route.params;

  const [Tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(id)
      .collection('tasks')
      .onSnapshot(querySnapshot => {
        const tarefas = [];
        querySnapshot.forEach(documentSnapshot => {
          tarefas.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setTarefas(tarefas);
      });

    return () => subscriber();
  }, []);

  var options = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            margin: 20,
            fontWeight: 'bold',
          }}>
          {nome}
        </Text>
        <Icon
          name="plus"
          style={{marginRight: 20}}
          size={40}
          color={'black'}
          onPress={() => {
            navigation.navigate('AddTarefa', {nome, email, id});
          }}></Icon>
      </View>

      <FlatList
        data={Tarefas}
        renderItem={({item}) => (
          <CartaoTarefa
            title={item.key}
            done={item.isDone}
            data={item.tempo.toDate().toLocaleString('pt-PT', options)}
            descricao={item.descricao}
            id={id}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Utilizador;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86E5FF',
  },
});
