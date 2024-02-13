import React, {useState, useEffect, useContext, useRef} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import Colors from '../../../Colors/Colors';
import {DataContext} from '../../../ContextProvider/ContextProvider';
import styles from './style';
import CheckBox from '@react-native-community/checkbox';
import constants from '../../../Constants/constants';
import Button_Component from '../../../Components/Button/Button_Component';
import JsonServer from '../../../Constants/JsonServer';
import DropdownAlert from 'react-native-dropdownalert';
import {ScrollView} from 'react-native-gesture-handler';
import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TermsNConditions = ({route, navigation}) => {
  const {getAPICall, postRequest, userCredential, translateString} =
    useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [termsText, setTermsText] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  const [terms, setterms] = useState('');
  const [conditions, setconditions] = useState('');
  const [disclaimerText, setDisclaimerText] = useState('');
  const [accept, setaccept] = useState('');

  let dropDownAlertRef = useRef(null);
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
      debugger;
      if (valuelanguageCode == null || valuelanguageCode == '') {
        getRaqiDisclaimer('en');
        translateString(
          'en',
          ['Terms Conditions', 'Agree with Terms & Conditions', 'Agree'],
          convertedText => {
            setterms(convertedText[0]);
            setconditions(convertedText[1]);
            setaccept(convertedText[2]);
          },
        );
      } else if (valuelanguageCode != null) {
        getRaqiDisclaimer(JSON.parse(valuelanguageCode));
        translateString(
          JSON.parse(valuelanguageCode),
          ['Terms Conditions', 'Agree with Terms & Conditions', 'Agree'],
          convertedText => {
            setterms(convertedText[0]);
            setconditions(convertedText[1]);
            setaccept(convertedText[2]);
          },
        );
      }
    });
  }, []);

  const getRaqiDisclaimer = (languageCode) => {
    // var urlTerms =
    //   JsonServer.baseURL +
    //   'services/app/LanguageTermsAndCondition/GetAllLanguageTermsAndConditionByLanguageCode?languageCode' +
    //   languageCode +
    //   '&userName=' +
    //   JSON.parse(userCredential).userNameOrEmailAddress;
    var urlTerms = JsonServer.baseURL +
     'services/app/LanguageTermsAndCondition/GetAllLanguageTermsAndConditionByLanguageCode?languageCode='+ languageCode+ '&userName=' + JSON.parse(userCredential).userNameOrEmailAddress
    getAPICall(urlTerms, (success, result, error) => {
      if (success == true) {
        setLoading(false);
        console.log(result)
        setDisclaimerText(result.items[0].termsAndConditionName);
        console.log(result.items[0].text);
      } else {
        setLoading(false);
        dropDownAlertRef.alertWithType('error', 'Alert', error.message);
      }
    });
  };
  const handleBtnAccept = () => {
    if (isAccepted === true) {
      var dataToInsert = {
        userName: JSON.parse(userCredential).userNameOrEmailAddress,
        text: termsText,
        accpeted: true,
      };
      postRequest(
        dataToInsert,
        JsonServer.baseURL + 'services/app/TermsAndCondition/Create',
        (success, result, error) => {
          if (success) {
            route.params.getAllCategoriesParam();
            dropDownAlertRef.alertWithType(
              'custom',
              'Success',
              'You have successfully accepted terms and conditions',
            );
            setTimeout(() => navigation.goBack(), 1200);
          } else {
            dropDownAlertRef.alertWithType('error', 'Alert', error.message);
          }
        },
      );
    } else {
      dropDownAlertRef.alertWithType(
        'error',
        'Alert',
        'Please accept terms and conditions',
      );
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingVertical: 30}}>
        <View style={styles.TermsNConditionsContainerStyle}>
          <AnimatedLoader
            visible={loading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require('../../../Assets/Lottie/loader.json')}
            animationStyle={{
              width: 100,
              height: 100,
            }}
            speed={1}></AnimatedLoader>
          {/*<Text style={styles.TermsNConditionsHeaderText}>Terms & Conditions</Text>*/}
          <Text style={styles.TermsNConditionsHeaderText}>{terms}</Text>
          <Text style={styles.TermsNConditionsBodyText}>{disclaimerText}</Text>
          <View
            style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
            <CheckBox
              disabled={isAccepted}
              value={toggleCheckBox}
              onCheckColor={Colors.primaryColor}
              onValueChange={newValue => {
                setIsAccepted(!isAccepted);
                setToggleCheckBox(newValue);
              }}
              tintColors={{
                true: Colors.primaryColor,
                false: Colors.primaryColor,
              }}
            />
            <Text
              style={{
                fontFamily: constants.PoppinsMedium,
                fontSize: 12,
                color: Colors.gray,
                marginLeft: 10,
              }}>
              {conditions}
            </Text>

            {/* <Text style={{ fontFamily: constants.PoppinsMedium, fontSize: 12, color: Colors.gray, marginLeft: 10 }}>Agree with Terms & Conditions</Text> */}
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            backgroundColor: Colors.white,
            padding: 20,
          }}>
          <Button_Component text={accept} onPress={() => handleBtnAccept()} />
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
};

export default TermsNConditions;
