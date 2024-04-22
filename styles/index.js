import { StyleSheet } from "react-native";
import { s } from "react-native-size-matters";

export const theme = {
  primaryColor: "#F6F6F6",
  secondaryColor: "#D1882A",
  titleColor: "#31383D",
  backgroundColor: "#2D313E",
  appActionColor: "rgb(20 184 166)",
  infoTextColor: "#FFF4",
  infoIconColor: "#FFF4",
  trafficLightInTraining: "rgb(34 197 94)",
  trafficLightInAtRest: "rgb(234 179 8)",
  borderRadius: s(30),
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
};

export const globalStyles = StyleSheet.create({
  theme,
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    color: "#D9E3F0",
    fontSize: s(15),
    textAlign: "center",
  },
  infoIcon: {
    color: theme.infoIconColor,
  },
});
