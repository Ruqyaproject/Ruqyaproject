import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../../Colors/Colors";
import LinearGradient from "react-native-linear-gradient";
import constants from "../../Constants/constants";
import AntDesign from 'react-native-vector-icons/AntDesign';

const Button_Component = ({ onPress, text, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ overflow: "hidden" }}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.9, y: 1.0 }}
        locations={[0, 0.7, 1]}
        colors={["#7ea3c3", "#4175A5", "#1C5990"]}
        style={{
          overflow: "hidden",
          borderRadius: 20,
          width: 160,
          height: 40,
          paddingLeft: 15,
          paddingRight: 15,
          justifyContent: 'center',

        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              flex: 2,
              fontSize: 14,
              fontFamily: constants.PoppinsRegular,
              color: "#ffffff",
              backgroundColor: "transparent",
              textAlign: 'center'
            }}
          >
            {text}
          </Text>
          <AntDesign name='arrowright' size={22} color={Colors.white} style={{
          }} />
        </View>

      </LinearGradient>
      {/* <Text style={{fontSize:12,color:Colors.white}}>{text}</Text> */}
    </TouchableOpacity>
  );
};

export default Button_Component;
