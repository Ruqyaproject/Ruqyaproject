import { Platform, StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../Colors/Colors";


const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
        margin: 20,
    },
});
export default styles;
