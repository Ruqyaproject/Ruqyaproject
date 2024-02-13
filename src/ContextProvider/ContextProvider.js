// import axios from 'axios';
import React, {useState, createContext} from 'react';
import JsonServer from '../Constants/JsonServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translate from 'translate-google-api';
export const DataContext = createContext('DataContext');

const ContextProvider = props => {
  const [userInitialData, setUserInitialData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userTenantId, setUserTenantId] = useState('');
  const [userCredential, setUserCredential] = useState('');
  const [questionCategories,setQuestionCategories ] = useState([]);
  const [questionCategoriesId, setQuestionCategoriesId] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [setSelected, setSetSelected] = useState('');
  const [setSelectedFrequency, setSetSelectedFrequency] = useState('');
  const [filledQuestions, setFilledQuestions] = useState([]);
  const [userName, setuserName] = useState('');
  //i18n language
  const [language, setLanguage] = useState(false);
  const [isRTLOn, setIsRTLOn] = useState(false);
  const [Languagename, setLanguagename] = useState('');
  const [filterData, setfilterData] = useState('');
  const [userId, setuserId] = useState('');

  const saveToAsyncStorageCredentials = async (storageName, dataToInsert) => {
    await AsyncStorage.setItem(storageName, JSON.stringify(dataToInsert));
  };

  const getTenantId = (TenantData, callback) => {
    var TenantBody = JSON.stringify(TenantData);
    fetch(JsonServer.baseURL + 'services/app/Account/IsTenantAvailable', {
      method: 'POST',
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
      },
      body: TenantBody,
    })
      .then(response => response.json())
      .then(responseJson => {
        setUserTenantId(responseJson.result);
        callback(true, responseJson, null);
      })
      .catch(error => {
        callback(false, null, error);
      });
  };

  const getAccessToken = (tenantId, logInData, callback) => {
    var loginBody = JSON.stringify(logInData);
    fetch(JsonServer.baseURL + 'TokenAuth/Authenticate', {
      method: 'POST',
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
        'Abp.TenantId': 2,
      },
      body: loginBody,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success == false)
          callback(
            responseJson.success,
            responseJson.result,
            responseJson.error,
          );
        else
          callback(
            responseJson.success,
            responseJson.result,
            responseJson.error,
          );
      })
      .catch(error => {
        callback(false, null, error);
      });
  };

  const getAPICall = async (url, callback) => {
    var userTenantIdData = userTenantId.tenantId;
    var userData = {
      userNameOrEmailAddress: JSON.parse(userCredential).userNameOrEmailAddress,
      password: JSON.parse(userCredential).password,
      rememberClient: true,
    };
    getAccessToken(userTenantIdData, userData, (success, result, error) => {
      if (success == true) {
        var myHeaders = new Headers();
        myHeaders.append('Abp.TenantId', 2);
        myHeaders.append('Authorization', 'Bearer ' + result.accessToken);
        var requestOptions = {
          accept: 'text/plain',
          method: 'GET',
          headers: myHeaders,
        };
        fetch(url, requestOptions)
          .then(response => response.json())
          .then(responseJson => {
            callback(
              responseJson.success,
              responseJson.result,
              responseJson.error,
            );
          })
          .catch(error => {
            callback(false, null, error);
          });
      } else {
        callback(false, null, error);
      }
    });
  };

  const getAPICallAdmin = async (url, callback) => {
    var userTenantIdData = userTenantId.tenantId;

    var userData = {
      userNameOrEmailAddress: 'admin',
      password: '123qwe',
      rememberClient: true,
    };
    getAccessToken(userTenantIdData, userData, (success, result, error) => {
      if (success == true) {
        var myHeaders = new Headers();
        myHeaders.append('Abp.TenantId', 2);
        myHeaders.append('Authorization', 'Bearer ' + result.accessToken);
        var requestOptions = {
          accept: 'text/plain',
          method: 'GET',
          headers: myHeaders,
        };
        fetch(url, requestOptions)
          .then(response => response.json())
          .then(responseJson => {
            callback(
              responseJson.success,
              responseJson.result,
              responseJson.error,
            );
          })
          .catch(error => {
            callback(false, null, error);
          });
      } else {
        callback(false, null, error);
      }
    });
  };

  const postRequest = async (dataToInsert, url, callback) => {
    var userTenantIdData = userTenantId;
    var userData = {
      userNameOrEmailAddress: JSON.parse(userCredential).userNameOrEmailAddress,
      password: JSON.parse(userCredential).password,
      rememberClient: true,
    };
    getAccessToken(userTenantIdData, userData, (success, result, error) => {
      var dataBody = JSON.stringify(dataToInsert);
      fetch(url, {
        method: 'POST',
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          'Abp.TenantId': userTenantId,
          Authorization: 'Bearer ' + result.accessToken,
        },
        body: dataBody,
      })
        .then(response => response.json())
        .then(responseJson => {
          callback(responseJson.success, responseJson.result, error);
        })
        .catch(error => {
          callback(false, null, error);
        });
    });
  };
  const postRequestAdmin = async (dataToInsert, url, callback) => {
    var userTenantIdData = userTenantId;
    var userData = {
      userNameOrEmailAddress: 'admin',
      password: '123qwe',
      rememberClient: true,
    };
    getAccessToken(userTenantIdData, userData, (success, result, error) => {
      var dataBody = JSON.stringify(dataToInsert);
      fetch(url, {
        method: 'POST',
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          'Abp.TenantId': userTenantId,
          Authorization: 'Bearer ' + result.accessToken,
        },
        body: dataBody,
      })
        .then(response => response.json())
        .then(responseJson => {
          callback(responseJson.success, responseJson.result, error);
        })
        .catch(error => {
          callback(false, null, error);
        });
    });
  };

  const putRequest = async (dataToInsert, url, callback) => {
    var userTenantIdData = userTenantId;
    var userData = {
      userNameOrEmailAddress: JSON.parse(userCredential).userNameOrEmailAddress,
      password: JSON.parse(userCredential).password,
      rememberClient: true,
    };
    getAccessToken(userTenantIdData, userData, (success, result, error) => {
      var dataBody = JSON.stringify(dataToInsert);
      fetch(url, {
        method: 'PUT',
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          'Abp.TenantId': userTenantId,
          Authorization: 'Bearer ' + result.accessToken,
        },
        body: dataBody,
      })
        .then(response => response.json())
        .then(responseJson => {
          callback(
            responseJson.success,
            responseJson.result,
            responseJson.error,
          );
        })
        .catch(error => {
          callback(false, null, error);
        });
    });
  };
  const submitSignUpInfo = (tenantId, signupData, callback) => {
    var signupBody = JSON.stringify(signupData);
    fetch(JsonServer.baseURL + 'services/app/User/Create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Abp.TenantId': tenantId,
      },
      body: signupBody,
    })
      .then(response => response.json())
      .then(responseJson => {
        callback(responseJson.success, responseJson.result, responseJson.error);
      })
      .catch(error => {
        callback(false, null, error);
      });
  };

  const translateString = async (language, text, callback) => {
    var convertedText = await translate(text, {
      tld: 'com',
      to: language,
    });
    callback(convertedText);
  };

  const getLanguagesName = () => {
    var url = JsonServer.baseURL + 'services/app/Language/GetAllLanguageFilter';
    getAPICall(url, (success, result, error) => {
      if (success == true) {
        if (result.items.length > 0) {
          console.log(result);
          setLanguagename(result.items);
        }
      } else {
        console.log(error, 'error', error.details);
      }
    });
  };

  const fetchUserData = async () => {
    var url =
      JsonServer.baseURL + 'services/app/Session/GetCurrentLoginInformations';
    getAPICall(url, (success, result, error) => {
      if (success == true) {
        setuserName(result.user.userName);
        setuserId(result.user.id);
      }
    });
  };

  const value = {
    Languagename,
    userInitialData,
    isDrawerOpen,
    userTenantId,
    userCredential,
    questionCategories,
    questionsData,
    setSelected,
    setSelectedFrequency,
    filledQuestions,
    userName,
    userId,
    questionCategoriesId,
    setQuestionCategoriesId,
    setSetSelected,
    setSetSelectedFrequency,
    setFilledQuestions,
    setQuestionsData,
    setQuestionCategories,
    setUserCredential,
    getTenantId,
    setUserTenantId,
    setIsDrawerOpen,
    setUserInitialData,
    getAccessToken,
    setuserId,
    saveToAsyncStorageCredentials,
    getAPICall,
    postRequest,
    submitSignUpInfo,
    putRequest,
    getAPICallAdmin,
    postRequestAdmin,
    getLanguagesName,
    translateString,
    fetchUserData,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default ContextProvider;
