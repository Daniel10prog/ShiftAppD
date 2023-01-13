import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTarefa = ({route, navigation}) => {
  const [descricao, setdescricao] = useState('');
  const [titulo, settitulo] = useState('');
  const [date, setdate] = useState(new Date());
  const [modo, setModo] = useState('date');
  const [aberto, setAberto] = useState(false);
  const [txt_tempo, setTxt_tempo] = useState('--:--');
  const [txt_data, settxt_data] = useState('--/--/--');
  const {nome, id} = route.params;

  const onChange = (event, selectedDate) => {
    const dataAtual = selectedDate || date;
    setAberto(Platform.OS === 'ios');
    setdate(dataAtual);
    let data = new Date(dataAtual);
    let data_formatada =
      data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
    let tempo_formatado =
      data.getHours() +
      'h:' +
      (data.getMinutes() < 10 ? '0' : '') +
      data.getMinutes() +
      'm';

    setTxt_tempo(tempo_formatado);
    settxt_data(data_formatada);
  };

  const TipoCalendario = modoAtual => {
    setAberto(true);
    setModo(modoAtual);
  };

  const AdicionarTarefa = () => {
    if (titulo && descricao && date) {
      firestore()
        .collection('users')
        .doc(id)
        .collection('tasks')
        .doc(titulo)
        .set({
          descricao: descricao,
          tempo: date,
          isDone: false,
        });

      navigation.navigate('Home');
      alert('Tarefa criada com sucesso');
    } else {
      alert('Falha ao criar tarefa');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: 'black',
          fontSize: 30,
          margin: 20,
          fontWeight: 'bold',
        }}>
        Nova Tarefa
      </Text>

      <View style={styles.caixaTexto}>
        <TextInput
          value={titulo}
          onChangeText={settitulo}
          placeholder="Titulo"
          style={{color: 'black', padding: 10, fontSize: 20}}
          placeholderTextColor={'black'}
          maxLength={20}></TextInput>
      </View>

      <View style={[styles.caixaTexto, {height: 150}]}>
        <TextInput
          value={descricao}
          onChangeText={setdescricao}
          placeholder="Descrição"
          placeholderTextColor={'black'}
          style={{color: 'black', padding: 10, fontSize: 20}}
          multiline></TextInput>
      </View>

      <Text
        style={{
          color: 'black',
          fontSize: 25,
          marginLeft: 20,
          marginTop: 20,
          fontWeight: 'bold',
        }}>
        Realizar até:
      </Text>

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 25, marginLeft: 20}}>
          Data:{' '}
        </Text>

        <Text style={{color: 'black', fontSize: 25}}>{txt_data}</Text>

        <Icon
          name="calendar"
          size={40}
          color={'black'}
          style={{alignSelf: 'center', marginLeft: 20}}
          onPress={() => TipoCalendario('date')}></Icon>
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 25, marginLeft: 20}}>
          Hora:{' '}
        </Text>

        <Text style={{color: 'black', fontSize: 25}}>{txt_tempo}</Text>

        <Icon
          name="clock"
          size={40}
          color={'black'}
          style={{alignSelf: 'center', marginLeft: 20}}
          onPress={() => TipoCalendario('time')}></Icon>
      </View>

      <TouchableOpacity style={styles.botao_guardar} onPress={AdicionarTarefa}>
        <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold'}}>
          Ad. Tarefa
        </Text>
      </TouchableOpacity>

      {aberto && (
        <DateTimePicker
          value={date}
          mode={modo}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}></DateTimePicker>
      )}
    </SafeAreaView>
  );
};

export default AddTarefa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86E5FF',
  },

  caixaTexto: {
    backgroundColor: 'white',
    width: '70%',
    height: 65,
    marginTop: 20,
    borderRadius: 20,
    borderBottomWidth: 5,
    borderWidth: 3,
    alignSelf: 'center',
  },

  botao_guardar: {
    backgroundColor: '#FFC93C',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 70,
    borderWidth: 3,
    marginTop: 30,
    borderBottomWidth: 10,
    borderRadius: 20,
  },
});
