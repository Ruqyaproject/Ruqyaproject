import React, {useState, useEffect, useContext, useRef} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Colors from '../../../Colors/Colors';

import {DataContext} from '../../../ContextProvider/ContextProvider';
import styles from './style';
import Button_Component from '../../../Components/Button/Button_Component';
import JsonServer from '../../../Constants/JsonServer';
import DropdownAlert from 'react-native-dropdownalert';
import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DisclaimerRaqi = ({navigation}) => {
  const {getAPICall, translateString} = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [disclaimerText, setDisclaimerText] = useState('');
  const [ReadCareFullyString, setReadCareFullyString] = useState('');
  const [agree, setagree] = useState('');
  let dropDownAlertRef = useState('');

  useEffect(async () => {
    setLoading(true);
    AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
      if (valuelanguageCode == null || valuelanguageCode == '') {
        getRaqiDisclaimer('en');
        translateString(
          'en',
          ['Please read carefully', 'Agree'],
          convertedText => {
            setReadCareFullyString(convertedText[0]);
            setagree(convertedText[1]);
          },
        );
      } else if (valuelanguageCode != null) {
        getRaqiDisclaimer(JSON.parse(valuelanguageCode));
        translateString(
          JSON.parse(valuelanguageCode),
          ['Please read carefully', 'Agree'],
          convertedText => {
            setReadCareFullyString(convertedText[0]);
            setagree(convertedText[1]);
          },
        );
      }
    });
  }, []);

  const getRaqiDisclaimer = languageCode => {
    var urlTerms =
      JsonServer.baseURL +
      'services/app/LanguageDisclaimerRaqis/GetAllLanguageDisclaimerRaqisByLanguageCode?languageCode=' +
      languageCode;
    getAPICall(urlTerms, (success, result, error) => {
      if (success == true) {
        setLoading(false);
        setDisclaimerText(result.items[0].name);
       
      } else {
        setLoading(false);
        dropDownAlertRef.alertWithType('error', 'Alert', error.message);
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <SafeAreaView style={{flex: 1}}>
        <AnimatedLoader
          visible={loading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../../Assets/Lottie/loader.json')}
          animationStyle={{
            width: 100,
            height: 100,
          }}
          speed={1}></AnimatedLoader>
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
        <View style={styles.DisclaimerRaqiContainerStyle}>
          <Text style={styles.DisclaimerRaqiHeaderText}>
            {ReadCareFullyString}
          </Text>

          <Text style={styles.DisclaimerRaqiBodyText}>{disclaimerText}</Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            backgroundColor: Colors.white,
            padding: 20,
          }}>
          <Button_Component
            text={agree}
            onPress={() => navigation.navigate('RaqiDetail')}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DisclaimerRaqi;
