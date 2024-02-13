import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import {Text, Image, Platform, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../Colors/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SliderPages from '../../Screens/SliderPages/SliderPages';
import Login from '../../Screens/Login/Login';
import DrawerNavigator from '../Drawer/DrawerNavigator';
import Dashboard from '../../Screens/DrawerScreens/Dashboard/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../../ContextProvider/ContextProvider';
import Signup from '../../Screens/Login/Signup';
import Introduction from '../../Screens/DrawerScreens/Introduction/Introduction';
import styles from './style';
import TermsNConditions from '../../Screens/DrawerScreens/TermsNConditions/TermsNConditions';
import DisclaimerRaqi from '../../Screens/DrawerScreens/Raqi/DisclaimerRaqi';
import RaqiDetail from '../../Screens/DrawerScreens/Raqi/RaqiDetail';
import Guidlines from '../../Screens/DrawerScreens/Questionnaire/Guidlines';
import Categories from '../../Screens/DrawerScreens/Questionnaire/Categories';
import QuestionnaireScreen from '../../Screens/DrawerScreens/Questionnaire/QuestionnaireScreen';
import PaymentScreen from '../../Screens/PaymentScreen';
import AllPlansScreen from '../../Screens/Plans/AllPlansScreen';
import PlansCalanderScreen from '../../Screens/Plans/PlansCalanderScreen';
import PrescriptionScreen from '../../Screens/Plans/PrescriptionScreen';
import AyaatScreen from '../../Screens/Plans/AyaatScreen';
import AyahImageScreen from '../../Screens/Plans/AyahImageScreen';
import ForgotPassword from '../../Screens/Login/ForgotPassword';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ListenToRoqya from '../../Screens/Plans/ListenToRoqya';
import HealthDisclaimer from '../../Screens/DrawerScreens/Raqi/HealthDisclaimer';
import Languages from '../../Screens/Languages/Languages';
import StripePayments from '../../Screens/Payments/StripePayments';
import DreamDisclaimer from '../../Screens/DrawerScreens/Raqi/DreamDisclaimer';
const StackNavigation = props => {
  const Stack = createStackNavigator();
  const [screen, setScreen] = useState('');
  const {setUserCredential, setUserTenantId, translateString} =
    useContext(DataContext);
  //language States
  const [changeLanguage, setChangeLanguage] = useState('');
  const [disclaimer, setdisclaimer] = useState('');
  const [guidelines, setguidelines] = useState('');
  const [terms, setterms] = useState('');
  const [questions, setquestions] = useState('');
  const [plan, setplan] = useState('');
  const [plandays, setplandays] = useState('');
  const [Prescription, setPrescription] = useState('');
  const [problemCategories, setProblemCategories] = useState('');

  useLayoutEffect(() => {
    AsyncStorage.getItem('skipStorage').then(value => {
      if (value == null || value == '') {
        setScreen('SliderPages');
      } else if (value == 'true') {
        AsyncStorage.getItem('LoginDetails').then(value => {
          if (value == null || value == '') {
            setScreen('Login');
          } else if (value != null) {
            AsyncStorage.getItem('TenantId').then(valueTenant => {
              if (valueTenant == null || valueTenant == '') {
                setScreen('Login');
              } else if (value != null) {
                setUserCredential(value);
                setUserTenantId(valueTenant);
                setScreen('Dashboard');
              }
            });
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
      if (valuelanguageCode == null || valuelanguageCode == '') {
        translateString(
          'en',
          [
            'Introduction',
            'Disclaimer',
            'Guidlines',
            'Terms & Conditions',
            'Questions',
            'Plan',
            'Plan Days',
            'Prescription',
            'Problem Categories',
          ],
          convertedText => {
            setChangeLanguage(convertedText[0]);
            setdisclaimer(convertedText[1]);
            setguidelines(convertedText[2]);
            setterms(convertedText[3]);
            setquestions(convertedText[4]);
            setplan(convertedText[5]);
            setplandays(convertedText[6]);
            setPrescription(convertedText[7]);
            setProblemCategories(convertedText[8]);
          },
        );
      } else if (valuelanguageCode != null) {
        translateString(
          JSON.parse(valuelanguageCode),
          [
            'Introduction',
            'Disclaimer',
            'Guidlines',
            'Terms & Conditions',
            'Questions',
            'Plan',
            'Plan Days',
            'Prescription',
            'Problem Categories',
          ],
          convertedText => {
            setChangeLanguage(convertedText[0]);
            setdisclaimer(convertedText[1]);
            setguidelines(convertedText[2]);
            setterms(convertedText[3]);
            setquestions(convertedText[4]);
            setplan(convertedText[5]);
            setplandays(convertedText[6]);
            setPrescription(convertedText[7]);
            setProblemCategories(convertedText[8]);
          },
        );
      }
    });
  }, []);

  return (
    <>
      {screen == 'SliderPages' && (
        <Stack.Navigator
          initialRouteName={'SliderPages'}
          screenOptions={{
            headerMode: 'screen',
            headerStyle: {
              backgroundColor: Colors.lightGray,
            },
            headerTintColor: Colors.black,
            headerTitleStyle: {
              fontSize: wp(5),
              lineHeight: Platform.OS == 'ios' ? wp(8) : wp(8),
            },
            headerTitleAlign: 'center',
            headerStyle: {
              elevation: 1,
              shadowOffset: {width: 1, height: 1},
              shadowColor: Colors.gray,
              shadowOpacity: 0.2,
            },
          }}>
          <Stack.Screen
            name="SliderPages"
            component={SliderPages}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerShown: true,
              title: 'Forgot Password',
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: 'Dashboard',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Introduction"
            component={Introduction}
            options={{
              title: {changeLanguage},
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="TermsNConditions"
            component={TermsNConditions}
            options={{
              title: 'Terms & Conditions',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="DisclaimerRaqi"
            component={DisclaimerRaqi}
            options={{
              title: 'Disclaimer Dream',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="HealthDisclaimer"
            component={HealthDisclaimer}
            options={{
              title: 'Disclaimer',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="DreamDisclaimer"
            component={DreamDisclaimer}
            options={{
              title: 'Disclaimer',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="Guidlines"
            component={Guidlines}
            options={{
              title: 'Guidelines',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="RaqiDetail"
            component={RaqiDetail}
            options={{
              title: 'Raqi Details',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{
              title: 'Problem Categories',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="QuestionnaireScreen"
            component={QuestionnaireScreen}
            options={{
              title: 'Questions',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{
              title: 'Payment',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen name="Plans" component={AllPlansScreen} />
          <Stack.Screen
            name="PlansCalanderScreen"
            component={PlansCalanderScreen}
            options={{
              title: 'Plan Days',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="PrescriptionScreen"
            component={PrescriptionScreen}
            options={{
              title: 'Prescription',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="ListenToRoqya"
            component={ListenToRoqya}
            options={{
              title: 'Prescription',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="AyaatScreen"
            component={AyaatScreen}
            options={{
              title: 'Ayaat',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="AyahImageScreen"
            component={AyahImageScreen}
            options={{
              title: 'Ayaat',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />

          <Stack.Screen
            name="Languages"
            component={Languages}
            options={{
              title: 'Languages',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="StripePayments"
            component={StripePayments}
            options={{
              title: 'StripePayments',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
        </Stack.Navigator>
      )}
      {screen == 'Login' && (
        <Stack.Navigator
          initialRouteName={screen}
          screenOptions={{
            headerMode: 'screen',
            headerStyle: {
              backgroundColor: Colors.lightGray,
            },
            headerTintColor: Colors.black,
            headerTitleStyle: {
              fontSize: wp(5),
              lineHeight: Platform.OS == 'ios' ? wp(8) : wp(8),
            },
            headerTitleAlign: 'center',
            headerStyle: {
              elevation: 1,
              shadowOffset: {width: 1, height: 1},
              shadowColor: Colors.gray,
              shadowOpacity: 0.2,
            },
          }}>
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SliderPages"
            component={SliderPages}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: 'Dashboard',
              headerTintColor: Colors.primaryColor,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerShown: true,
              title: 'Forgot Password',
            }}
          />
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Introduction"
            component={Introduction}
            options={{
              title: {changeLanguage},
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="TermsNConditions"
            component={TermsNConditions}
            options={{
              title: 'Terms & Conditions',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="DisclaimerRaqi"
            component={DisclaimerRaqi}
            options={{
              title: 'Disclaimer',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="HealthDisclaimer"
            component={HealthDisclaimer}
            options={{
              title: 'Disclaimer Dream',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="DreamDisclaimer"
            component={DreamDisclaimer}
            options={{
              title: 'Disclaimer',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="Guidlines"
            component={Guidlines}
            options={{
              title: 'Guidelines',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="RaqiDetail"
            component={RaqiDetail}
            options={{
              title: 'Raqi Details',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{
              title: 'Problem Categories',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="QuestionnaireScreen"
            component={QuestionnaireScreen}
            options={{
              title: 'Questions',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{
              title: 'Payment',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen name="Plans" component={AllPlansScreen} />
          <Stack.Screen
            name="PlansCalanderScreen"
            component={PlansCalanderScreen}
            options={{
              title: 'Plan Days',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="PrescriptionScreen"
            component={PrescriptionScreen}
            options={{
              title: 'Prescription',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="AyaatScreen"
            component={AyaatScreen}
            options={{
              title: 'Ayaat',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="AyahImageScreen"
            component={AyahImageScreen}
            options={{
              title: 'Ayaat',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="Languages"
            component={Languages}
            options={{
              title: 'Languages',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
        </Stack.Navigator>
      )}
      {screen == 'Dashboard' && (
        <Stack.Navigator
          initialRouteName={'Home'}
          screenOptions={{
            headerMode: 'screen',
            headerStyle: {
              backgroundColor: Colors.lightGray,
            },
            headerTintColor: Colors.black,
            headerTitleStyle: {
              fontSize: wp(5),
              lineHeight: Platform.OS == 'ios' ? wp(8) : wp(8),
            },
            headerTitleAlign: 'center',
            headerStyle: {
              elevation: 1,
              shadowOffset: {width: 1, height: 1},
              shadowColor: Colors.gray,
              shadowOpacity: 0.2,
            },
          }}>
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SliderPages"
            component={SliderPages}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerShown: true,
              title: 'Forgot Password',
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: 'Dashboard',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Introduction"
            component={Introduction}
            options={{
              title: <Text> {changeLanguage}</Text>,
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="TermsNConditions"
            component={TermsNConditions}
            options={{
              title: <Text>{terms}</Text>,
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="DisclaimerRaqi"
            component={DisclaimerRaqi}
            options={{
              title: <Text>{disclaimer}</Text>,
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="HealthDisclaimer"
            component={HealthDisclaimer}
            options={{
              title: <Text>{disclaimer}</Text>,
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="DreamDisclaimer"
            component={DreamDisclaimer}
            options={{
              title: 'Disclaimer Dream',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="Guidlines"
            component={Guidlines}
            options={{
              title: <Text>{guidelines}</Text>,
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="RaqiDetail"
            component={RaqiDetail}
            options={{
              title: 'Raqi Details',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{
              title: <Text>{problemCategories}</Text>,
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="QuestionnaireScreen"
            component={QuestionnaireScreen}
            options={{
              title: <Text>{questions}</Text>,
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{
              title: 'Payment',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="Plans"
            component={AllPlansScreen}
            options={{
              title: <Text>{plan}</Text>,
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="PlansCalanderScreen"
            component={PlansCalanderScreen}
            options={{
              title: <Text>{plandays}</Text>,
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="PrescriptionScreen"
            component={PrescriptionScreen}
            options={{
              title: <Text>{Prescription}</Text>,
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="ListenToRoqya"
            component={ListenToRoqya}
            options={{
              title: 'Prescription',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="AyaatScreen"
            component={AyaatScreen}
            options={{
              title: 'Ayaat',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="AyahImageScreen"
            component={AyahImageScreen}
            options={{
              title: 'Ayaat',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
          <Stack.Screen
            name="Languages"
            component={Languages}
            options={{
              title: 'Languages',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />

          <Stack.Screen
            name="StripePayments"
            component={StripePayments}
            options={{
              title: 'StripePayments',
              headerTintColor: Colors.primaryColor,
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: {
                backgroundColor: Colors.lightGray,
              },
            }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigation;
