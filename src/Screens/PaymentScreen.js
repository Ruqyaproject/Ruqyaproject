import { View, Text, FlatList, NativeModules, Alert } from 'react-native'
import React, { useState, useRef, useContext, useEffect } from 'react'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../Colors/Colors';
import constants from '../Constants/constants';
//import { color } from 'react-native-reanimated';

import { TouchableOpacity } from 'react-native-gesture-handler';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownAlert from "react-native-dropdownalert";
import { DataContext } from '../ContextProvider/ContextProvider';
import AnimatedLoader from "react-native-animated-loader";

const { RNPaypal } = NativeModules

const PaymentScreen = ({ route, navigation }) => {

    const [paymentMethodList, setPaymentMethodList] = useState([
        { iconName: "cc-paypal", name: "PayPal" }, 
        { iconName: "cc-mastercard", name: " Credit Card" }
    ]);
    let dropDownAlertRef = useRef(null);
    const [amount, setAmount] = useState("50");  //need to be initialized from the navigated screen - categories
    const [token, setToken] = useState(null); //useState("sandbox_w36wxzkf_4fpxkzv8mcdf42jn")
    const { postRequest } = useContext(DataContext)
    const [loading, setLoading] = useState(false);

    useEffect(() => {   
        // component did mount generateToken if token generated and request not sent 
          if (token === null) { 
                generateToken();
          }
        });

    const handlePaymentPressed = (item) => {
        console.log(item.name)
        if (item.name !== 'PayPal') {
            Alert.alert("We only accept paypal payment for now");
            return;
        } 
        console.log("Call paypal integration module");
        dropDownAlertRef.alertWithType("success", "Alert", 'Collecting payment info, Please wait...');
        RNPaypal.requestOneTimePayment(token,
            {
                amount: amount, // required
                currency: 'GBP',
                localeCode: 'en_GB', 
                shippingAddressRequired: false,
                userAction: 'commit', // display 'Pay Now' on the PayPal review page
                // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
                intent: 'authorize', 
                //intent: 'sale', 
              }
            )
        .then(response => {
            setLoading(true); //start loading
            console.log(response)
            console.log(response.nonce)
            submitPayment(response.nonce, amount)
        }).catch(err => {
            console.log(err)
        });
    }

    const generateToken = () => {
        fetch(
            'https://guarded-citadel-60953.herokuapp.com/token', 
            {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
            },
            )
            .then((response) => response.json())
            .then(({success, message, clientToken}) => {
                console.log("token generated successfuly");
                console.log(success);
                console.log(clientToken)
                setToken(clientToken)
             
            }) 
            .catch((err) => {
                console.log("Failed to generate client token");
                console.log(err);
                dropDownAlertRef.alertWithType("danger", "Alert", 'Internal error! don\'t proceed with payment');
            }
        );
    }
 
    const submitPayment = (nonce, amount) => 
    {
        fetch(
            'https://guarded-citadel-60953.herokuapp.com/pay', 
            {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({nonce: nonce, amount: amount}), // Paypal server validating payloads
            },
            )
            .then((response) => response.json())
            .then(({success, message}) => {
            
                console.log("Paid successfuly");
                setLoading(false);
                dropDownAlertRef.alertWithType("success", "Alert", 'You have submitted your plan successfully');
                setTimeout(() => {
                    navigation.navigate("Plans") // redirect to plan after successfully payment
                }, 600);            
            }) 
            .catch((err) => {
                console.log("Payment failed");
                console.log(err);
                setLoading(false);
                Alert.alert(err.message)
        });    
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { handlePaymentPressed(item) }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: Colors.gray, height: 60 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <FontAwesome5Pro style={{ fontSize: 30, color: Colors.primaryColor }} name={item.iconName} />
                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily: constants.PoppinsMedium,
                            backgroundColor: "transparent",
                            marginLeft: 20,
                            alignSelf: 'center'
                        }}
                    >
                        {item.name}
                    </Text>
                </View>

                <AntDesign style={{ fontSize: 16 }} name='right' />

            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <DropdownAlert
                ref={(ref) => {
                    if (ref) {
                        dropDownAlertRef = ref;
                    }
                }}
                containerStyle={{ backgroundColor: "green" }}
                closeInterval={1000}
                showCancel={false}
                zIndex={5}
            />
            <AnimatedLoader
                visible={loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../Assets/Lottie/loader.json")}
                animationStyle={{
                    width: 100,
                    height: 100
                }}
                speed={1}
            >
            </AnimatedLoader>
            <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.gray, height: 60, justifyContent: 'center' }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: constants.PoppinsBold,
                        backgroundColor: "transparent",
                        marginLeft: 20,
                    }}
                >
                    Payment Methods
                </Text>
            </View>
            <FlatList
                data={paymentMethodList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>

    )
}

export default PaymentScreen