import { Platform, StyleSheet } from "react-native";
import Colors from "../../../Colors/Colors";
import constants from "../../../Constants/constants";

const styles = StyleSheet.create({
  DashboardCard: {
    height: 100,
    width: 100,
    backgroundColor: Colors.primaryColor,
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center'
  },
  DashboardCardDisabled: {
    height: 100,
    width: 100,
    backgroundColor: Colors.primarySecondaryColor,
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center'
  },
  DashboardCardText: {
    fontFamily: constants.PoppinsMedium,
    color: Colors.gray
  },
  DashboardCardImage: {
    height: 45,
    width: 58,
  },
  DashboardContainerCard: {
    marginRight: 10,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default styles;
