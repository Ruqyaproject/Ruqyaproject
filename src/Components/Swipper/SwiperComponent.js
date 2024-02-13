import React from 'react'
import { Text, View, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../Colors/Colors';
import constants from '../../Constants/constants';
import styles from './style';



const SwiperComponent = ({ imageSrc, swiperTitle, swipeDescription }) => {
  return (
    <View style={styles.slide1}>
      <Image style={{
        height: hp('30%'),
        width: wp('100%'),
        resizeMode: "contain"

      }} source={imageSrc} />

      <View style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
        <Text style={{ fontSize: 20, fontWeight: "600", paddingTop: 30, textAlign: "center", lineHeight: wp(6.5), color: Colors.primaryColor,fontFamily:constants.PoppinsBold }}>
          {swiperTitle}
        </Text>
        <Text style={{ fontSize: 16, paddingTop: 15, textAlign: "center", lineHeight: wp(6.5), color: Colors.gray ,fontFamily:constants.PoppinsMedium}}>
          {swipeDescription}
        </Text>
      </View>
    </View>

  )
};

export default SwiperComponent;