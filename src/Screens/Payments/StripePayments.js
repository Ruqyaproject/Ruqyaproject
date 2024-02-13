import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Pressable,
  Alert,
} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import {Secret_key, STRIPE_PUBLISHABLE_KEY} from './apiKey';
import Modal from 'react-native-modal';
import {DataContext} from '../../ContextProvider/ContextProvider';
import Colors from '../../Colors/Colors';
import moment from 'moment';
import JsonServer from '../../Constants/JsonServer';
import {debug} from 'react-native-reanimated';
import DropdownAlert from 'react-native-dropdownalert';

// create a component
const CURRENCY = 'USD';
var CARD_TOKEN = null;

function getCreditCardToken(creditCardData) {
  // alert()
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc,
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&'),
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
function subscribeUser(creditCardToken) {
  return new Promise(resolve => {
    console.log('Credit card token\n', creditCardToken);
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({status: true});
    }, 1000);
  });
}

const StripePayments = ({navigation, route}) => {
  const {fetchUserData, userName, postRequest, userId} =
    useContext(DataContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [CardInput, setCardInput] = React.useState({});
  const [loading, setLoading] = useState(true);
  let dropDownAlertRef = null;

  useEffect(() => {
    fetchUserData();
  }, []);

  const onSubmit = async () => {
    if (CardInput.valid == false || typeof CardInput.valid == 'undefined') {
      alert('Invalid Credit Card');
      return false;
    }

    let creditCardToken;

    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(CardInput);

      // console.log("creditCardToken", creditCardToken)
      if (creditCardToken.error) {
        setisLoading(false);
        alert(creditCardToken.error.message);
        return;
      }
    } catch (e) {
      console.log('e', e);
      return;
    }
    // Send a request to your server with the received credit card token
    const {error} = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      alert(error);
    } else {
      let pament_data = await charges();
      console.log('pament_data', pament_data);
      if (pament_data.status == 'succeeded') {
        var dataToInsert = {
          userName: userName,
          totalAmount: '50 USD',
        };

         postRequest(
          dataToInsert,
          JsonServer.baseURL + 'services/app/LanguagePayment/Create',
          (success, result, error) => {
            if (success) {
              setModalVisible(true);
            } else if (error) {
            }
          },
        );
      
      }
    }
  };

  // const onSubmit = async () => {

  //     if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
  //         alert('Invalid Credit Card');
  //         return false;
  //     }

  //     let creditCardToken;
  //     try {
  //         // Create a credit card token
  //         creditCardToken = await getCreditCardToken(CardInput);
  //         // console.log("creditCardToken", creditCardToken)
  //         if (creditCardToken.error) {
  //             alert("creditCardToken error");
  //             return;
  //         }
  //     } catch (e) {
  //         console.log("e", e);
  //         return;
  //     }
  //     // Send a request to your server with the received credit card token
  //     const { error } = await subscribeUser(creditCardToken);
  //     // Handle any errors from your server
  //     if (error) {
  //         alert(error)
  //     } else {

  //         let pament_data = await charges();
  //         console.log('pament_data', pament_data);
  //         if (pament_data.status == 'succeeded') {
  //             alert("Payment Successfully");
  //             navigation.navigate("Dashboard")
  //         }
  //         else {
  //             alert('Payment failed');
  //         }
  //     }
  // };

  const charges = async () => {
    const card = {
      amount: 50,
      currency: CURRENCY,
      source: CARD_TOKEN,
      description: 'Developers Sin Subscription',
    };

    return fetch('https://api.stripe.com/v1/charges', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${Secret_key}`,
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&'),
    }).then(response => response.json());
  };

  const _onChange = data => {
    setCardInput(data);
  };

  const handlePaymentPressed = async () => {
    debugger
    const data = [];
    if (route.params.questionAnswersArray.length > 0) {
      route.params.questionAnswersArray.forEach(element => {
        if (element.length > 0) {
          element.forEach(innerElement => {
            data.push({
              questionText: innerElement.questionText,
              optionText: innerElement.optionText,
              severtyLevel: innerElement.frequencyLevel
            });
          });
        }
      });
    }
    var datatoInsert = {
      getAllAyats: data,
      planName: route.params.planName
    };
    postRequest(
      datatoInsert,
      JsonServer.baseURL +
        "services/app/QuestionnairesAyatFrequencyAllocation/CreatePlan",
      (status, result, error) => {
        if (status == true) {
          console.log(result);
          dropDownAlertRef.alertWithType(
            'success',
            'Alert',
            'You have submitted your plan successfully',
          );
          setTimeout(() => {
            navigation.navigate('Plans');
          }, 1200);
        } else {
          console.log(error);
          dropDownAlertRef.alertWithType(
            'error',
            'Alert',
            'Plan Creation Failed',
          );
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <DropdownAlert
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
        containerStyle={{backgroundColor: 'green'}}
        closeInterval={1000}
        showCancel={false}
      />
      <StatusBar barStyle="light-content" backgroundColor="#2471A3" />
      <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
        An amount of 50$ will be charged!
      </Text>
      {/* <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Stripe_logo%2C_revised_2016.png/1200px-Stripe_logo%2C_revised_2016.png' }}
                style={styles.ImgStyle}
            /> */}
      <View style={{marginTop: 30}} />
      <CreditCardInput
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        validColor="#fff"
        placeholderColor="#ccc"
        onChange={_onChange}
      />

      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} scrollOffset={0} swipeDirection="down">
        <View
          style={{
            width: '90%',
            backgroundColor: Colors.white,
            padding: 20,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text
              style={{fontSize: 14, fontWeight: '600', color: Colors.black}}>
              Username
            </Text>
            <Text style={{fontSize: 14, fontWeight: '500', color: Colors.gray}}>
              {userName}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text
              style={{fontSize: 14, fontWeight: '600', color: Colors.black}}>
              Transaction Date
            </Text>
            <Text style={{fontSize: 14, fontWeight: '500', color: Colors.gray}}>
              {moment(date).format('MMM-DD-YY')}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text
              style={{fontSize: 14, fontWeight: '600', color: Colors.black}}>
              Amount
            </Text>
            <Text style={{fontSize: 14, fontWeight: '500', color: Colors.gray}}>
              {'50$'}
            </Text>
          </View>

          <Pressable
            onPress={() => {
              setModalVisible(false);
              handlePaymentPressed();
            }}
            style={{
              alignSelf: 'flex-end',
              marginTop: 10,
              backgroundColor: Colors.lightGray,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: Colors.primaryColor,
              }}>
              OK
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImgStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#2471A3',
    width: 150,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    color: '#f4f4f4',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  inputStyle: {
    backgroundColor: '#222242',
    paddingLeft: 15,
    borderRadius: 5,
    color: '#fff',
  },
  labelStyle: {
    marginBottom: 5,
    fontSize: 12,
  },
});


export default StripePayments;

