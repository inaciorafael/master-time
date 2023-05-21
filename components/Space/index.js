import React from 'react'
import { View } from 'react-native'
import { s, sv } from 'react-native-size-matters'

const Space = (props) => {
  return (
    <View style={{ width: s(props.horizontal || 0), height: s(props.vertical) }} />
  )
}

export default Space
