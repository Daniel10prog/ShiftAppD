import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import Registro from './screens/Registro';
import AddTarefa from './screens/AddTarefa';
import firestore from '@react-native-firebase/firestore';
import Tarefa from './screens/Tarefa';
import store from './store';
import {Provider, useDispatch} from 'react-redux';
import {addUser} from './reducers/userSlice';
import Utilizador from './screens/Utilizador';
import Home from './screens/Home';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [logado, setlogado] = useState();
  const dispatch = useDispatch();

  const salvarUtilizadorAtual = user => {
    const {id, admin, email, nome} = user;
    dispatch(addUser({id, email, name: nome, role: admin}));
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .get()
          .then(user => {
            salvarUtilizadorAtual(user.data());
          });

        setlogado(true);
      } else {
        setlogado(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {logado ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}></Stack.Screen>

            <Stack.Screen
              name="AddTarefa"
              component={AddTarefa}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="Utilizador"
              component={Utilizador}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="Tarefa"
              component={Tarefa}
              options={{headerShown: false}}></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Registro"
              component={Registro}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TodaAPP = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default TodaAPP;
