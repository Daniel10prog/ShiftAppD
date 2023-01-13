import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';

const CartaoTarefa = ({title, done, descricao, data, id}) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        nav.navigate('Tarefa', {title, done, descricao, data, id});
      }}>
      <Text
        style={{padding: 10, color: 'black', fontSize: 20, fontWeight: 'bold'}}>
        {title}
      </Text>
      <View
        style={{
          marginHorizontal: 10,
          alignItems: 'center',
        }}>
        <BouncyCheckbox
          isChecked={done}
          disableBuiltInState
          fillColor="black"
          disableText
        />
      </View>
    </TouchableOpacity>
  );
};

export default CartaoTarefa;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    height: 80,
    borderWidth: 3,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 10,
    borderRadius: 20,
    backgroundColor: '#FFC93C',
  },
});
