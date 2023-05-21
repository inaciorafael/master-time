import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes'
import { theme } from './styles';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
      <StatusBar backgroundColor={theme.backgroundColor} style="light" />
    </NavigationContainer>
  );
}
