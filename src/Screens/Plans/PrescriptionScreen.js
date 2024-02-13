import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState, useEffect, useContext, useRef} from 'react';
import Colors from '../../Colors/Colors';
import constants from '../../Constants/constants';
import Button_WithoutIcon_Component from '../../Components/Button/Button_WithoutIcon_Component';
import {DataContext} from '../../ContextProvider/ContextProvider';
import DropdownAlert from 'react-native-dropdownalert';
import JsonServer from '../../Constants/JsonServer';
import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PrescriptionScreen = ({route, navigation}) => {
  let dropDownAlertRef = useRef(null);
  const {putRequest} = useContext(DataContext);
  const [plansData, setPlansData] = useState([]);
  const [isSelected, setSelection] = useState(false);
  const [loading, setLoading] = useState(false);
  const {getAPICall, translateString} = useContext(DataContext);

  // language change states
  const [changeLanguage, setChangeLanguage] = useState('');
  const [doneButton, setdoneButton] = useState('');
  const [scretLife, setscretLife] = useState('');
  const [languageAsync, setlanguageAsync] = useState('');

  //Hard Coded Text
  useEffect(() => {
    AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
      if (valuelanguageCode == null || valuelanguageCode == '') {
        translateString(
          'en',
          [
            'Remember no matter how big is my problem, my ALLAH IS GREATER!!!',
            'Done',
            'The secret to a happy and spiritually life lies within each one of us!',
            'Spray',
          ],
          convertedText => {
            setChangeLanguage(convertedText[0]);
            setdoneButton(convertedText[1]);
            setscretLife(convertedText[2]);
          },
        );
      } else if (valuelanguageCode != null) {
        translateString(
          JSON.parse(valuelanguageCode),
          [
            'Remember no matter how big is my problem, my ALLAH IS GREATER!!!',
            'Done',
            'The secret to a happy and spiritually life lies within each one of us!',
            'Spray',
          ],
          convertedText => {
            setChangeLanguage(convertedText[0]);
            setdoneButton(convertedText[1]);
            setscretLife(convertedText[2]);
          },
        );
      }
    });
  }, []);
  React.useLayoutEffect(() => {
    console.log(route.params.planData)
    var checkboxArray = [];
    if (route.params.planData.wash !== 'No') {
      AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
        translateString(
          JSON.parse(valuelanguageCode),
          ['Wash'],
          convertedText => {
            checkboxArray.push({
              nametoDisplay: convertedText[0],
              name: 'Wash',
              isSelected: route.params.planData.isWASH,
            });
          },
        );
      });
    }
    if (route.params.planData.oiL_MASSAGE !== 'No') {
      AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
        translateString(
          JSON.parse(valuelanguageCode),
          ['Oil Massage'],
          convertedText => {
            checkboxArray.push({
              nametoDisplay: convertedText[0],
              name: 'Oil Massage',
              isSelected: route.params.planData.isOIL_MASSAGE,
            });
          },
        );
      });
    }
    if (route.params.planData.senA_TEA !== 'No') {
      AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
        translateString(
          JSON.parse(valuelanguageCode),
          ['Sena Tea'],
          convertedText => {
            checkboxArray.push({
              nametoDisplay: convertedText[0],
              name: 'Sena Tea',
              isSelected: route.params.planData.isSENA_TEA,
            });
          },
        );
      });
    }
    if (route.params.planData.spray !== 'No') {
      AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
        translateString(
          JSON.parse(valuelanguageCode),
          ['Spray'],
          convertedText => {
            checkboxArray.push({
              nametoDisplay: convertedText[0],
              name: 'Spray',
              isSelected: route.params.planData.isSPRAY,
            });
          },
        );
      });
    }
    if (route.params.planData.inseS_PARFUME !== 'No') {
      AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
        translateString(
          JSON.parse(valuelanguageCode),
          ['Insane Perfume'],
          convertedText => {
            checkboxArray.push({
              nametoDisplay: convertedText[0],
              name: 'Insane Perfume',
              isSelected: route.params.planData.isINSES_PARFUME,
            });
          },
        );
      });
    }
    if (route.params.planData.listeN_TO_RUQYA !== 'No') {
      AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
        translateString(
          JSON.parse(valuelanguageCode),
          ['Listen to Roqya'],
          convertedText => {
            checkboxArray.push({
              nametoDisplay: convertedText[0],
              name: 'Listen To Roqya',
              isSelected: route.params.planData.isLISTEN_TO_RUQYA,
            });
          },
        );
      });
    }
    if (route.params.planData.hijaamah !== 'No') {
      AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
        translateString(
          JSON.parse(valuelanguageCode),
          ['Hijamah'],
          convertedText => {
            checkboxArray.push({
              nametoDisplay: convertedText[0],
              name: 'Hijamah',
              isSelected: route.params.planData.isHIJAAMAH,
            });
          },
        );
      });
    }
    if (route.params.planData.recireAyyat !== 'No') {
      AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
        translateString(
          JSON.parse(valuelanguageCode),
          ['Recite Ayyats'],
          convertedText => {
            checkboxArray.push({
              nametoDisplay: convertedText[0],
              name: 'Recite Ayyats',
              isSelected: route.params.planData.isRecireAyyat,
            });
          },
        );
      });
    }
    if (route.params.dhikR_Count !== 'No') {
      AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
        translateString(
          JSON.parse(valuelanguageCode),
          ['Zikr Count'],
          convertedText => {
            checkboxArray.push({
              nametoDisplay: convertedText[0],
              name:
                'Zikr Count'+route.params.planData.dhikR_Count+'times',
              isSelected: route.params.planData.isDHIKR_Count,
            });
          },
        );
      });
    }

    setPlansData(checkboxArray);
    console.log(plansData);
  }, []);

  const setSelectedCheckbox = item => {
    var planDatatemp = plansData;
    if (item.name == 'Wash') {
      planDatatemp.find(x => x.name == item.name).isSelected =
        !planDatatemp.find(x => x.name == item.name).isSelected;
      setPlansData(planDatatemp);
    }
    if (item.name == 'Oil Massage') {
      planDatatemp.find(x => x.name == item.name).isSelected =
        !planDatatemp.find(x => x.name == item.name).isSelected;
      setPlansData(planDatatemp);
    }
    if (item.name == 'Sena Tea') {
      planDatatemp.find(x => x.name == item.name).isSelected =
        !planDatatemp.find(x => x.name == item.name).isSelected;
      setPlansData(planDatatemp);
    }
    if (item.name == 'Spray') {
      planDatatemp.find(x => x.name == item.name).isSelected =
        !planDatatemp.find(x => x.name == item.name).isSelected;
      setPlansData(planDatatemp);
    }
    if (item.name == 'Insane Perfume') {
      planDatatemp.find(x => x.name == item.name).isSelected =
        !planDatatemp.find(x => x.name == item.name).isSelected;
      setPlansData(planDatatemp);
    }
    if (item.name == 'Listen To Roqya') {
      planDatatemp.find(x => x.name == item.name).isSelected =
        !planDatatemp.find(x => x.name == item.name).isSelected;
      setPlansData(planDatatemp);
    }
    if (item.name == 'Hijamah') {
      planDatatemp.find(x => x.name == item.name).isSelected =
        !planDatatemp.find(x => x.name == item.name).isSelected;
      setPlansData(planDatatemp);
    }
    if (item.name == 'Recite Ayyats') {
      planDatatemp.find(x => x.name == item.name).isSelected =
        !planDatatemp.find(x => x.name == item.name).isSelected;
      setPlansData(planDatatemp);
    }
    if (
      item.name ==
      'Zikr Count'+route.params.planData.dhikR_Count+'times'
    ) {
      planDatatemp.find(x => x.name == item.name).isSelected =
        !planDatatemp.find(x => x.name == item.name).isSelected;
      setPlansData(planDatatemp);
    }

    setSelection(!isSelected);
  };

  const handlePressDone = () => {
    debugger
    
    setLoading(true);
    var routeData = route.params.planData;
    var planData = plansData;
    routeData.isWASH = planData.find(x => x.name == 'Wash').isSelected;
    routeData.isHIJAAMAH = planData.find(x => x.name == 'Hijamah').isSelected;
    routeData.isLISTEN_TO_RUQYA = planData.find(
      x => x.name == 'Listen To Roqya',
    ).isSelected;
    routeData.isINSES_PARFUME = planData.find(
      x => x.name == 'Insane Perfume',
    ).isSelected;
    routeData.isSENA_TEA = planData.find(x => x.name == 'Sena Tea').isSelected;
    routeData.isOIL_MASSAGE = planData.find(
      x => x.name == 'Oil Massage',
    ).isSelected;
    routeData.isSPRAY = planData.find(x => x.name == 'Spray').isSelected;
    routeData.isRecireAyyat = planData.find(
      x => x.name == 'Recite Ayyats',
    ).isSelected;
    routeData.isDHIKR_Count = planData.find(
      x => x.name == 'Zikr Count'+route.params.planData.dhikR_Count +'times'
    ).isSelected;
    console.log(routeData.isDHIKR_Count);
    if (
      routeData.isWASH == true &&
      routeData.isDHIKR_Count == true &&
      routeData.isLISTEN_TO_RUQYA == true &&
      routeData.isINSES_PARFUME == true &&
      routeData.isSENA_TEA == true &&
      routeData.isOIL_MASSAGE == true
    ) {
      routeData.isCompleted = true;
    }
    var dataToInsert = routeData;
    putRequest(
      dataToInsert,
      JsonServer.baseURL +
        'services/app/QuestionnairesAyatPlanAllocation/Update',
      (success, result, error) => {
        if (success) {
          setLoading(false);
          dropDownAlertRef.alertWithType(
            'custom',
            'Success',
            'Thanks for update',
          );
          setTimeout(() => navigation.goBack(), 1200);
        } else {
          setLoading(false);
          dropDownAlertRef.alertWithType('error', 'Alert', error.message);
        }
      },
    );
  };

  const handlePressCheckBoxTitle = title => {
    if (title == 'Recite Ayyats') {
      navigation.navigate('AyaatScreen', {
        allocatedAyats: route.params.allocatedAyats,
      });
    }
    if (title == 'Listen To Roqya') {
      navigation.navigate('ListenToRoqya');
    }
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => handlePressCheckBoxTitle(item.name)}>
          <Text style={styles.label}>{item.nametoDisplay}</Text>
        </TouchableOpacity>
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
          <CheckBox
            value={item.isSelected}
            onValueChange={() => setSelectedCheckbox(item)}
            style={{width: 25, height: 25, padding: 2}}
            onFillColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
        source={require('../../Assets/Lottie/loader.json')}
        animationStyle={{
          width: 100,
          height: 100,
        }}
        speed={1}></AnimatedLoader>
      <Text
        style={{
          margin: 20,
          fontSize: 18,
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 15,
          color: Colors.primaryColor,
          fontFamily: constants.PoppinsMedium,
        }}>
        {changeLanguage}
      </Text>
      <Text
        style={{
          marginHorizontal: 20,
          marginBottom: 10,
          fontSize: 16,
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 15,
          fontFamily: constants.PoppinsMedium,
        }}>
        {scretLife}
      </Text>
      <FlatList
        data={plansData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            width: '90%',
            height: 40,
            backgroundColor: Colors.primaryColor,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20,
            borderRadius: 15,
          }}
          onPress={() => {
            handlePressDone();
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontFamily: constants.PoppinsMedium,
            }}>
            {doneButton}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PrescriptionScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  checkbox: {
    fontSize: 10,
  },
  label: {
    fontFamily: constants.PoppinsMedium,
    color: Colors.gray,
    fontSize: 18,
  },
});
