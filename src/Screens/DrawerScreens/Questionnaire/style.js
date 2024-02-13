import { Platform, StyleSheet } from "react-native";
import Colors from "../../../Colors/Colors";
import constants from "../../../Constants/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  textInputStyle: {
    height: 40,
    borderRadius: 6,
    fontSize: 12,
    borderWidth: 1,
    borderColor: Colors.black,
    fontFamily: constants.PoppinsMedium,
    padding: 5
  },
  GuidelineContainerStyle: {
    paddingHorizontal: 20,
    paddingTop: 30,
    flex: 1,
    backgroundColor: Colors.white
  },
  GuidelineText: {
    fontFamily: constants.PoppinsMedium,
    color: Colors.primaryColor,
    fontSize: 12,
  },
  GuidelineHeadingText: {
    fontFamily: constants.PoppinsBold,
    color: Colors.primaryColor,
    fontSize: 14,
  },
  GuidelineBodyText: {
    fontFamily: constants.PoppinsRegular,
    color: Colors.gray,
    fontSize: 14,
  },
  GuidelineCard: {
    height: 100,
    width: 100,
    backgroundColor: Colors.primaryColor,
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center'
  },
  GuidelineCardDisabled: {
    height: 100,
    width: 100,
    backgroundColor: Colors.primarySecondaryColor,
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center'
  },
  GuidelineCardText: {
    fontFamily: constants.PoppinsMedium,
    color: Colors.white
  },
  GuidelineCardImage: {
    height: 45,
    width: 58,
  },
  GuidelineContainerCard: {
    height: 100,
    width: 100,
    backgroundColor: Colors.primaryColor,
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
  },
  textfont: {
    fontSize: 25,
    fontWeight: '900'
  },
  circularViewSelected: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "black",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primaryColor
  },
  circularView: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primaryColor
  },
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 30
  },
  modalView: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    height: 50,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
export default styles;
