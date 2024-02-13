import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  useWindowDimensions
} from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Colors from "../../../Colors/Colors";
import constants from "../../../Constants/constants";
import { DataContext } from "../../../ContextProvider/ContextProvider";
import introductionFragment from "./introductionFragment";
import VideosFragment from "./VideosFragment";
import AsyncStorage from '@react-native-async-storage/async-storage';



const Introduction = ({ route }) => {
  const { getAPICall, userCredential, translateString } = useContext(DataContext);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [intro, setintro] = useState(route.params.intro)
  const [videos, setvideos] = useState(route.params.videos)

  const [routes] = React.useState([
    { key: 'introduction', title: intro },
    { key: 'videos', title: videos },
  ]);

  const renderScene = SceneMap({
    introduction: introductionFragment,
    videos: VideosFragment,
  });
  const _renderLabel = ({ route }) => (
    <Text style={s.tabBarLabel}>{route.title}</Text>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props =>
        <TabBar
          {...props}
          scrollEnabled={true}
          indicatorStyle={{ backgroundColor: Colors.primaryColor }}
          style={{ backgroundColor: 'white' }}
          renderLabel={route => <Text style={{ fontFamily: constants.PoppinsBold, color: Colors.primaryColor }}>{route.route.title}</Text>}
        />
      }
    />
  );
};

export default Introduction;


