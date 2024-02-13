import React, { useState, useEffect, useContext, useRef } from "react";
import { Text, View, SafeAreaView, useWindowDimensions } from "react-native";
import Colors from "../../../Colors/Colors";
import JsonServer from "../../../Constants/JsonServer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext } from "../../../ContextProvider/ContextProvider";
import styles from "./style";
import AnimatedLoader from "react-native-animated-loader";



const introductionFragment = () => {
  const { getAPICall, userCredential, translateString } = useContext(DataContext);
  const [introductionText, setIntroductionText] = useState("")
  const [loading, setLoading] = useState(false);
  const [disclaimerText, setDisclaimerText] = useState("");
  const [ReadCareFullyString, setReadCareFullyString] = useState("")
  // useEffect(() => {
  //   setLoading(true);
  //   var urlTerms =
  //     JsonServer.baseURL +
  //     "services/app/Introduction/GetAll";
  //   getAPICall(urlTerms, (success, result, error) => {
  //     if (success == true) {
  //       setLoading(false);
  //       setIntroductionText(result.items[0].text);
  //     } else {
  //       setLoading(false);
  //       dropDownAlertRef.alertWithType("error", "Alert", error.message);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem("languageCode").then((valuelanguageCode) => {
      if (valuelanguageCode == null || valuelanguageCode == "") {
        getRaqiDisclaimer("en");
        translateString('en', "Please read carefully", (convertedText) => {
          setReadCareFullyString(convertedText[0]);
        });
      } else if (valuelanguageCode != null) {
        getRaqiDisclaimer(JSON.parse(valuelanguageCode));
        translateString(JSON.parse(valuelanguageCode), "Please read carefully", (convertedText) => {
          setReadCareFullyString(convertedText[0]);
        });
      }
    });

  }, []);
  const getRaqiDisclaimer = (languageCode) => {
    var urlTerms =
      JsonServer.baseURL +
      "services/app/LanguageIntroduction/GetAllLanguageIntroductionByLanguageCode?languageCode=" + languageCode;
    getAPICall(urlTerms, (success, result, error) => {
      if (success == true) {
        setLoading(false);
        setDisclaimerText(result.items[0].text);
        console.log(result.items[0].text)
      } else {
        setLoading(false);
        dropDownAlertRef.alertWithType("error", "Alert", error.message);
      }
    });
  }
  return (
    <View style={styles.IntroductionFragmentContainerStyle}>
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../../Assets/Lottie/loader.json")}
        animationStyle={{
          width: 100,
          height: 100
        }}
        speed={1}
      >
      </AnimatedLoader>
      <Text style={styles.IntroductionFragmentHeaderText}>
        {ReadCareFullyString}
      </Text>

      <Text style={styles.IntroductionFragmentBodyText}>
        {disclaimerText}
      </Text>
    </View>
  );
};

export default introductionFragment;
