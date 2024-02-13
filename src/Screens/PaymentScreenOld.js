import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {WebView} from 'react-native-webview';
import {View, Text, FlatList} from 'react-native';
import React, {useState, useRef, useContext} from 'react';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../Colors/Colors';
import constants from '../Constants/constants';
import {color} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownAlert from 'react-native-dropdownalert';
import {DataContext} from '../ContextProvider/ContextProvider';
import JsonServer from '../Constants/JsonServer';
import AnimatedLoader from 'react-native-animated-loader';

const PaymentScreenOld = ({route, navigation}) => {
  const [paymentMethodList, setPaymentMethodList] = useState([
    {iconName: 'cc-paypal', name: ' PayPal'},
    {iconName: 'cc-mastercard', name: ' Credit Card'},
  ]);
  let dropDownAlertRef = useRef(null);

  const {postRequest} = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  const handlePaymentPressed = async item => {
    const data = [];
    if (route.params.questionAnswersArray.length > 0) {
      route.params.questionAnswersArray.forEach(element => {
        if (element.length > 0) {
          element.forEach(innerElement => {
            data.push({
              questionText: innerElement.questionText,
              optionText: innerElement.optionText,
              severtyLevel: innerElement.frequencyLevel,
            });
          });
        }
      });
    }
    var datatoInsert = {
      getAllAyats: data,
      planName: route.params.planName,
    };
    setLoading(true);
    postRequest(
      datatoInsert,
      JsonServer.baseURL +
        'services/app/QuestionnairesAyatFrequencyAllocation/CreatePlan',
      (status, result, error) => {
        if (status == true) {
          setLoading(false);
          dropDownAlertRef.alertWithType(
            'success',
            'Alert',
            'You have submitted your plan successfully',
          );
          setTimeout(() => {
            navigation.navigate('Plans');
          }, 1200);
        } else {
          setLoading(false);
          Alert.alert(error.message);
        }
      },
    );
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handlePaymentPressed(item);
        }}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: Colors.gray,
          height: 60,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <FontAwesome5Pro
            style={{fontSize: 30, color: Colors.primaryColor}}
            name={item.iconName}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: constants.PoppinsMedium,
              backgroundColor: 'transparent',
              marginLeft: 20,
              alignSelf: 'center',
            }}>
            {item.name}
          </Text>
        </View>

        <AntDesign style={{fontSize: 16}} name="right" />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <DropdownAlert
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
        containerStyle={{backgroundColor: 'green'}}
        closeInterval={1000}
        showCancel={false}
        zIndex={5}
      />
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../Assets/Lottie/loader.json')}
        animationStyle={{
          width: 100,
          height: 100,
        }}
        speed={1}></AnimatedLoader>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.gray,
          height: 60,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: constants.PoppinsBold,
            backgroundColor: 'transparent',
            marginLeft: 20,
          }}>
          Payment Methods
        </Text>
      </View>
      <FlatList
        data={paymentMethodList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default PaymentScreenOld;

// export default class PaymentScreenOld extends React.Component {
//     state = {
//         showModal: false,
//         status: "Pending"
//     };
//     handleResponse = data => {
//         if (data.title === "success") {
//             this.setState({ showModal: false, status: "Complete" });
//         } else if (data.title === "cancel") {
//             this.setState({ showModal: false, status: "Cancelled" });
//         } else {
//             return;
//         }
//     };

//     render() {
//         return (
//             <View style={{ marginTop: 100 }}>
//                 <Modal
//                     visible={this.state.showModal}
//                     onRequestClose={() => this.setState({ showModal: false })}
//                 >
//                     <WebView
//                         source={{ uri: "http://localhost:3000" }}
//                         onNavigationStateChange={data =>
//                             this.handleResponse(data)
//                         }
//                         injectedJavaScript={`document.f1.submit()`}
//                     />
//                 </Modal>
//                 <TouchableOpacity
//                     style={{ width: 300, height: 100 }}
//                     onPress={() => this.setState({ showModal: true })}
//                 >
//                     <Text>Pay with Paypal</Text>
//                 </TouchableOpacity>
//                 <Text>Payment Status: {this.state.status}</Text>
//             </View>
//         );
//     }
// }
