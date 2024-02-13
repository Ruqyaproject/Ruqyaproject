import { Platform, StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../Colors/Colors";
import constants from "../../Constants/constants";


const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 40,

    },
    textInputStyle: {
        height: wp(12),
        borderRadius: 10,
        fontSize: 14,
        marginVertical: 5,
        padding: wp(3),
        borderBottomWidth: 1,
        borderColor: Colors.primaryColor,
        fontFamily:constants.PoppinsMedium
    },

});
export default styles;
