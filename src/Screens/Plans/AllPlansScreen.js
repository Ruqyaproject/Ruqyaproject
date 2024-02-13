import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';
import Colors from '../../Colors/Colors';
import constants from '../../Constants/constants';
import JsonServer from '../../Constants/JsonServer';
import {DataContext} from '../../ContextProvider/ContextProvider';
import AnimatedLoader from 'react-native-animated-loader';
import DropdownAlert from 'react-native-dropdownalert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllPlansScreen = ({navigation}) => {
  const [disclaimerText, setDisclaimerText] = useState('');

  const {getAPICall, userCredential, translateString} = useContext(DataContext);
  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(false);
  let dropDownAlertRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    var urlTerms =
      JsonServer.baseURL +
      'services/app/Plan/GetAllPlansByUserName?Email=' +
      JSON.parse(userCredential).userNameOrEmailAddress +
      '&&MaxResultCount=1000';
    getAPICall(urlTerms, (success, result, error) => {
      if (success == true) {
        setLoading(false);
        setPlansData(result.items);
      } else {
        setLoading(false);
      }
    });
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
  //     if (valuelanguageCode == null || valuelanguageCode == '') {
  //       // planLanguage('en');
  //       translateString('en', ['Submit Plan'], convertedText => {
  //         setDisclaimerText(convertedText[0]);
  //       });
  //     } else if (valuelanguageCode != null) {
  //       // planLanguage(JSON.parse(valuelanguageCode));
  //       translateString(
  //         JSON.parse(valuelanguageCode),
  //         ['Submit Plan'],
  //         convertedText => {
  //           setDisclaimerText(convertedText[0]);
  //         },
  //       );
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   // planLanguage();
  // }, []);
  const handlePressPlanBtn = item => {
    setLoading(true);
    var urlTerms =
      JsonServer.baseURL +
      'services/app/QuestionnairesAyatFrequencyAllocation/GetAllPlansByPlanId?planId=' +
      item.planId;
    getAPICall(urlTerms, (success, result, error) => {
      if (success == true) {
        console.log('result' + result);
        setLoading(false);
        if (result.length > 0) {
          var allocatedAyats = [];
          result[0].allocatedAyats.forEach(allocatedAyatElement => {
            allocatedAyatElement.ayats.forEach(allocatedAyatInternalElement => {
              if (
                allocatedAyatInternalElement !== null &&
                allocatedAyats.findIndex(
                  x => x.name == allocatedAyatInternalElement.name,
                ) == -1
              )
                allocatedAyats.push(allocatedAyatInternalElement);
            });
          });
        }
        navigation.navigate('PlansCalanderScreen', {
          planData: item,
          allocatedAyats: allocatedAyats,
        });
      } else {
        setLoading(false);
      }
    });
  };

  // Plan Language Function
  // const planLanguage = languageCode => {
  //   debugger
  //   var urlTerms =
  //     JsonServer.baseURL +
  //     'services/app/LanguagePlan/GetAllLanguagePlanByEmailAndLanguageCode?email=' +
  //     JSON.parse(userCredential).userNameOrEmailAddress +
  //     '&languageCode=' +
  //     languageCode;
  //   getAPICall(urlTerms, (success, result, error) => {
  //     if (success == true) {
  //       setLoading(false);
  //       setPlansData(result.items);
  //       console.log(result.items);
  //     } else {
  //       setLoading(false);
  //       dropDownAlertRef.alertWithType('error', 'Alert', error.message);
  //     }
  //   });
  // };
  // langugage api code
  // "services/app/LanguageTermsAndCondition/GetAllLanguageTermsAndConditionByLanguageCode?languageCode=" + languageCode;
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handlePressPlanBtn(item)}
        style={{
          marginTop: 5,
          backgroundColor: Colors.primaryColor,
          marginHorizontal: 20,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
        }}>
        <Text
          style={{
            fontFamily: constants.PoppinsMedium,
            color: Colors.white,
          }}>
          {item.planName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
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
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../../Assets/Lottie/loader.json')}
        animationStyle={{
          width: 100,
          height: 100,
        }}
        speed={1}></AnimatedLoader>
      <FlatList
        data={plansData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AllPlansScreen;
