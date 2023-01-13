import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {addUsersList, clearUsers} from '../reducers/usersListSlice';
import {useNavigation} from '@react-navigation/native';
import CartaoTarefa from '../components/CartaoTarefa';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {clearUser} from '../reducers/userSlice';

const Home = () => {
  const utilizadorAtual = useSelector(state => state.currentUser);

  if (utilizadorAtual.role === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#86E5FF',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            margin: 20,
            fontWeight: 'bold',
          }}>
          A carregar dados...
        </Text>
      </View>
    );
  }

  if (utilizadorAtual.role === true) {
    return <ScreenAdmin></ScreenAdmin>;
  } else if (utilizadorAtual.role === false) {
    return <ScreenTrabalhador></ScreenTrabalhador>;
  }
};

const ScreenTrabalhador = () => {
  const utilizadorAtual = useSelector(state => state.currentUser);
  const [Tarefas, setTarefas] = useState([]);
  const dispatch = useDispatch();

  const Logout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(clearUser());
        dispatch(clearUsers());
      });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(utilizadorAtual.id)
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
          Olá {utilizadorAtual.name}!
        </Text>
        <Icon
          name="logout"
          size={40}
          color={'black'}
          onPress={Logout}
          style={{marginRight: 30}}></Icon>
      </View>

      <FlatList
        data={Tarefas}
        renderItem={({item}) => (
          <CartaoTarefa
            title={item.key}
            done={item.isDone}
            data={item.tempo.toDate().toLocaleString('pt-PT', options)}
            descricao={item.descricao}
            id={utilizadorAtual.id}
          />
        )}
      />
    </SafeAreaView>
  );
};

const ScreenAdmin = () => {
  const dispatch = useDispatch();
  const utilizadorAtual = useSelector(state => state.currentUser);
  const todosUtilizadores = useSelector(state => state.allUsersList.users);
  const navigation = useNavigation();

  useEffect(() => {
    firestore()
      .collection('users')
      .where('admin', '==', utilizadorAtual.role === false)
      .onSnapshot(users => {
        if (!users.empty) {
          dispatch(clearUsers());
          users.forEach(user => {
            dispatch(addUsersList(user.data()));
          });
        }
      });
  }, [utilizadorAtual]);

  const Logout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(clearUser());
        dispatch(clearUsers());
      });
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
          Olá {utilizadorAtual.name}!
        </Text>
        <Icon
          name="logout"
          color={'black'}
          size={40}
          onPress={Logout}
          style={{marginRight: 20}}></Icon>
      </View>

      <View style={{marginLeft: 20, marginRight: 20}}>
        <FlatList
          data={todosUtilizadores}
          renderItem={({item}) => (
            <View style={styles.Botao_trabalhadores}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Utilizador', {
                    id: item.id,
                    nome: item.nome,
                    email: item.email,
                  });
                }}>
                <Text style={styles.lista}>{item.nome}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86E5FF',
  },

  lista: {
    color: 'black',
    fontSize: 30,
    padding: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  Botao_trabalhadores: {
    backgroundColor: '#FFC93C',
    marginTop: 30,
    justifyContent: 'center',
    borderWidth: 3,
    borderBottomWidth: 10,
    borderRadius: 20,
  },
});
