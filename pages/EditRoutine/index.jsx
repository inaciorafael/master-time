import { useState, useEffect } from 'react'
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { s } from 'react-native-size-matters'
import uuid from 'react-native-uuid'

import styles from './styles'
import { Space } from '../../components'
import { globalStyles, theme } from '../../styles'

import useStore from '../../store'

const EditRoutine = () => {
  const { params } = useRoute()
  const { adicionarRotina, currentTimerId, rotinas, removerRotinha } = useStore(state => state)
  const navigation = useNavigation()

  const [name, setName] = useState('')

  // Tempo de atividade
  const [uptimeMinutes, setUptimeMinutes] = useState('')
  const [uptimeSeconds, setUptimeSeconds] = useState('')

  // Tempo de descanso 
  const [restTimeMinutes, setRestTimeMinutes] = useState('')
  const [restTimeSeconds, setRestTimeSeconds] = useState('')

  const handleAddRoutine = () => {
    if (!uptimeMinutes || !uptimeSeconds || !restTimeMinutes || !restTimeSeconds || !name) {
      alert('Você deve preencher todos os campos para salvar a rotina')
      return
    }

    if (params.type === 'edit') {
      removerRotinha(currentTimerId)
    }

    adicionarRotina({
      id: uuid.v4(),
      name,
      upTime: {
        minutes: Number(uptimeMinutes),
        seconds: Number(uptimeSeconds),
      },
      restTime: {
        minutes: Number(restTimeMinutes),
        seconds: Number(restTimeSeconds),
      }
    })

    navigation.navigate('Home')
  }

  const handleChangeTimerForEdit = () => {
    if (currentTimerId) {
      const selectedTimer = rotinas.find(rotina => rotina.id === currentTimerId)

      setUptimeMinutes(String(selectedTimer.upTime.minutes))
      setUptimeSeconds(String(selectedTimer.upTime.seconds))
      setRestTimeMinutes(String(selectedTimer.restTime.minutes))
      setRestTimeSeconds(String(selectedTimer.restTime.seconds))
      setName(selectedTimer.name)
    }
  }

  useEffect(() => {
    if (params.type === 'edit') {
      handleChangeTimerForEdit()
    }
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{params.type === 'new' ? 'Cadastre uma nova rotina' : 'Altere os dados da sua rotina'}</Text>
        <Space vertical={15} />
        <Text style={styles.infoText}>Dê um nome a sua rotina</Text>
        <Space vertical={10} />
        <TextInput
          onChangeText={setName}
          value={name}
          placeholder="Nome da rotina"
          placeholderTextColor="#0004"
          style={{
            backgroundColor: theme.primaryColor,
            width: '100%',
            fontSize: s(16),
            padding: s(10),
            borderRadius: s(10),
          }}
        />
        <Space vertical={10} />
        <Text style={styles.infoText}>Defina o tempo de atividade</Text>
        <Space vertical={5} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, ...globalStyles.center }}>
            <Text style={{ ...styles.infoText, color: theme.secondaryColor }}>Minutos</Text>
          </View>
          <View style={{ flex: 1, ...globalStyles.center }}>
            <Text style={{ ...styles.infoText, color: theme.secondaryColor }}>Segundos</Text>
          </View>
        </View>

        <Space vertical={5} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, ...globalStyles.center }}>
            <TextInput
              style={styles.timeInput}
              maxLength={2}
              placeholderTextColor="#0004"
              placeholder="M"
              value={uptimeMinutes}
              onChangeText={setUptimeMinutes}
              keyboardType="numeric"
            />
          </View>
          <Text style={{ color: theme.primaryColor, fontWeight: 'bold', fontSize: s(50) }}>:</Text>
          <View style={{ flex: 1, ...globalStyles.center }}>
            <TextInput
              style={styles.timeInput}
              placeholderTextColor="#0004"
              placeholder="S"
              value={uptimeSeconds}
              onChangeText={setUptimeSeconds}
              maxLength={2}
              keyboardType="numeric"
            />
          </View>
        </View>


        <Space vertical={10} />
        <Text style={styles.infoText}>Defina o tempo de descanso</Text>
        <Space vertical={5} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, ...globalStyles.center }}>
            <Text style={{ ...styles.infoText, color: theme.secondaryColor }}>Minutos</Text>
          </View>
          <View style={{ flex: 1, ...globalStyles.center }}>
            <Text style={{ ...styles.infoText, color: theme.secondaryColor }}>Segundos</Text>
          </View>
        </View>

        <Space vertical={5} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, ...globalStyles.center }}>
            <TextInput
              style={styles.timeInput}
              maxLength={2}
              placeholderTextColor="#0004"
              placeholder="M"
              value={restTimeMinutes}
              onChangeText={setRestTimeMinutes}
              keyboardType="numeric"
            />
          </View>
          <Text style={{ color: theme.primaryColor, fontWeight: 'bold', fontSize: s(50) }}>:</Text>
          <View style={{ flex: 1, ...globalStyles.center }}>
            <TextInput
              style={styles.timeInput}
              maxLength={2}
              placeholder="S"
              value={restTimeSeconds}
              onChangeText={setRestTimeSeconds}
              placeholderTextColor="#0004"
              keyboardType="numeric"
            />
          </View>
        </View>

        <Space vertical={10} />
        <TouchableOpacity onPress={handleAddRoutine} style={{
          backgroundColor: theme.appActionColor,
          paddingVertical: s(10),
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: s(10),
        }}>
          <Text style={{ color: theme.primaryColor, fontSize: s(15), fontWeight: 'bold' }}>SALVAR ROTINA</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default EditRoutine
