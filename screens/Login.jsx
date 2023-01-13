import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const Login = () => {
    if (email && pass) {
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {})
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            alert('Email Invalido');
          }

          if (error.code === 'auth/wrong-password') {
            alert('Password incorreta');
          }

          if (error.code === 'auth/user-not-found') {
            alert('Utilizador nao existe');
          }
        });
    } else {
      alert('Falta dados');
    }
  };

  const nav = useNavigation();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text
        style={{
          color: 'black',
          fontSize: 45,
          marginBottom: 20,
          fontWeight: 'bold',
        }}>
        Login
      </Text>
      <View style={styles.caixaTexto}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={{fontSize: 20, color: 'black'}}
          placeholderTextColor={'black'}
          keyboardType="email-address"
          autoCapitalize="none"></TextInput>
      </View>

      <View style={styles.caixaTexto}>
        <TextInput
          value={pass}
          onChangeText={setPass}
          placeholder="Password"
          placeholderTextColor={'black'}
          secureTextEntry
          style={{fontSize: 20, color: 'black'}}></TextInput>
      </View>

      <TouchableOpacity onPress={Login} style={styles.botaoLogin}>
        <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold'}}>
          Login
        </Text>
      </TouchableOpacity>

      <Text
        onPress={() => nav.navigate('Registro')}
        style={{
          color: 'black',
          fontSize: 20,
          marginTop: 20,
        }}>
        Registar Conta
      </Text>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#86E5FF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  caixaTexto: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '70%',
    height: 65,
    marginTop: 10,
    borderRadius: 20,
    borderBottomWidth: 5,
    borderWidth: 3,
  },

  botaoLogin: {
    backgroundColor: '#FFC93C',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 70,
    borderWidth: 3,
    marginTop: 15,
    borderBottomWidth: 10,
    borderRadius: 20,
  },
});
