import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import firestore from '@react-native-firebase/firestore';

const Tarefa = ({route}) => {
  const {title, done, descricao, data, id} = route.params;
  const [changesMade, setChangesMade] = useState(false);
  const [feito, setfeito] = useState(done);

  const mudancas = () => {
    setChangesMade(true);
    setfeito(!feito);
  };

  const Guardar = () => {
    firestore()
      .collection('users')
      .doc(id)
      .collection('tasks')
      .doc(title)
      .update({
        isDone: feito,
      });
    // Save the value here
    setChangesMade(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{color: 'black', fontSize: 30, margin: 20, fontWeight: 'bold'}}>
        Detalhes da Tarefa
      </Text>

      <Text
        style={{
          color: 'black',
          fontSize: 30,
          alignSelf: 'center',
          fontWeight: 'bold',
          margin: 20,
        }}>
        {title}
      </Text>

      <Text style={{color: 'black', fontSize: 19, margin: 20}}>
        {descricao}
      </Text>

      <View style={{margin: 20}}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
          Realizar até:
        </Text>
        <Text style={{color: 'black', fontSize: 19}}>{data}</Text>
      </View>

      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            color: 'black',

            fontSize: 25,
          }}>
          Concluido:
        </Text>
        <BouncyCheckbox
          isChecked={feito}
          disableBuiltInState
          onPress={mudancas}
          fillColor="black"
          disableText
          size={50}
          style={{marginTop: 10}}
          iconImageStyle={{height: '50%', width: '50%'}}
        />
      </View>

      {changesMade && (
        <TouchableOpacity style={styles.botao_guardar} onPress={Guardar}>
          <Text style={{fontSize: 30, color: 'black', fontWeight: 'bold'}}>
            Guardar
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Tarefa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86E5FF',
  },
  botao_guardar: {
    backgroundColor: '#FFC93C',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 70,
    borderWidth: 3,
    marginTop: 30,
    borderBottomWidth: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },
});
