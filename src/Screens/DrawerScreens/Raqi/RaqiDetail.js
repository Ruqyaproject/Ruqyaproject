import React, { useState, useEffect, useContext } from "react";
import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Colors from "../../../Colors/Colors";
import JsonServer from "../../../Constants/JsonServer";
import { DataContext } from "../../../ContextProvider/ContextProvider";
import RaqiDetailComponent from "./RaqiDetailComponent";


const RaqiDetail = () => {
  const [children, setChildren] = useState([]);

  const { getAPICall, userCredential } = useContext(DataContext);


  const openCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`)
  }

  const openMail = (mail) => {
    Linking.openURL('mailto:' + mail + '?subject=I have a Query&body=')
  }

  useEffect(() => {
    var urlTerms =
      JsonServer.baseURL +
      "services/app/RaqisDetails/GetAllRaqisDetailsbyName";
    getAPICall(urlTerms, (success, result, error) => {
      if (success == true) {
        setChildren(result.items);
      } else {
        dropDownAlertRef.alertWithType("error", "Alert", error.message);
      }
    });
  }, []);
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor, paddingTop: 0 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: "column", }} horizontal={false}>
        <RaqiDetailComponent openMail={openMail} openCall={openCall} children={children} />
      </ScrollView>
    </SafeAreaView>
  )
};

export default RaqiDetail;