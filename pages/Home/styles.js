import { StyleSheet } from 'react-native'
import { s } from 'react-native-size-matters'

import { theme } from '../../styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    padding: s(10),
  },
  floatingButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: s(20),
    borderRadius: s(30),
    backgroundColor: theme.appActionColor,
    position: 'absolute',
    bottom: s(20),
    right: s(20),
    ...theme.shadow,
  }
})
