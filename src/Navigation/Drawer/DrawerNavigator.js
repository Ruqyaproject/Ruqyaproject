import React, { useContext, useState, useEffect, } from 'react';
import { Dimensions, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawerContent from './CustomDrawerContent';
import Dashboard from '../../Screens/DrawerScreens/Dashboard/Dashboard';
import Colors from '../../Colors/Colors';
import constants from '../../Constants/constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext } from "../../ContextProvider/ContextProvider";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DashboardScreenStack = ({ navigation }) => {

    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={({ route }) => ({
                    headerStyle: {
                        backgroundColor: Colors.offWhite,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: '600',
                    },
                    headerShown: false,
                })}
            />
        </Stack.Navigator>
    );
};


const DrawerNavigator = () => {
    const { translateString } = useContext(DataContext);
    const [dashboard, setdashboard] = useState("")

    useEffect(() => {
        AsyncStorage.getItem("languageCode").then((valuelanguageCode) => {
            if (valuelanguageCode == null || valuelanguageCode == "") {
                translateString('en', ["Dashboard"], (convertedText) => {
                    setdashboard(convertedText[0])


                });
            } else if (valuelanguageCode != null) {
                translateString(JSON.parse(valuelanguageCode), ["Dashboard"], (convertedText) => {
                    setdashboard(convertedText[0])
                });
            }
        })
    }, []);

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            initialRouteName="DashboardScreenStack"

            screenOptions={{
                drawerActiveTintColor: Colors.primaryColor,
                drawerItemStyle: { marginVertical: 5 },
                headerTitleAlign: 'center',
                drawerPosition: "left",
                drawerStyle: {
                    // width: 200,
                    width: Dimensions.get('window').width,
                    marginTop: 50
                },
                // headerStyle:{backgroundColor:Colors.offWhite}
                // headerShown: true,
            }}>

            <Drawer.Screen
                name="DashboardScreenStack"
                options={{
                    title: <Text>{dashboard}</Text>, headerTintColor: Colors.primaryColor, headerTitleStyle: {
                        marginTop: 8, fontFamily: constants.PoppinsMedium,
                        color: Colors.gray
                    }, headerStyle: {
                        backgroundColor: Colors.lightGray
                    }
                }}
                component={DashboardScreenStack}
            />

        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
