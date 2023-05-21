import { Text, TouchableOpacity, View, Alert } from 'react-native'
import { s } from 'react-native-size-matters'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { FORMAT } from '../../utils'
import { theme } from '../../styles'

import useStore from '../../store'

import styles from './styles'

dayjs.extend(duration)

const RoutineCard = (props) => {
  const navigation = useNavigation()
  const { removerRotinha } = useStore(state => state)

  const handleRemoveRoutine = () => {
    Alert.alert('Atenção!', `Tem certeza de que deseja apagar a rotina ${props.name}?`, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      { text: 'Sim', onPress: () => removerRotinha(props.id) }
    ])
  }

  const getUptimeRoutine = () => {
    return FORMAT.secondsToTimeHumanize(props.upTime.minutes * 60 + props.upTime.seconds)
  }

  const getRestimeRoutine = () => {
    return FORMAT.secondsToTimeHumanize(props.restTime.minutes * 60 + props.restTime.seconds)
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Timer', { ...props })} style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.title}>{props.name}</Text>
          <View style={{ flexDirection: 'row', gap: s(10) }}>
            <Text style={styles.info}>{getUptimeRoutine()} - {getRestimeRoutine()}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: s(10) }}>
          <Ionicons name="alarm-outline" size={s(30)} color={theme.titleColor} />
          <TouchableOpacity onPress={handleRemoveRoutine} style={{ backgroundColor: '#FD413C', padding: s(13), borderRadius: s(15), alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesome5 name="trash" size={s(20)} color={theme.primaryColor} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RoutineCard
