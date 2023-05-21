import { StyleSheet } from 'react-native'
import { s } from 'react-native-size-matters'
import { theme } from '../../styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  timerContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerDots: {
    color: theme.secondaryColor,
    fontWeight: 'bold'
  },
  timerMiliseconds: {
    fontSize: s(40),
  },
  timerInTraining: {
    color: theme.primaryColor,
    fontWeight: 'bold',
    paddingHorizontal: s(20),
    paddingVertical: s(5),
    borderRadius: s(999),
    fontSize: s(15),
  },
  timer: {
    color: 'white',
    fontSize: s(100),
  },
  roundTitle: {
    color: theme.primaryColor,
    fontSize: s(30),
  },
  controlContainer: {
    flex: 1,
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  playPauseControlButtonContainer: {
    backgroundColor: theme.secondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    height: s(100),
    width: s(100),
    borderRadius: s(999),
  },
  controlDetail: {
    color: theme.primaryColor
  },
})
