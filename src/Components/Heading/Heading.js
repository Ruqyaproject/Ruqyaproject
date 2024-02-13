import { View, Text, Platform } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../Colors/Colors';

const Heading = ({ text }) => {
    return (
        <View style={{ marginTop: wp(2), alignSelf: "flex-start" }}>
            <Text style={{ fontSize: wp(3.8), color: Colors.black, lineHeight: Platform.OS == "ios" ? wp(6) : null, marginBottom: Platform.OS == "ios" ? wp(-1) : null }}>{text}</Text>
        </View>
    );
};

export default Heading;
