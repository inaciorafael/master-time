import { StyleSheet } from 'react-native'
import { s } from 'react-native-size-matters'

import { theme } from '../../styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    alignItems: 'center',
  },
  title: {
    color: theme.primaryColor,
    fontSize: s(25),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoText: {
    color: theme.infoTextColor,
    fontSize: s(17),
  },
  timeInput: {
    backgroundColor: theme.primaryColor,
    padding: s(10),
    borderRadius: s(10),
    fontSize: s(30),
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
})
