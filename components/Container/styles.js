import { StyleSheet } from 'react-native'
import { s } from 'react-native-size-matters'

import { globalStyles } from '../../styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalStyles.theme.backgroundColor,
    padding: s(10)
  }
})
