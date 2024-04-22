import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { s } from "react-native-size-matters";

import useStore from "../store";
import { theme } from "../styles";

import Home from "../pages/Home";
import Timer from "../pages/Timer";
import EditRoutine from "../pages/EditRoutine";

const Stack = createNativeStackNavigator();

function Routes() {
  const { rotinas } = useStore((state) => state);
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        presentation: "transparentModal",
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Rotinas de treino",
          headerTitleStyle: {
            color: theme.primaryColor,
          },
          headerRight: () =>
            rotinas.length ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#D9E3F0",
                  width: s(40),
                  borderRadius: s(10),
                }}
              >
                <Text
                  style={{
                    fontSize: s(18),
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {rotinas.length}
                </Text>
              </View>
            ) : null,
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
        }}
      />
      <Stack.Screen
        name="Timer"
        component={Timer}
        options={(route) => ({
          headerTitle: route.route.params.name,
          headerTintColor: theme.primaryColor,
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditRoutine", { type: "edit" })
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: s(10),
                justifyContent: "center",
                backgroundColor: theme.appActionColor,
                padding: s(8),
                borderRadius: s(999),
              }}
            >
              <MaterialCommunityIcons
                name="grease-pencil"
                color={theme.primaryColor}
                size={s(20)}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="EditRoutine"
        component={EditRoutine}
        options={(route) => ({
          headerTitle: "",
          headerTintColor: theme.primaryColor,
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
        })}
      />
    </Stack.Navigator>
  );
}

export default Routes;
