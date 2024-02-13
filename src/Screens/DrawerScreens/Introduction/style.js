import { Platform, StyleSheet } from "react-native";
import Colors from "../../../Colors/Colors";
import constants from "../../../Constants/constants";

const styles = StyleSheet.create({
  IntroductionFragmentHeaderText: {
   fontFamily:constants.PoppinsBold,
   color:Colors.primaryColor,
   fontSize:14
  },
  IntroductionFragmentBodyText: {
    fontFamily:constants.PoppinsRegular,
   color:Colors.gray,
   fontSize:14,
   marginTop:8
  },
  IntroductionFragmentContainerStyle:{
    paddingHorizontal:20,
    paddingTop:30,
    flex:1,
    backgroundColor:Colors.white
  }
});
export default styles;
