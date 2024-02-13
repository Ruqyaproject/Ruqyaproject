import { Platform, StyleSheet } from "react-native";
import Colors from "../../../Colors/Colors";
import constants from "../../../Constants/constants";

const styles = StyleSheet.create({
  DisclaimerRaqiHeaderText: {
    fontFamily: constants.PoppinsBold,
    color: Colors.primaryColor,
    fontSize: 14,
    textAlign: 'left'
  },
  DisclaimerRaqiBodyText: {
    fontFamily: constants.PoppinsRegular,
    color: Colors.gray,
    fontSize: 14,
  },
  RaqiDetailsFirstHeadingText: {
    fontFamily: constants.PoppinsMedium,
    color: Colors.primaryColor,
    fontSize: 16,
  },
  RaqiDetailsSecondHeadingText: {
    fontFamily: constants.PoppinsMedium,
    color: Colors.gray,
    fontSize: 12,
  },
  RaqiDetailsEmailText: {
    fontFamily: constants.PoppinsMedium,
    color: 'orange',
    textDecorationLine: 'underline',
    fontSize: 12,
  },
  DisclaimerRaqiContainerStyle: {
    paddingHorizontal: 20,
    paddingTop: 30,
    flex: 1,
    backgroundColor: Colors.white
  }
});
export default styles;
