import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useRef, useContext, useEffect } from 'react';
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
import DropdownAlert from 'react-native-dropdownalert';
import Colors from '../../../Colors/Colors';
import Button_Component from '../../../Components/Button/Button_Component';
import Button_WithoutIcon_Component from '../../../Components/Button/Button_WithoutIcon_Component';
import JsonServer from '../../../Constants/JsonServer';
import { DataContext } from '../../../ContextProvider/ContextProvider';
import styles from './style';
import Dialog from 'react-native-dialog';

const Categories = ({ route, navigation }) => {
  const {
    questionCategories,
    setQuestionsData,
    getAPICall,
    filledQuestions,
    postRequest,
    translateString,
    questionCategoriesId,
  } = useContext(DataContext);

  const [treatmentPlan, setTreatmentPlan] = useState('Light');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState('');

  const [languageCategoriesId, setlanguageCategoriesId] = useState('');
  const [agree, setAgree] = useState('');

  let dropDownAlertRef = null;

  useEffect(() => {
    filledQuestions
    setLoading(true);
    AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
      if (valuelanguageCode == null || valuelanguageCode == '') {
        // selectionOnPress('en');
        setlanguageCategoriesId('en');
        translateString('en', ['Submit Plan'], convertedText => {
          setAgree(convertedText[0]);
        });
      } else if (valuelanguageCode != null) {
        // selectionOnPress(JSON.parse(valuelanguageCode));

        setlanguageCategoriesId(JSON.parse(valuelanguageCode));
        translateString(
          JSON.parse(valuelanguageCode),
          ['Submit Plan'],
          convertedText => {
            setAgree(convertedText[0]);
          },
        );
      }
    });

  }, []);
  console.log("filledQuestions", filledQuestions)
  // const selectionOnPress = (categoryId, fromHealth) => {
  //
  //   var url =
  //     JsonServer.baseURL +
  //     "services/app/Questionnaires/GetAllDataByCategoryId?Id=" + categoryId;
  //   getAPICall(url, (success, result, error) => {
  //     if (result.questions.length > 0) {
  //       var questions = [];
  //       result.questions.forEach(element => {
  //         questions.push({
  //           answers: element.answers,
  //           id: element.id,
  //           questionText: element.questionText,
  //           frequencyLevel: "Light"
  //         })
  //       });

  //       setQuestionsData(questions);
  //       if (result.questions[0].answers.length > 0)
  //         navigation.navigate("QuestionnaireScreen", { fromHealthParam: fromHealth })
  //       else
  //         dropDownAlertRef.alertWithType("error", "Alert", 'No Answers found against this category');
  //     }
  //     else {
  //       dropDownAlertRef.alertWithType("error", "Alert", 'No question found against this category');
  //     }

  //   })
  // }

  // language by language code function

  const selectionOnPress = async (languageCode, categoryId, fromHealth,) => {

    var urlTerms =
      JsonServer.baseURL +
      'services/app/LanguageQuestionnaires/GetAllLanguageQuestionnairesByLanguageCodeAndCategoryId?languageCode=' + languageCode + '&categoryId=' + categoryId;
    getAPICall(urlTerms, (success, result, error) => {
      if (success) {

        setLoading(false);
        var questions = [];
        result.questions.forEach(element => {
          questions.push({
            answers: element.answers,
            id: element.id,
            questionText: element.questionText,
            frequencyLevel: 'Light',
          });
        });

        setQuestionsData(questions);
        if (result.questions[1].answers.length > 1) {
          navigation.navigate("QuestionnaireScreen", { fromHealthParam: fromHealth })
        }
        else
          dropDownAlertRef.alertWithType("error", "Alert", 'No Answers found against this category');
      }
      else {
        dropDownAlertRef.alertWithType("error", "Alert", 'No question found against this category');
      }

    })
  }

  // const submitAllQuestions = () => {
  //   var questionAnswersArray = filledQuestions;
  //   if (filledQuestions.length > 0) {
  //     questionAnswersArray.forEach(element => {
  //       if (
  //         element.filter(
  //           x => x.optionText == 'Yes' && x.frequencyLevel == 'Intensive',
  //         ).length > 0
  //       ) {
  //         setTreatmentPlan('Intensive');
  //         setShowPopup(true);
  //       } else if (
  //         element.filter(
  //           x => x.optionText == 'Yes' && x.frequencyLevel == 'Regular',
  //         ).length > 0
  //       ) {
  //         setTreatmentPlan('Regular');
  //         setShowPopup(true);
  //       }
  //       else if (
  //         element.filter(
  //           x => x.optionText == 'Yes' && x.frequencyLevel == 'Light',
  //         ).length > 0
  //       ) {
  //         setTreatmentPlan('Light');
  //         console.log("no data")
  //         // alert('Frequency level light dont need prescription',)
  //         dropDownAlertRef.alertWithType(
  //           'Alert',
  //           'Alert',
  //           'Frequency level light dont need prescription',
  //         );
  //       }
  //       else {
  //         console.log("log")
  //         dropDownAlertRef.alertWithType(
  //           'Alert',
  //           'Alert',
  //           'Frequency level light dont need prescription',
  //         );
  //       }
  //     }
  //     )
  //   }
  //   else {
  //     dropDownAlertRef.alertWithType(
  //       'Alert',
  //       'Alert',
  //       'Please select any problem to make prescription',
  //     );
  //     console.log("no")
  //   }
  // }
  const submitAllQuestions = () => {
    if (filledQuestions.length > 0) {
      let frequencyLevels = filledQuestions.map(element => element[0].frequencyLevel);

      if (frequencyLevels.every(level => level === "Light")) {
        setShowPopup(true);
        console.log("All questions are in Light frequency.");
        // Show the appropriate message or action for all Light frequency questions
      } else {
        const highestFrequency = Math.max(
          ...frequencyLevels.map(level => {
            if (level === "Regular") return 1;
            if (level === "Intensive") return 2;
            return 0;
          })
        );

        if (highestFrequency === 2) {
          setTreatmentPlan('Intensive');
        } else if (highestFrequency === 1) {
          setTreatmentPlan('Regular');
        }

        setShowPopup(true);
        console.log(`Highest frequency level: ${highestFrequency}`);
        // Show the appropriate message or action for Regular or Intensive frequency
      }
    } else {
      dropDownAlertRef.alertWithType(
        'Alert',
        'Alert',
        'Please select any problem to make a prescription'
      );
      console.log("No questions selected");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <DropdownAlert
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
        containerStyle={{ backgroundColor: 'green' }}
        closeInterval={1000}
        showCancel={false}
      />
      <Dialog.Container visible={showPopup}>
        <Dialog.Title>Your Treatment Plan is {treatmentPlan}</Dialog.Title>
        <Dialog.Description>
          You have to share $50 to make your plan. Do you want to proceed?
        </Dialog.Description>
        <Dialog.Button onPress={() => setShowPopup(false)} label="No" />
        <Dialog.Button
          onPress={() => {
            setShowPopup(false);
            //navigation.navigate("StripePayments", { questionAnswersArray: filledQuestions, planName: route.params.planName })
            navigation.navigate('StripePayments', {
              questionAnswersArray: filledQuestions,
              planName: route.params.planName,
            });
          }}
          label="Yes, Sure"
        />
      </Dialog.Container>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* 0 and 1 */}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.GuidelineContainerCard}
            onPress={() => {
              navigation.navigate('HealthDisclaimer', {
                pressHandle: () =>
                  selectionOnPress(
                    languageCategoriesId,
                    questionCategories[0].categoryId,
                    true,

                  ),
              });
            }}
          // onPress={() => {
          //   selectionOnPress(
          //     languageCategoriesId,
          //     questionCategories[0].categoryId,
          //   );
          // }}
          >
            <Text style={styles.GuidelineCardText}>
              {questionCategories[0].name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.GuidelineContainerCard, { marginLeft: 10 }]}
            onPress={() => {
              navigation.navigate('HealthDisclaimer', {
                pressHandle: () =>
                  selectionOnPress(
                    languageCategoriesId,
                    questionCategories[1].categoryId,
                    true,
                  ),
              });
            }}>
            <Text style={styles.GuidelineCardText}>
              {questionCategories[1].name}
            </Text>
          </TouchableOpacity>
        </View>
        {/* 2 and 3 */}
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <TouchableOpacity
            style={styles.GuidelineContainerCard}
            onPress={() => {
              selectionOnPress(
                languageCategoriesId,
                questionCategories[2].categoryId,
              );
            }}>
            <Text style={styles.GuidelineCardText}>
              {questionCategories[2].name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.GuidelineContainerCard, { marginLeft: 10 }]}
            onPress={() => {
              selectionOnPress(
                languageCategoriesId,
                questionCategories[3].categoryId,
              );
            }}>
            <Text style={styles.GuidelineCardText}>
              {questionCategories[3].name}
            </Text>
          </TouchableOpacity>
        </View>
        {/* 4 and 5 */}
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <TouchableOpacity
            style={styles.GuidelineContainerCard}
            onPress={() => {
              selectionOnPress(
                languageCategoriesId,
                questionCategories[4].categoryId,
              );
            }}>
            <Text style={styles.GuidelineCardText}>
              {questionCategories[4].name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.GuidelineContainerCard, { marginLeft: 10 }]}
            onPress={() => {
              selectionOnPress(
                languageCategoriesId,
                questionCategories[5].categoryId,
              );
            }}>
            <Text style={styles.GuidelineCardText}>
              {questionCategories[5].name}
            </Text>
          </TouchableOpacity>
        </View>
        {/* 6 and 7 */}
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <TouchableOpacity
            style={styles.GuidelineContainerCard}
            onPress={() => {
              selectionOnPress(
                languageCategoriesId,
                questionCategories[6].categoryId,
              );
            }}>
            <Text style={styles.GuidelineCardText}>
              {questionCategories[6].name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Button_WithoutIcon_Component
          text={agree}
          onPress={() => submitAllQuestions()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Categories;
