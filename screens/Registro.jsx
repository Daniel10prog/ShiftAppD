import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

const Registro = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [nome, setnome] = useState('');
  const [isAdmin, setisAdmin] = useState(null);
  const [aberto, setaberto] = useState(false);
  const [papel, setpapel] = useState([
    {label: 'Chefe', value: true},
    {label: 'Trabalhador', value: false},
  ]);

  const Registar = () => {
    if (email && password && nome && isAdmin !== null) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore().collection('users').doc(auth().currentUser.uid).set({
            id: auth().currentUser.uid,
            nome: nome,
            email: email,
            admin: isAdmin,
          });
        })

        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert('Email ja em uso');
          }

          if (error.code === 'auth/invalid-email') {
            alert('Email Invalido');
          }

          if (error.code === 'auth/weak-password') {
            alert('Password fraca');
          }
        });
    } else {
      alert('Sem dados');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text
        style={{
          color: 'black',
          fontSize: 40,
          marginBottom: 20,
          fontWeight: 'bold',
        }}>
        Criar Conta
      </Text>

      <View style={styles.caixaTexto}>
        <TextInput
          value={nome}
          onChangeText={setnome}
          placeholder="Nome"
          placeholderTextColor={'black'}
          style={{fontSize: 20, color: 'black'}}></TextInput>
      </View>

      <View style={styles.caixaTexto}>
        <TextInput
          value={email}
          onChangeText={setemail}
          placeholder="Email"
          placeholderTextColor={'black'}
          style={{fontSize: 20, color: 'black'}}
          keyboardType="email-address"
          autoCapitalize="none"></TextInput>
      </View>

      <View style={styles.caixaTexto}>
        <TextInput
          value={password}
          onChangeText={setpassword}
          placeholder="Password"
          placeholderTextColor={'black'}
          secureTextEntry
          style={{fontSize: 20, color: 'black'}}></TextInput>
      </View>

      <DropDownPicker
        open={aberto}
        value={isAdmin}
        items={papel}
        setOpen={setaberto}
        setValue={setisAdmin}
        setItems={setpapel}
        placeholder="Papel"
        style={styles.caixaTexto}
        labelStyle={{
          fontSize: 20,
          color: 'black',
        }}
        placeholderStyle={{
          fontSize: 20,

          color: 'black',
        }}
      />

      <TouchableOpacity onPress={Registar} style={styles.botaoCriarConta}>
        <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold'}}>
          Criar conta
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Registro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#86E5FF',
  },

  caixaTexto: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '70%',
    height: 65,
    marginTop: 10,
    borderRadius: 20,
    borderBottomWidth: 5,
    borderWidth: 3,
  },

  botaoCriarConta: {
    backgroundColor: '#FFC93C',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 70,
    borderWidth: 3,
    marginTop: 20,
    borderBottomWidth: 10,
    borderRadius: 20,
  },
});
