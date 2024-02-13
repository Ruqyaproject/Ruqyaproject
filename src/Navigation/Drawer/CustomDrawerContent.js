import React, {useRef, useState, useEffect, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Colors from '../../Colors/Colors';
import {DataContext} from '../../ContextProvider/ContextProvider';
import constants from '../../Constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = props => {
  const [selectedButton, setSelectedButton] = useState('');
  const [changeLanguage, setChangeLanguage] = useState('');
  const [visitPlan, setVisitPlan] = useState('');
  const [logout, setLogout] = useState('');
  const {userCredential, translateString} = useContext(DataContext);

  useEffect(() => {
    AsyncStorage.getItem('languageCode').then(valuelanguageCode => {
      if (valuelanguageCode == null || valuelanguageCode == '') {
        translateString(
          'en',
          ['Visit Plan', 'Change Language', 'Logout'],
          convertedText => {
            setChangeLanguage(convertedText[1]);
            setVisitPlan(convertedText[0]);
            setLogout(convertedText[2]);
          },
        );
      } else if (valuelanguageCode != null) {
        translateString(
          JSON.parse(valuelanguageCode),
          ['Visit Plan', 'Change Language', 'Logout'],
          convertedText => {
            setChangeLanguage(convertedText[1]);
            setVisitPlan(convertedText[0]);
            setLogout(convertedText[2]);
          },
        );
      }
    });
  }, []);

  const selectionOnPress = async screenName => {
    setSelectedButton(screenName);
    if (screenName == 'Logout') {
    } else props.navigation.navigate(screenName);
  };

  const handleLogoutBtn = () => {
    AsyncStorage.clear();
    props.navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={style.header}>
        <Text
          style={{
            fontSize: wp(4),
            color: Colors.black,
            lineHeight: Platform.OS == 'ios' ? wp(6) : null,
          }}>
          {' '}
          {JSON.parse(userCredential).userNameOrEmailAddress}
        </Text>
      </View>
      <View style={style.headerWrapper}>
        <View style={style.drawersection}>
          <TouchableOpacity onPress={() => selectionOnPress('Plans')}>
            <View
              style={[
                style.draweritem,
                {
                  backgroundColor:
                    selectedButton === 'Plans'
                      ? Colors.primaryColor
                      : Colors.white,
                },
              ]}>
              <Entypo
                name="documents"
                style={{
                  color:
                    selectedButton === 'Plans' ? Colors.white : Colors.black,
                }}
                size={22}
              />
              <View style={style.itemtext}>
                <Text
                  style={[
                    style.itemname,
                    {
                      color:
                        selectedButton === 'Plans'
                          ? Colors.white
                          : Colors.black,
                      alignSelf: 'flex-start',
                    },
                  ]}>
                  {' '}
                  {visitPlan}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectionOnPress('Languages')}>
            <View
              style={[
                style.draweritem,
                {
                  backgroundColor:
                    selectedButton === 'logout'
                      ? Colors.primaryColor
                      : Colors.white,
                },
              ]}>
              <Entypo
                name="language"
                style={{
                  color:
                    selectedButton === 'logout' ? Colors.white : Colors.black,
                }}
                size={22}
              />
              <View style={style.itemtext}>
                <Text
                  style={[
                    style.itemname,
                    {
                      color:
                        selectedButton === 'logout'
                          ? Colors.white
                          : Colors.black,
                      alignSelf: 'flex-start',
                    },
                  ]}>
                  {' '}
                  {changeLanguage}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleLogoutBtn()}>
            <View
              style={[
                style.draweritem,
                {
                  backgroundColor:
                    selectedButton === 'logout'
                      ? Colors.primaryColor
                      : Colors.white,
                },
              ]}>
              <Entypo
                name="export"
                style={{
                  color:
                    selectedButton === 'logout' ? Colors.white : Colors.black,
                }}
                size={22}
              />
              <View style={style.itemtext}>
                <Text
                  style={[
                    style.itemname,
                    {
                      color:
                        selectedButton === 'logout'
                          ? Colors.white
                          : Colors.black,
                      alignSelf: 'flex-start',
                    },
                  ]}>
                  {' '}
                  {logout}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
const style = StyleSheet.create({
  header: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
  },
  headerWrapper: {
    //  padding: 5
  },
  drawerItem: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  drawerIcon: {
    fontSize: 18,
    marginRight: 20,
    color: '#D70F64',
  },
  drawersection: {
    backgroundColor: Colors.white,
    flexDirection: 'column',
    flex: 3,
  },
  draweritem: {
    padding: 12,
    flexDirection: 'row',
  },
  item: {
    padding: 10,
    fontSize: 12,
  },
  itemtext: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  itemname: {
    fontSize: 14,
    fontFamily: constants.PoppinsMedium,
    backgroundColor: 'transparent',
    marginLeft: 20,
  },
});
