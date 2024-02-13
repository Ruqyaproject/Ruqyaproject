/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import { LogBox } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
} from 'native-base';
import QuestionsWithOptionsScreen from './QuestionsWithOptionsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import { Card, RadioButton } from 'react-native-paper';
import { DataContext } from '../../../ContextProvider/ContextProvider';
import Colors from '../../../Colors/Colors';
import Button_Component from '../../../Components/Button/Button_Component';
import Button_Back_Component from '../../../Components/Button/Button_Back_Component';
import Button_WithoutIcon_Component from '../../../Components/Button/Button_WithoutIcon_Component';

const QuestionnaireScreen = ({ route, navigation }) => {
  const {
    questionsData,
    setSetSelected,
    setSetSelectedFrequency,
    setFilledQuestions,
    questionCategories,
    getAPICall,
    filledQuestions,
    postRequest,
    translateString,
  } = useContext(DataContext);

  // variable to get data from database / file
  const [QuestionsInitialData, setQuestionsData] = useState(questionsData);
  // variable to fill flat list
  const [QuestionnaireData, setQuestionnaireData] = useState([]);
  // variable to send data to questions screen
  const [QuestionScreenData, setQuestionScreenData] = useState({
    id: 1,
    count: 1,
    question: questionsData[0].questionText,
    options: questionsData[0].answers,
    answer: questionsData[0].answers[0].optionText,
  });
  const [selectedId, setSelectedId] = useState(1);
  const [questionAnswersArray, setquestionAnswersArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef();
  const [checked, setChecked] = React.useState('');
  const [loading, setLoading] = useState(false);

  // state for translation
  const [question1, setquestion1] = useState('');
  const [frequency, setfrequency] = useState('');
  const [submit, setsubmit] = useState('');
  const [previous, setprevious] = useState('');
  const [next, setnext] = useState('');
  // Hard Coded Data google Api transalation
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
      if (valuelanguageCode == null || valuelanguageCode == '') {
        // selectionOnPress(JSON.parse("en"));
        translateString(
          'en',
          [
            'Select Question',
            'Less Than 2 Months',
            'Submit',
            'Previous',
            'Next',
          ],
          convertedText => {
            setquestion1(convertedText[0]);
            setfrequency(convertedText[1]);
            setsubmit(convertedText[2]);
            setprevious(convertedText[3]);
            setnext(convertedText[4]);
          },
        );
      } else if (valuelanguageCode != null) {
        // selectionOnPress(JSON.parse(valuelanguageCode));
        translateString(
          JSON.parse(valuelanguageCode),
          [
            'Select Question',
            'Less Than 2 Months',
            'Submit',
            'Previous',
            'Next',
          ],
          convertedText => {
            setquestion1(convertedText[0]);
            setfrequency(convertedText[1]);
            setsubmit(convertedText[2]);
            setprevious(convertedText[3]);
            setnext(convertedText[4]);
          },
        );
      }
    });
  }, [translateString]);

  const onPressFlatListIndex = item => {
    setQuestionScreenData(item);
    setSetSelected(item.answer);
    setSetSelectedFrequency(item.frequencyLevel);
    setSelectedId(item.id);
  };
  const onPressFlatListIndexDecrement = item => {
    setQuestionScreenData(item);
    setSetSelected(item.answer);
    setSetSelectedFrequency(item.frequencyLevel);
    setSelectedId(item.id);
  };
  const getValueFromIncermental = counter => {
    if (counter == null) {
    } else {
      var valueAtIndex = QuestionnaireData[counter];
      onPressFlatListIndex(valueAtIndex);
    }
  };
  const getValueFromDecermental = counter => {
    if (counter == null) {
    } else {
      var counter = counter - 2;
      var valueAtIndexDecrement = QuestionnaireData[counter];
      onPressFlatListIndexDecrement(valueAtIndexDecrement);
    }
  };

  useEffect(() => {
    //Read data from file and start pushing into QuestionnaireData to make data ready for flatlist
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    var inceremental = 1;
    var QuestionnaireDataToSetState = [];
    QuestionsInitialData.map(data => {
      QuestionnaireDataToSetState.push({
        id: inceremental,
        count: inceremental,
        question: data.questionText,
        options: data.answers,
        answer: questionsData[0].answers[0].optionText,
        frequencyLevel: data.frequencyLevel,
      });
      inceremental++;
    });
    setQuestionnaireData(QuestionnaireDataToSetState);
  }, []);

  //#region Horizontal Flatlist Population

  const HorizontalFlatlistRenderItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedId ? Colors.primaryColor : 'white';
    const fontColor = item.id === selectedId ? 'white' : 'black';
    return (
      <HorizontalFlatlistItem
        item={item}
        onPress={() => {
          onPressFlatListIndex(item);
        }}
        HorizontalFlatlistItemStyle={{ backgroundColor, fontColor }}
      />
    );
  };
  const HorizontalFlatlistItem = ({
    item,
    onPress,
    HorizontalFlatlistItemStyle,
  }) => {
    return (
      <View
        style={{
          margin: 10,
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.circularViewSelected, HorizontalFlatlistItemStyle]}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 10,
              color: HorizontalFlatlistItemStyle.fontColor,
            }}>
            {item.count}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  //#endregion

  const setSelected = (item, option) => {
    debugger
    // set state from datacontext to handle checked state on question screen
    setSetSelected(option);
    // set selected option retreived from child component (wuestion screen) to state so that it can be passed to API for edit / create
    var questionScreenData = QuestionnaireData;
    questionScreenData.find(x => x.id == item.id).answer = option;
    setQuestionnaireData(questionScreenData);
    var filteredArr = questionAnswersArray.filter(
      itemvalue => itemvalue.questionText === item.question,
    );
    if (filteredArr.length >= 1) {
      var index = questionAnswersArray.findIndex(
        x => x.questionText === item.question,
      );
      questionAnswersArray[index].optionText = option.optionText;
    } else {
      questionAnswersArray.push({
        questionText: item.question,
        optionText: option.optionText,
        frequencyLevel: '',
      });
      setquestionAnswersArray(questionAnswersArray);
    }
  };
  const setSelectedFrequency = (item, option) => {
    debugger
    // set state from datacontext to handle checked state on question screen
    setSetSelectedFrequency(option);
    // set selected option retreived from child component (wuestion screen) to state so that it can be passed to API for edit / create
    var questionScreenData = QuestionnaireData;
    questionScreenData.find(x => x.id == item.id).frequencyLevel = option;
    setQuestionnaireData(questionScreenData);
    var filteredArr = questionAnswersArray.filter(
      itemvalue => itemvalue.questionText === item.question,
    );
    if (filteredArr.length >= 1) {
      var index = questionAnswersArray.findIndex(
        x => x.questionText === item.question,
      );
      questionAnswersArray[index].frequencyLevel = option;
    } else {
      questionAnswersArray.push({
        questionText: item.question,
        optionText: item.answer,
        frequencyLevel: option,
      });
      setquestionAnswersArray(questionAnswersArray);
    }
  };

  const submitQuestionnairesAndFrequency = () => {
debugger
    var filledQues = filledQuestions;
    filledQues.push(questionAnswersArray);
    setFilledQuestions(filledQues);
    // route.params.fromHealthParams;
    // route.params.fromDeamParam;
    // navigation.navigate('StripePayments');
    route.params.fromHealthParam ? navigation.pop(2) : navigation.goBack();
    
    // route.params.fromDeamParam ? navigation.pop(2) : navigation.goBack();
  };
  const handleModal = index => {
    setModalVisible(!modalVisible);
    // setplanbtn(index);
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#6d81bf" />
      <Container style={styles.container}>
        <ScrollView contentContainerStyle={{}}>
          <Text style={[styles.GuidelineHeadingText, { paddingHorizontal: 10 }]}>
            {question1}
          </Text>
          <FlatList
            contentContainerStyle={{}}
            ref={flatListRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={QuestionnaireData}
            keyExtractor={item => item.id}
            extraData={selectedId}
            renderItem={(item, index) =>
              HorizontalFlatlistRenderItem(item, index)
            }
          />
          <QuestionsWithOptionsScreen
            questionScreenData={QuestionScreenData}
            setSelected={(item, option) => setSelected(item, option)}
            setSelectedFrequency={(item, option) =>
              setSelectedFrequency(item, option)
            }
            onPressFlatListIndex={onPressFlatListIndex}
            onPressFlatListIndexDecrement={
              onPressFlatListIndexDecrement
            }></QuestionsWithOptionsScreen>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 20,
            }}>
            {selectedId == 1 ? (
              <View style={{ alignItems: 'flex-end', marginRight: 5 }}>
                <Button_Back_Component
                  text={''}
                  onPress={() => getValueFromDecermental(selectedId)}
                />
              </View>
            ) : (
              <View style={{ alignItems: 'flex-end', marginRight: 5 }}>
                <Button_Back_Component
                  text={previous}
                  onPress={() => getValueFromDecermental(selectedId)}
                />
              </View>
            )}

            {selectedId === QuestionnaireData.length ? (
              <View style={{ alignItems: 'flex-end', marginRight: 5 }}>
                <Button_WithoutIcon_Component
                  text={submit}
                  onPress={() => submitQuestionnairesAndFrequency()}
                />
              </View>
            ) : (
              <View style={{ alignItems: 'flex-end' }}>
                <Button_Component
                  text={next}
                  onPress={() => getValueFromIncermental(selectedId)}
                />
              </View>
            )}
          </View>

          {/* <Modal
            propagateSwipe={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <ScrollView>
              <Header style={{ backgroundColor: '#6d81bf' }}>
                <Left>
                  <Button transparent onPress={() => handleModal()}>
                    <Icon
                      style={{ fontSize: 20, color: 'white' }}
                      name="arrow-back"
                    />
                  </Button>
                </Left>
                <Body>
                  <Title style={{ color: 'white' }}>Frequency</Title>
                </Body>
                <Right></Right>
              </Header>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#e6e8f6',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <Card
                  style={{
                    padding: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    height: 250,
                    width: 300,
                    elevation: 10,
                  }}>
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <RadioButton.Android
                        value="Light"
                        status={
                          checked !== ''
                            ? checked == 'Light'
                              ? 'checked'
                              : 'unchecked'
                            : 'unchecked'
                        }
                        onPress={() =>
                          setChecked('Light')
                        }></RadioButton.Android>

                      <Text
                        style={{ fontSize: 20, fontWeight: '400', padding: 2 }}>
                        {frequency}
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <RadioButton.Android
                        value="Regular"
                        status={checked === 'Regular' ? 'checked' : 'unchecked'}
                        onPress={() =>
                          setChecked('Regular')
                        }></RadioButton.Android>
                      <Text
                        style={{ fontSize: 20, fontWeight: '400', padding: 2 }}>
                        3 To 6 Months
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <RadioButton.Android
                        value="Intensive"
                        status={
                          checked === 'Intensive' ? 'checked' : 'unchecked'
                        }
                        onPress={() =>
                          setChecked('Intensive')
                        }></RadioButton.Android>
                      <Text
                        style={{ fontSize: 20, fontWeight: '400', padding: 2 }}>
                        More Than 6 Months
                      </Text>
                    </View>
                  </View>
                </Card>

                <View style={{ paddingTop: 30 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#6d81bf',
                      height: 50,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 170,
                    }}
                    onPress={submitQuestionnairesAndFrequency}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 18,
                      }}>
                      "sdsd"
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </Modal> */}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default QuestionnaireScreen;
