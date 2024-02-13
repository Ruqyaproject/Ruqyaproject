/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {pow} from 'react-native-reanimated';
import Colors from '../../../Colors/Colors';
import JsonServer from '../../../Constants/JsonServer';
import {DataContext} from '../../../ContextProvider/ContextProvider';
import styles from './style';
import DropdownAlert from 'react-native-dropdownalert';
import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Title} from 'react-native-paper';

const image = {
  uri: 'https://i.pinimg.com/564x/e2/29/5f/e2295f7b9b470f873d0cc4b088ac0726.jpg',
};

const image2 = {
  uri: 'https://images.unsplash.com/photo-1627639679638-8485316a4b21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGtpZHxlbnwwfHwwfHw%3D&w=1000&q=80',
};

const Dashboard = ({navigation}) => {
  const [isTermsAndConditionsNotAccepted, setIsTermsAndConditionsNotAccepted] =
    useState(true);
  const [loading, setLoading] = useState(false);
  const [raqiString, setraqiString] = useState('');
  const [aboutUs, setaboutUs] = useState('');
  const [terms, setTerms] = useState('');
  const [diagnose, setDiagnose] = useState('');
  const [intro, setIntro] = useState('');
  const [videos, setVideos] = useState('');

  const {
    getAPICall,
    userCredential,
    setQuestionCategories,
    setQuestionCategoriesId,
    questionCategories,
    translateString,
    userId,
  } = useContext(DataContext);
  let dropDownAlertRef = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
      if (valuelanguageCode == null || valuelanguageCode === '') {
        getAllCategories('en');
        translateString(
          'en',
          ['Terms', 'Diagnose', 'About Us', 'Raqi', 'Introduction', 'Videos'],
          convertedText => {
            setraqiString(convertedText[3]);
            setTerms(convertedText[0]);
            setDiagnose(convertedText[1]);
            setaboutUs(convertedText[2]);
            setIntro(convertedText[4]);
            setVideos(convertedText[5]);
          },
        );
      } else if (valuelanguageCode != null) {
        getAllCategories(JSON.parse(valuelanguageCode));
        translateString(
          JSON.parse(valuelanguageCode),
          ['Terms', 'Diagnose', 'About Us', 'Raqi', 'Introduction', 'Vidoes'],
          convertedText => {
            setraqiString(convertedText[3]);
            setTerms(convertedText[0]);
            setDiagnose(convertedText[1]);
            setaboutUs(convertedText[2]);
            setIntro(convertedText[4]);
            setVideos(convertedText[5]);
          },
        );
      }
    });
  }, []);

  const getAllCategories = languageCode => {
    setLoading(true);
    var url =
      JsonServer.baseURL +
      'services/app/LanguageCategory/GetAllLanguageCategoryByLanguageCode?languageCode=' +
      languageCode;
    getAPICall(url, (success, result, error) => {
      if (success == true) {
        if (result.totalCount > 0) {
          setQuestionCategories(result.items);
          setQuestionCategoriesId(result.items.categoryId);
          var url =
            JsonServer.baseURL +
            'services/app/TermsAndCondition/GetAllTermsAndConditionWithUserName?languageCode=' +
            languageCode +
            '&userName=' +
            JSON.parse(userCredential).userNameOrEmailAddress;
          getAPICall(url, (success, result, error) => {
            if (success === true) {
              console.log( result);
              setLoading(false);
              if (result.totalCount > 0) {
                setIsTermsAndConditionsNotAccepted(false);
                //get All categories
              }
            } else {
              setLoading(false);
              dropDownAlertRef.alertWithType('error', 'Alert', error.message);
            }
          });
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
        dropDownAlertRef.alertWithType('error', 'Alert', error.message);
      }
    });
  };
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
      }}>
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

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          disabled={isTermsAndConditionsNotAccepted}
          style={styles.DashboardContainerCard}
          onPress={() => {
            navigation.navigate('Introduction', {intro: intro, videos: videos});
          }}>
          <View
            style={
              isTermsAndConditionsNotAccepted
                ? styles.DashboardCardDisabled
                : styles.DashboardCard
            }>
            <Image
              style={styles.DashboardCardImage}
              source={require('../../../Assets/introduction.png')}
            />
          </View>

          <Text style={styles.DashboardCardText}>{aboutUs}</Text>
        </TouchableOpacity>
        <View style={styles.DashboardContainerCard}>
          <TouchableOpacity
            disabled={isTermsAndConditionsNotAccepted}
            style={styles.DashboardContainerCard}
            onPress={() => navigation.navigate('DisclaimerRaqi')}>
            <View
              style={
                isTermsAndConditionsNotAccepted
                  ? styles.DashboardCardDisabled
                  : styles.DashboardCard
              }>
              <Image
                style={[styles.DashboardCardImage, {height: 40, width: 40}]}
                source={require('../../../Assets/contact.png')}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.DashboardCardText}>{raqiString}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableOpacity
          style={styles.DashboardContainerCard}
          onPress={() =>
            navigation.navigate('TermsNConditions', {
              getAllCategoriesParam: getAllCategories,
            })
          }>
          <View style={styles.DashboardCard}>
            <Image
              style={[styles.DashboardCardImage, {height: 40, width: 40}]}
              source={require('../../../Assets/terms.png')}
            />
          </View>
          <Text style={styles.DashboardCardText}>{terms}</Text>
        </TouchableOpacity>
        <View style={styles.DashboardContainerCard}>
          <TouchableOpacity
            disabled={isTermsAndConditionsNotAccepted}
            onPress={() => {
              if (questionCategories.length > 0) {
                navigation.navigate('Guidlines');
              } else {
                dropDownAlertRef.alertWithType(
                  'error',
                  'Alert',
                  'Wait , Basic configurations are setting. Please wait for some seconds',
                );
              }
            }}
            style={
              isTermsAndConditionsNotAccepted
                ? styles.DashboardCardDisabled
                : styles.DashboardCard
            }>
            <Image
              style={[styles.DashboardCardImage, {}]}
              source={require('../../../Assets/diagnose.png')}
            />
          </TouchableOpacity>
          <Text style={[styles.DashboardCardText]}>{diagnose}</Text>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
