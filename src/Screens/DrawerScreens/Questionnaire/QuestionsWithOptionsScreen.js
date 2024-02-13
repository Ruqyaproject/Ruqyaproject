import React, {useEffect, useState, useContext} from 'react';
import {Text, View} from 'react-native';
import {Card} from 'native-base';
import {RadioButton} from 'react-native-paper';
import {DataContext} from '../../../ContextProvider/ContextProvider';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';

const QuestionsWithOptionsScreen = param => {
  // state for translation
  const [question1, setquestion1] = useState('');
  const [frequency, setfrequency] = useState('');
  const [submit, setsubmit] = useState('');
  const [previous, setprevious] = useState('');
  const [loading, setLoading] = useState(false);
  const [lessthanmonth, setlessthanmonth] = useState('');
  const [month3to6, setmonth3to6] = useState('');
  const [monrethan6, setmonrethan6] = useState('');
  const [finanaceAnswers, setfinanaceAnswers] = useState('');
  const [financeLight, setfinanceLight] = useState('');
  const [intenseiveFinance, setintenseiveFinance] = useState('');
  const [dreamLight, setdreamLight] = useState('');
  const [dreamNormal, setdreamNormal] = useState('');
  const [dreamInstensive, setdreamInstensive] = useState('');
  const [questionCategoryIdData, setquestionCategoryIdData] = useState(null);
  const {
    getAPICall,
    userCredential,
    questionsData,
    questionCategories,
    translateString,
  } = useContext(DataContext);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
      if (valuelanguageCode == null || valuelanguageCode == '') {
        // selectionOnPress(JSON.parse("en"));
        translateString(
          'en',
          [
            'Select Question',
            'Select Frequency',
            'Submit',
            'Less than 2 months',
            '3 To 6 Months',
            'More Than 6 Months',
            'Normal: 21 - 40% & Contact a Raqi',
            'Light: 1 - 20%',
            'Intensive: 41 - 100% Contact a Raqi',
            'Light: < 5 times a year',
            'once a month Contact a Raqi optinal',
            'Intensive: > 1 a month & Contact a Raqi',
          ],
          convertedText => {
            setquestion1(convertedText[0]);
            setfrequency(convertedText[1]);
            setsubmit(convertedText[2]);
            setprevious(convertedText[3]);
            setmonth3to6(convertedText[4]);
            setmonrethan6(convertedText[5]);
            setfinanaceAnswers(convertedText[6]);
            setfinanceLight(convertedText[7]);
            setintenseiveFinance(convertedText[8]);
            setdreamLight(convertedText[9]);
            setdreamNormal(convertedText[10]);
            setdreamInstensive(convertedText[11]);
          },
        );
      } else if (valuelanguageCode != null) {
        // selectionOnPress(JSON.parse(valuelanguageCode));
        translateString(
          JSON.parse(valuelanguageCode),
          [
            'Select Question',
            'Select Frequency',
            'Submit',
            'Less than 2 months',
            '3 To 6 Months',
            'More Than 6 Months',
            'Normal: 21 - 40% & Contact a Raqi',
            'Light: 1 - 20%',
            'Intensive: 41 - 100% Contact a Raqi',
            'Light: < 5 times a year',
            'once a month Contact a Raqi optinal',
            'Intensive: > 1 a month & Contact a Raqi',
          ],
          convertedText => {
            setquestion1(convertedText[0]);
            setfrequency(convertedText[1]);
            setsubmit(convertedText[2]);
            setprevious(convertedText[3]);

            setmonth3to6(convertedText[4]);
            setmonrethan6(convertedText[5]);
            setfinanaceAnswers(convertedText[6]);
            setfinanceLight(convertedText[7]);
            setintenseiveFinance(convertedText[8]);
            setdreamLight(convertedText[9]);
            setdreamNormal(convertedText[10]);
            setdreamInstensive(convertedText[11]);
          },
        );
      }
    });
    setquestionCategoryIdData(questionsData[0].answers[0].categoryId);
  }, []);
   const {setSelected, setSelectedFrequency} = useContext(DataContext);
  var optionsViewList = [];
  const [checked, setChecked] = React.useState('first');
  param.questionScreenData.options.map((data, index) => {
    optionsViewList.push(
      <View style={{flexDirection: 'row'}} key={index}>
        <RadioButton.Android
          color="#6d81bf"
          value={data}
          fontSize={10}
          status={setSelected == data ? 'checked' : 'unchecked'}
          onPress={() => param.setSelected(param.questionScreenData, data)}
        />
        {param.questionScreenData.options.length > 0 && (
          <Text style={[styles.GuidelineBodyText, {paddingTop: 8}]}>
            {data.optionText}
          </Text>
        )}
      </View>,
    );
  });

  return (
    <View style={{flex: 1}}>
      <Card
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 20,
          height: '70%',
          elevation: 10,
        }}>
        <ScrollView>
          <View style={{padding: 10}}>
            <View>
              {param.questionScreenData.question.length > 0 && (
                <Text style={styles.GuidelineHeadingText}>
                  {param.questionScreenData.question}
                </Text>
              )}
            </View>
            {optionsViewList}
          </View>
        </ScrollView>
        <Text style={[styles.GuidelineHeadingText, {paddingHorizontal: 10}]}>
          {frequency}
        </Text>
        <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
          <View style={{flexDirection: 'row'}}>
            <RadioButton.Android
              color="#6d81bf"
              value="Light"
              status={
                setSelectedFrequency === 'Light' ? 'checked' : 'unchecked'
              }
              onPress={() =>
                param.setSelectedFrequency(param.questionScreenData, 'Light')
              }></RadioButton.Android>
            <Text style={[styles.GuidelineBodyText, {paddingTop: 8}]}>
              {(() => {
                if (questionCategoryIdData === 1) {
                  return previous;
                } else if (questionCategoryIdData === 2) {
                  return dreamLight;
                } else {
                  return financeLight;
                }
              })()}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <RadioButton.Android
              color="#6d81bf"
              value="Regular"
              status={
                setSelectedFrequency === 'Regular' ? 'checked' : 'unchecked'
              }
              onPress={() =>
                param.setSelectedFrequency(param.questionScreenData, 'Regular')
              }></RadioButton.Android>
            <Text style={[styles.GuidelineBodyText, {paddingTop: 8}]}>
              {(() => {
                if (questionCategoryIdData === 1) {
                  return month3to6;
                } else if (questionCategoryIdData === 2) {
                  return dreamNormal;
                } else {
                  return finanaceAnswers;
                }
              })()}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <RadioButton.Android
              color="#6d81bf"
              value="Intensive"
              status={
                setSelectedFrequency === 'Intensive' ? 'checked' : 'unchecked'
              }
              onPress={() =>
                param.setSelectedFrequency(
                  param.questionScreenData,
                  'Intensive',
                )
              }></RadioButton.Android>
            <Text style={[styles.GuidelineBodyText, {paddingTop: 8}]}>
              {(() => {
                if (questionCategoryIdData === 1) {
                  return monrethan6;
                } else if (questionCategoryIdData === 2) {
                  return dreamInstensive;
                } else {
                  return intenseiveFinance;
                }
              })()}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};
export default QuestionsWithOptionsScreen;
// define your styles
