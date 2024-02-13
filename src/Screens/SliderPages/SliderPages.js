import React, { useEffect, useContext } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import Colors from "../../Colors/Colors";
import SwiperComponent from "../../Components/Swipper/SwiperComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import images from "../../Constants/Images";
import Languages from "../../Constants/Languages";
import constants from "../../Constants/constants";
import { DataContext } from "../../ContextProvider/ContextProvider";

const SliderPages = ({ navigation }) => {

  const {saveToAsyncStorageCredentials } = useContext(DataContext)

  useEffect(() => {

  }, []);

  const handleBtnSkipOnClick=()=>{
    saveToAsyncStorageCredentials("skipStorage",true);
    navigation.navigate("Login");
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, paddingBottom: 20 }}>
      <Swiper
        style={{}}
        activeDotColor={Colors.primaryColor}
        showsButtons={false}
      >
        <SwiperComponent
          imageSrc={images.swiperImage.first}
          swiperTitle={Languages.swiperText.firstTitle}
          swipeDescription={Languages.swiperText.firstDescription}
        ></SwiperComponent>
        <SwiperComponent
          imageSrc={images.swiperImage.second}
          swiperTitle={Languages.swiperText.secondTitle}
          swipeDescription={Languages.swiperText.secondDescription}
        ></SwiperComponent>
        <SwiperComponent
          imageSrc={images.swiperImage.third}
          swiperTitle={Languages.swiperText.thirdTitle}
          swipeDescription={Languages.swiperText.thirdDescription}
        ></SwiperComponent>
      </Swiper>
      <View style={{ alignItems: "center", justifyContent: "center", marginVertical: wp(5), marginHorizontal: wp(5) }}>
        <TouchableOpacity onPress={()=>handleBtnSkipOnClick()} style={{  alignSelf: "flex-end", padding: wp(4), borderRadius: 5 }} >
          <Text style={{ color: Colors.primarySecondaryColor,fontFamily:constants.PoppinsMedium,fontSize:16, textDecorationLine: "underline" }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SliderPages;
