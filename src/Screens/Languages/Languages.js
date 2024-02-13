import { View, Text, StyleSheet, TouchableOpacity, FlatList, Switch, I18nManager } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from "../../ContextProvider/ContextProvider";
import constants from "../../Constants/constants";
import Colors from "../../Colors/Colors";
import ToggleSwitch from 'toggle-switch-react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import i18next from 'i18next';
import i18n from './i18n';
import RNRestart from 'react-native-restart'


const Languages = () => {
    const [isSwitchOn, setisSwitchOn] = useState("")
    const { getLanguagesName, Languagename, saveToAsyncStorageCredentials } = useContext(DataContext)
    const [filterData, setfilterData] = useState("")
    // const toggleSwitch = () => setisSwitchOn(isSwitchOn => !isSwitchOn);


    const toggleSwitch = (item) => {
        saveToAsyncStorageCredentials("languageCode", item.item.languageCode);
        i18next
            .changeLanguage(i18n.language = item.item.languageCode)
            .then(() => {
                I18nManager.forceRTL(i18n.language === 'ur' || i18n.language === 'ar' || i18n.language === 'fa');
                RNRestart.Restart();
            });
        // setLanguage(!Languages)
        // setIsSwitchOn(!isSwitchOn)
        if ((!Languages) == "ur" || (!Languages) == "ar") {
            setIsRTLOn(true);
            I18nManager.forceRTL(true);
        }
    }
    useEffect(() => {
        getLanguagesName()

    }, [])




    const renderItem = (item) => {
        return (
            <TouchableOpacity onPress={() => toggleSwitch(item)} style={{ padding: 10, flexDirection: "row", justifyContent: 'space-around', margin: 10, borderWidth: 1, borderColor: Colors.primaryColor, borderRadius: 10 }} >
                <Text style={{ color: "black", fontSize: 15 }}>{item.item.languageCode}</Text>
                <Text style={{ color: "black", fontSize: 15 }}>{item.item.name}</Text>
            </TouchableOpacity>
        )
    }



    return (
        <View style={style.SafeAreaView}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }} >
                {/* <Text style={{ color: "black", fontSize: 20 }}>Language Code</Text> */}
            </View>

            <FlatList
                data={Languagename}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

        </View>

    )
}

export default Languages;


const style = StyleSheet.create(
    {
        SafeAreaView:
        {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20
        },
        btnstyle: {
            backgroundColor: '#417DB4',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            marginLeft: 15,
            padding: 2,
        },
        languageViewRow:
        {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 4

        }

    }
)