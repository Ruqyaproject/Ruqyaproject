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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../Colors/Colors";
import styles from "./style";
import constants from "../../Constants/constants";
import Button_Component from "../../Components/Button/Button_Component";
import { DataContext } from "../../ContextProvider/ContextProvider";
import DropdownAlert from "react-native-dropdownalert";
import { useValidation } from "react-native-form-validator";
import JsonServer from "../../Constants/JsonServer";
import AnimatedLoader from "react-native-animated-loader";

const Login = ({ navigation }) => {
  const ref_input_lastName = useRef();
  const ref_input_emailName = useRef();
  const ref_input_password = useRef();
  const ref_input_confirmPassword = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastTName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    submitSignUpInfo,
    getTenantId,
    saveToAsyncStorageCredentials,
    setUserCredential,
    setUserTenantId
  } = useContext(DataContext);
  let dropDownAlertRef = useRef(null);

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: { firstName, email, password, confirmPassword },
  });

  const handlePressSignupOnClick = () => {
    navigation.navigate("Login");
  };

  const handleSignupPress = () => {
    validate({
      firstName: { required: true },
      email: { required: true, email: true },
      password: { required: true },
      confirmPassword: { required: true, equalPassword: password },
    });
    if (isFormValid()) {
      var dataToInsert = {
        userName: (firstName + lastName).replace(/\s/g, ''),
        name: lastName,
        surname: firstName,
        emailAddress: email,
        isActive: true,
        roleNames: [
          "Admin"
        ],
        password: password
      };
      setLoading(true);
      var tenancyName = { tenancyName: JsonServer.tenancyName };
      getTenantId(tenancyName, (success, result, error) => {
        if (success == true) {
          var tenantId = result.result.tenantId
          if (result.result.tenantId !== null) {
            saveToAsyncStorageCredentials("TenantId", tenantId);
            setUserTenantId(tenantId);
            submitSignUpInfo(tenantId, dataToInsert, (success, result, error) => {
              if (success == true) {
                setLoading(false);
                dropDownAlertRef.alertWithType('custom', 'Success', 'You are Successfully Signed up. Please share your email & Password to login')
                setTimeout(() => navigation.goBack(), 3200)
              }
              else {
                setLoading(false);
                dropDownAlertRef.alertWithType('error', 'Alert', error.message)
              }
            }
            )
          }
          else {
            setLoading(false);
          }
        }
        else {
          setLoading(false);
          dropDownAlertRef.alertWithType('error', 'Alert', error.message)
        }
      })
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
          closeInterval={3000}
          showCancel={false}
        />

        <Text
          style={{
            fontSize: 18,
            // textAlign: "center",
            color: Colors.gray,
            fontFamily: constants.PoppinsBold,
          }}
        >
          Create Account
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            style={styles.textInputStyle}
            placeholder={"First Name"}
            onSubmitEditing={() => ref_input_lastName.current.focus()}
          />
          {isFieldInError("firstName") &&
            getErrorsInField("firstName").map((errorMessage) => (
              <Text style={{ color: "red" }}>{errorMessage}</Text>
            ))}
          <TextInput
            ref={ref_input_lastName}
            value={lastName}
            onChangeText={(text) => setLastTName(text)}
            style={styles.textInputStyle}
            placeholder={"Last Name"}
            onSubmitEditing={() => ref_input_emailName.current.focus()}
          />
          <TextInput
            ref={ref_input_emailName}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInputStyle}
            placeholder={"Email"}
            keyboardType="email-address"
            onSubmitEditing={() => ref_input_password.current.focus()}
          />
          {isFieldInError("email") &&
            getErrorsInField("email").map((errorMessage) => (
              <Text style={{ color: "red" }}>{errorMessage}</Text>
            ))}
          <TextInput
            ref={ref_input_password}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.textInputStyle}
            blurOnSubmit={false}
            textContentType={'oneTimeCode'}
            onSubmitEditing={() => Keyboard.dismiss()}

            placeholder={"Password"}
          />
          {isFieldInError("password") &&
            getErrorsInField("password").map((errorMessage) => (
              <Text style={{ color: "red" }}>{errorMessage}</Text>
            ))}
          <TextInput
            ref={ref_input_confirmPassword}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
            style={styles.textInputStyle}
            textContentType={'oneTimeCode'}

            placeholder={"Confirm Password"}
          />
          {isFieldInError("confirmPassword") &&
            getErrorsInField("confirmPassword").map((errorMessage) => (
              <Text style={{ color: "red" }}>{errorMessage}</Text>
            ))}
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Button_Component
            text={"Sign Up"}
            onPress={() => handleSignupPress()}
          />
        </View>
        <Text
          style={{
            alignSelf: "center",
            marginTop: 40,
            fontFamily: constants.PoppinsMedium,
          }}
        >
          Already have an account?&nbsp;
          <Text
            onPress={() => handlePressSignupOnClick()}
            style={{
              color: Colors.primaryColor,
              textDecorationLine: "underline",
              fontFamily: constants.PoppinsMedium,
            }}
          >
            Signin
          </Text>
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;
