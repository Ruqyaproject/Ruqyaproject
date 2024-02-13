import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../Colors/Colors'
import styles from './style'

const Calender = ({text,textBackgroundColor,date,monthYear}) => {
    return (
        <View style={styles.container}>

            <View style={[styles.dateContainer,{ backgroundColor: textBackgroundColor}]}>
                <Text style={styles.textStyle}>
                   {text}
                </Text>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.dateStyle}>
                   {date}
                </Text>
                <Text style={styles.monthYearStyle}>
                    {monthYear}
                </Text>

            </View>


        </View>
    )
}

export default Calender