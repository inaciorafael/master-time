import React from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import { s } from 'react-native-size-matters'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'

import { Container, Space, RoutineCard } from '../../components'
import { globalStyles } from '../../styles'
import useStore from '../../store';

import styles from './styles';

const Home = () => {
  const { rotinas } = useStore(state => state)
  const navigation = useNavigation()

  if (!rotinas.length) {
    return (
      <Container>
        <Space vertical={20} />
        <FontAwesome5 name="feather-alt" size={s(30)} color={globalStyles.infoIcon.color} />
        <Space vertical={20} />
        <Text style={globalStyles.infoText}>Você não possuí nenhuma rotina de treino</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditRoutine', { type: 'new' })} style={styles.floatingButtonContainer}>
          <MaterialIcons name="post-add" color="white" size={s(30)} />
        </TouchableOpacity>
      </Container>
    )
  }

  return (
    <View style={styles.container}>
      <Space vertical={20} />
      <FlatList
        contentContainerStyle={{ gap: s(10) }}
        showsVerticalScrollIndicator={false}
        data={rotinas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <React.Fragment key={item.id}>
            <RoutineCard
              {...item}
            />
          </React.Fragment>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('EditRoutine', { type: 'new' })} style={styles.floatingButtonContainer}>
        <MaterialIcons name="post-add" color="white" size={s(30)} />
      </TouchableOpacity>
    </View>
  )
}

export default Home
