import { StyleSheet } from "react-native";
import { s } from "react-native-size-matters";

import { theme } from "../../styles";

export default StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    padding: s(10),
    borderBottomWidth: s(0.2),
    // ...theme.shadow,
  },
  title: {
    fontWeight: "bold",
    fontSize: s(18),
    color: theme.titleColor,
  },
  info: {
    fontSize: s(13),
    color: "#0009",
  },
  timeType: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingHorizontal: s(10),
    borderRadius: s(99),
    color: theme.primaryColor,
    fontSize: s(15),
    // fontWeight: 'bold'
  },
});
