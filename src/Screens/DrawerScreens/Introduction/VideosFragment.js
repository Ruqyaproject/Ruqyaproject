import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View, FlatList
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import Colors from "../../../Colors/Colors";
import JsonServer from "../../../Constants/JsonServer";
import { DataContext } from "../../../ContextProvider/ContextProvider";



const VideosFragment = () => {

  const [playing, setPlaying] = useState(false);
  const [videosList, setVideosList] = useState([]);
  const { getAPICall } = useContext(DataContext);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  useEffect(() => {
    var urlTerms =
      JsonServer.baseURL +
      "services/app/IntroductionVideo/GetAll";
    getAPICall(urlTerms, (success, result, error) => {
      if (success == true) {
        setVideosList(result.items);
      } else {
        dropDownAlertRef.alertWithType("error", "Alert", error.message);
      }
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <YoutubePlayer
        height={205}
        play={playing}
        videoId={item.youtubeVideoURL}
        onChangeState={onStateChange}
      />
    )
  }


  return (
    <FlatList
      data={videosList}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={{ backgroundColor: Colors.gray }}
    />
  );
};

export default VideosFragment;
