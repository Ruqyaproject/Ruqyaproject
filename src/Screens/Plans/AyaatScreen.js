import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React, { useState, useEffect, useContext } from 'react'
import Colors from '../../Colors/Colors';
import constants from '../../Constants/constants';
import { DataContext } from '../../ContextProvider/ContextProvider';
import JsonServer from '../../Constants/JsonServer';
import DropdownAlert from "react-native-dropdownalert";

const AyaatScreen = ({ route, navigation }) => {
    const { getAPICall } = useContext(DataContext);
    const [plansData, setPlansData] = useState([]);
    const [isSelected, setSelection] = useState(false);
    let dropDownAlertRef = React.useRef(null);
    console.log("allocatedAyats", route.params.allocatedAyats)
    useEffect(() => {

        var allocatedAyats = route.params.allocatedAyats;
        var allocatedAyatsArr = [];
        if (allocatedAyats && allocatedAyats.length > 0) {
            allocatedAyats.forEach(element => {
                allocatedAyatsArr.push({ name: element.name, imageURL: element.imageURL })
            });
            setPlansData(allocatedAyatsArr);
        }
    }, [])


    console.log("plandata", plansData)
    const renderItem = ({ item }) => {
        return (
            <View style={styles.checkboxContainer}>

                <Text style={styles.label}>{item.name}</Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ backgroundColor: Colors.primaryColor, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', padding: 10 }} onPress={() => { navigation.navigate("AyahImageScreen", { imageURL: item.imageURL }) }}>

                        <Text style={{ fontFamily: constants.PoppinsBold, color: Colors.white }}>
                            View Ayaat
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={plansData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>

    )
}

export default AyaatScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: Colors.white,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    checkbox: {
        flex: 1
    },
    label: {
        fontFamily: constants.PoppinsMedium,
        color: Colors.gray
    },
    SubHeading: {
        fontFamily: constants.PoppinsMedium,
        color: 'orange',
        margin: 10
    },
});