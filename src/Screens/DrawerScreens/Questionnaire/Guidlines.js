import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import Colors from '../../../Colors/Colors';
import {DataContext} from '../../../ContextProvider/ContextProvider';
import styles from './style';
import Button_Component from '../../../Components/Button/Button_Component';
import JsonServer from '../../../Constants/JsonServer';
import DropdownAlert from 'react-native-dropdownalert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Guidlines = ({navigation}) => {
  const {getAPICall, userCredential, translateString} = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [disclaimerText, setDisclaimerText] = useState('');
  const [userName, setUserName] = useState('');
  const [planName, setplanName] = useState('');
  const [ReadCareFullyString, setReadCareFullyString] = useState('');
  const [name, setname] = useState('');
  const [quest, setquest] = useState('');
  let dropDownAlertRef = useRef(null);

  // useEffect(() => {
  //   var urlTerms =
  //     JsonServer.baseURL +
  //     "services/app/DisclamierRaqis/GetAll";
  //   getAPICall(urlTerms, (success, result, error) => {
  //     if (success == true) {
  //       setDisclaimerText(result.items[0].name);
  //     } else {
  //       dropDownAlertRef.alertWithType("error", "Alert", error.message);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
      if (valuelanguageCode == null || valuelanguageCode == '') {
        getRaqiDisclaimer('en');
        translateString('en', ['Plan Name', 'Start Quest.'], convertedText => {
          setplanName(convertedText[0]);
          setquest(convertedText[1]);
        });
      } else if (valuelanguageCode != null) {
        getRaqiDisclaimer(JSON.parse(valuelanguageCode));
        translateString(
          JSON.parse(valuelanguageCode),
          ['Plan Name', 'Start Quest.'],
          convertedText => {
            setplanName(convertedText[0]);
            setquest(convertedText[1]);
          },
        );
      }
    });

    AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
      if (valuelanguageCode == null || valuelanguageCode == '') {
        getRaqiDisclaimer('en');
        translateString('en', 'Name', convertedText => {
          setname(convertedText[0]);
        });
      } else if (valuelanguageCode != null) {
        getRaqiDisclaimer(JSON.parse(valuelanguageCode));
        translateString(
          JSON.parse(valuelanguageCode),
          'Name',
          convertedText => {
            setname(convertedText[0]);
          },
        );
      }
    });

    AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
      if (valuelanguageCode == null || valuelanguageCode == '') {
        getRaqiDisclaimer('en');
        translateString('en', 'How to share problem', convertedText => {
          setReadCareFullyString(convertedText[0]);
        });
      } else if (valuelanguageCode != null) {
        getRaqiDisclaimer(JSON.parse(valuelanguageCode));
        translateString(
          JSON.parse(valuelanguageCode),
          'How to share problem',
          convertedText => {
            setReadCareFullyString(convertedText[0]);
          },
        );
      }
    });
  }, []);

  const getRaqiDisclaimer = languageCode => {
    var urlTerms =
      JsonServer.baseURL +
      'services/app/LanguageGuideline/GetAllLanguageGuidelineByLanguageCode?languageCode=' +
      languageCode;
    getAPICall(urlTerms, (success, result, error) => {
      if (success == true) {
        setLoading(false);
        setDisclaimerText(result.items[0].text);
     
      } else {
        setLoading(false);
        dropDownAlertRef.alertWithType('error', 'Alert', error.message);
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.GuidelineContainerStyle}>
        <DropdownAlert
          ref={ref => {
            if (ref) {
              dropDownAlertRef = ref;
            }
          }}
          containerStyle={{backgroundColor: 'green'}}
          zIndex={20}
          // wrapperStyle={{ position: 'absolute', zIndex: 344444444 }}
          closeInterval={1000}
          showCancel={false}
        />
        <Text style={styles.GuidelineText}>{planName}</Text>
        <TextInput
          value={userName}
          onChangeText={text => setUserName(text)}
          style={styles.textInputStyle}
          placeholder={name}
        />

        <Text style={[styles.GuidelineText, {marginTop: 20}]}>
          {ReadCareFullyString}
        </Text>
        <Text style={[styles.GuidelineBodyText, {marginTop: 20}]}>
          {' '}
          {disclaimerText}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          backgroundColor: Colors.white,
          padding: 20,
        }}>
        <Button_Component
          text={quest}
          onPress={() => {
            if (userName !== '') {
              navigation.navigate('Categories', {planName: userName});
            } else {
              dropDownAlertRef.alertWithType(
                'error',
                'Alert',
                'Please share plan name',
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default Guidlines;
