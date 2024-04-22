import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { useKeepAwake, activateKeepAwakeAsync } from "expo-keep-awake";

import Routes from "./routes";
import { theme } from "./styles";

export default function App() {
  useKeepAwake();
  activateKeepAwakeAsync();

  return (
    <NavigationContainer>
      <Routes />
      <StatusBar backgroundColor={theme.backgroundColor} style="light" />
    </NavigationContainer>
  );
}
