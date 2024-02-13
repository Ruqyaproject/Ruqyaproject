import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedbackBase,
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
import { useValidation } from "react-native-form-validator";
import { TouchableOpacity } from "react-native-gesture-handler";

const ForgotPassword = ({ navigation }) => {
  const ref_input_code = useRef();
  const ref_input_oldPassword = useRef();
  const ref_input_password = useRef();

  const [oldPassword, setOldPassword] = useState("");
  const [conformationCode, setConformationCode] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    getAPICallAdmin,
    postRequestAdmin
  } = useContext(DataContext);
  let dropDownAlertRef = useRef(null);

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: { email, password, oldPassword },
  });

  const handleForgotPasswordPress = () => {
    validate({
      email: { required: true, email: true },
      password: { required: true },
      oldPassword: { required: true, equalPassword: password },
    });
    if (isFormValid()) {
      setLoading(true);
      var dataToInsertConformationCode = {
      }
      postRequestAdmin(dataToInsertConformationCode, JsonServer.baseURL + "services/app/CodeConfirmation/VerifyCodeConfirmation?Email=" + email + "&UniqueCode=" + conformationCode, (status, result, error) => {
        if (status == true) {
          var datatoInsert = {
            adminPassword: "123qwe",
            userId: user.items[0].id,
            newPassword: password
          }
          postRequestAdmin(datatoInsert, JsonServer.baseURL + "services/app/User/ResetPassword", (status, result, error) => {
            if (status == true) {
              setLoading(false);
              // var data = result.items;
              dropDownAlertRef.alertWithType("success", "Alert", 'You have Changed your password');
              setTimeout(() => {
                navigation.goBack()
              }, 1200);
            }
            else {
              setLoading(false);
              dropDownAlertRef.alertWithType("error", "Alert", error.message);
            }

          })
        }
        else {
          setLoading(false);
          dropDownAlertRef.alertWithType("error", "Alert", "Confirmation Code not verified");
        }

      })
    } else {
      setLoading(false);
      dropDownAlertRef.alertWithType("error", "Alert", "Password and Confirm Password mismatched");
    }
  }


  const handlePressSendCode = () => {
    validate({
      email: { required: true, email: true },
    });
    if (isFormValid()) {
      setLoading(true);

      var url =
        JsonServer.baseURL + "services/app/User/GetAll?Keyword=" + email
      getAPICallAdmin(url, (success, result, error) => {
        if (success == true) {
          setLoading(false);
          setUser(result)
          if (result.items.length == 0)
            dropDownAlertRef.alertWithType("error", "Alert", "No user found for this email");
          else {
            var datatoInsert = {

            }
            postRequestAdmin(datatoInsert, JsonServer.baseURL + "services/app/CodeConfirmation/MailToUser?Email=" + email, (status, result, error) => {
              if (status == true) {
                setLoading(false);
                dropDownAlertRef.alertWithType("success", "Alert", 'Code is successfully sent to your mail. Please fill code to reset password');
              }
              else { Alert.alert(error.message) }

            })
          }
        } else {
          setLoading(false);
          dropDownAlertRef.alertWithType("error", "Alert", error.message);
        }
      });
    }
  };
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../Assets/signin.png")}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
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
            Did You forgot your password ?
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors.gray,
              fontFamily: "Poppins-Medium",
              marginTop: 5
            }}
          >
            Just share your new password and enjoy our Roqiya services
          </Text>
        </View>


        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInputStyle}
            keyboardType={'email-address'}
            placeholder={"Your Email"}
            onSubmitEditing={() => ref_input_code.current.focus()}
          />
          <TouchableOpacity onPress={() => handlePressSendCode()} style={{ marginVertical: 5, padding: 10, backgroundColor: Colors.primaryColor, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
            <Text style={{ color: 'white', fontFamily: constants.PoppinsBold }}>
              Generate Code
            </Text>
          </TouchableOpacity>
          {isFieldInError("email") &&
            getErrorsInField("email").map((errorMessage) => (
              <Text style={{ color: "red" }}>{errorMessage}</Text>
            ))}

          <TextInput
            ref={ref_input_code}
            value={conformationCode}
            onChangeText={(text) => setConformationCode(text)}
            style={styles.textInputStyle}
            placeholder={"Conformation Code"}
            onSubmitEditing={() => ref_input_oldPassword.current.focus()}
          />
          <TextInput
            ref={ref_input_oldPassword}
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
            style={styles.textInputStyle}
            placeholder={"Password"}
            secureTextEntry={true}
            onSubmitEditing={() => ref_input_password.current.focus()}
          />
          {isFieldInError("oldPassword") &&
            getErrorsInField("oldPassword").map((errorMessage) => (
              <Text style={{ color: "red" }}>{errorMessage}</Text>
            ))}
          <TextInput
            ref={ref_input_password}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textInputStyle}
            placeholder={"Confirm Password"}
            secureTextEntry={true}
          />
          {isFieldInError("password") &&
            getErrorsInField("p").map((errorMessage) => (
              <Text style={{ color: "red" }}>{errorMessage}</Text>
            ))}
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Button_Component
            text={"Submit"}
            onPress={() => handleForgotPasswordPress()}
          />
        </View>

      </ScrollView>
    </ImageBackground>
  );
};

export default ForgotPassword;
