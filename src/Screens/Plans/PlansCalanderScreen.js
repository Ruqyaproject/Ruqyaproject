import { View, Text, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { DataContext } from '../../ContextProvider/ContextProvider';
import JsonServer from '../../Constants/JsonServer';
import { Calendar, CalendarList } from 'react-native-calendars';
import moment from 'moment';
import Colors from '../../Colors/Colors';
import AnimatedLoader from "react-native-animated-loader";
import DropdownAlert from "react-native-dropdownalert";


const PlansCalanderScreen = ({ route, navigation }) => {
  const RANGE = 2;

  const { getAPICall } = useContext(DataContext)
  const [selectedMarked, setSelectedMarked] = useState(null);
  const [dateIndex, setDateIndex] = useState(0);
  const [dateRange, setDateRange] = useState([]);
  const [planData, setPlanData] = useState([])
  const [loading, setLoading] = useState(false);
  const [planDays, setPlanDays] = useState([])
  let dropDownAlertRef = useRef(null);
  useEffect(() => {

    setLoading(true);
    var url =
      JsonServer.baseURL +
      "services/app/QuestionnairesAyatPlanAllocation/GetAllAyatPlanAllocationByPlanId?planId=" + route.params.planData.planId;

    getAPICall(url, (success, result, error) => {
      if (success == true) {
        setLoading(false);
        setPlanData(result.items);
        var planDataTemp = result.items;
        var end_date = moment(result.items[result.items.length - 1].planDate);
        var dateRange = [];
        var dateRangeTemp = getDates(
          result.items[0].planDate,
          end_date
        );
        var seltedDateAttributes = {
          selected: true,
          color: "green",
          textColor: "white",

        };
        var seltedDateAttributesFilled = {
          selected: true,
          color: Colors.primaryColor,
          textColor: "white",
        };
        let mark = {};
        dateRange.forEach((day) => {
          mark[day] = planDataTemp.find(x => moment(x.planDate).format("YYYY-MM-DD") == day).isCompleted == true ? seltedDateAttributesFilled : seltedDateAttributes;
        });
        dateRangeTemp.forEach((element, index) => {
          dateRange.push({ day: index + 1, expectedDate: element, status: planDataTemp.find(x => moment(x.planDate).format("YYYY-MM-DD") == element).isCompleted == true ? "Completed" : "InProgress" });
        });
        setDateRange(dateRange);
        setSelectedMarked(mark);
      } else {
        setLoading(false);
        dropDownAlertRef.alertWithType("error", "Alert", error);
      }
    });
  }, [])
  
  const handleOnPressDate = (day) => {
    var planDatatemp = planData.find(x => moment(x.planDate).format("DD-MM-YYYYY") == moment(day).format("DD-MM-YYYYY"));
    navigation.navigate("PrescriptionScreen", { planData: planDatatemp, allocatedAyats: route.params.allocatedAyats });
  }
  const getDates = (startDate, endDate) => {
    var dates = [];
    var currDate = moment(startDate).startOf("day");
    var lastDate = moment(endDate).startOf("day");
    dates.push(moment(startDate).format("YYYY-MM-DD"));
    while (currDate.add(1, "days").diff(lastDate) < 0) {
      console.log(currDate.toDate());
      dates.push(moment(currDate.clone().toDate()).format("YYYY-MM-DD"));
    }
    dates.push(moment(endDate).format("YYYY-MM-DD"));
    return dates;
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleOnPressDate(item.expectedDate)} style={{ backgroundColor: 'white', margin: 10, height: 50, borderRadius: 10, justifyContent: 'center', padding: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}>
          Day : {item.day}
        </Text>
        <Text style={{ flex: 2 }}>
          {item.expectedDate}
        </Text>
        <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold', color: item.status == "Completed" ? 'green' : Colors.primaryColor }}>
          {item.status}
        </Text>
      </TouchableOpacity>
    )
  }
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../Assets/timerBack.png")}
    >
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../Assets/Lottie/loader.json")}
        animationStyle={{
          width: 100,
          height: 100
        }}
        speed={1}
      >
      </AnimatedLoader>
      <FlatList
        data={dateRange}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* <CalendarList
        pastScrollRange={RANGE}
        futureScrollRange={RANGE}
        onDayPress={(day) => {
          handleOnPressDate(day)
        }}
        markingType={"period"}
        markedDates={selectedMarked}
        calendarStyle={{ marginHorizontal: 10 }}
      /> */}
    </ImageBackground>
  )
}

export default PlansCalanderScreen

