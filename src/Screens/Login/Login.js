import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useRef, useState, useContext } from "react";

import Colors from "../../Colors/Colors";
import styles from "./style";
import constants from "../../Constants/constants";
import Button_Component from "../../Components/Button/Button_Component";
import { DataContext } from "../../ContextProvider/ContextProvider";
import DropdownAlert from "react-native-dropdownalert";
import JsonServer from "../../Constants/JsonServer";
import AnimatedLoader from "react-native-animated-loader";

const Login = ({ navigation }) => {
  const ref_input_userName = useRef();
  const ref_input_password = useRef();


  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("ali@gmail.com");
  const [password, setPassword] = useState("123qwe");
  const [rememberClient, setrememberClient] = useState(true);

  const {
    getAccessToken,
    getTenantId,
    saveToAsyncStorageCredentials,
    setUserCredential,


  } = useContext(DataContext);
  let dropDownAlertRef = useRef(null);





  const handlePressSignupOnClick = () => {
    navigation.navigate("Signup");
  };
  const handleLoginPress = () => {
    var dataToInsert = {
      userNameOrEmailAddress: userName,
      password: password,
      rememberClient: rememberClient
    };
    setLoading(true);
    var tenancyName = { tenancyName: JsonServer.tenancyName };
    getTenantId(tenancyName, (success, result, error) => {
      if (success == true) {
        var tenantId = result.result.tenantId
        if (result.result.tenantId !== null) {
          saveToAsyncStorageCredentials("TenantId", tenantId);
          getAccessToken(tenantId, dataToInsert, (success, result, error) => {
            if (success == true) {
              console.log(result)
              setLoading(false);
              dropDownAlertRef.alertWithType('custom', 'Success', 'You are Successfully Login')
              setUserCredential(JSON.stringify(dataToInsert));
              saveToAsyncStorageCredentials("LoginDetails", dataToInsert);
              saveToAsyncStorageCredentials("UserDetails", result);
              saveToAsyncStorageCredentials("userid", result.userId);

              setTimeout(() => navigation.navigate("Home"), 1200)
            }
            else {
              setLoading(false);
              dropDownAlertRef.alertWithType('error', 'Alert', error)
            }
          }
          )
        }
        else {
          setLoading(false);
          dropDownAlertRef.alertWithType('error', 'Alert', "Please provide correct school name")

        }
      }
      else {
        setLoading(false);
        dropDownAlertRef.alertWithType('error', 'Alert', error.message)
      }
    })
  };
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../Assets/signin.png")}
    >
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../Assets/Lottie/loader.json")}
        animationStyle={{
          width: 100,
          height: 100
        }}
        speed={1}
      >
      </AnimatedLoader>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <DropdownAlert
          ref={(ref) => {
            if (ref) {
              dropDownAlertRef = ref;
            }
          }}
          containerStyle={{ backgroundColor: "green" }}
          closeInterval={1000}
          showCancel={false}
        />

        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 18,
              // textAlign: "center",
              color: Colors.black,
              fontFamily: constants.PoppinsBold
            }}
          >
            Login
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors.gray,
              fontFamily: "Poppins-Medium",
            }}
          >
            Please signin to continue
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={userName}
            onChangeText={(text) => setUserName(text)}
            style={styles.textInputStyle}
            placeholder={"Email"}
            onSubmitEditing={() => ref_input_password.current.focus()}
          />

          <TextInput
            ref={ref_input_password}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textInputStyle}
            placeholder={"Password"}
            secureTextEntry={true}
          />
          <Text
            onPress={() => { navigation.navigate("ForgotPassword") }}
            style={{
              alignSelf: 'flex-end',
              color: Colors.primaryColor,
              textDecorationLine: "underline",
              fontFamily: constants.PoppinsMedium, margin: 10
            }}
          >
            Forgot Password ?
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>

          <Button_Component
            text={"SignIn"}
            onPress={() => handleLoginPress()}
          />
        </View>
        <Text style={{ alignSelf: "center", marginTop: 40, fontFamily: constants.PoppinsMedium }}>
          Don't have an account?&nbsp;
          <Text
            onPress={() => handlePressSignupOnClick()}
            style={{
              color: Colors.primaryColor,
              textDecorationLine: "underline",
              fontFamily: constants.PoppinsMedium
            }}
          >
            Signup
          </Text>
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;
