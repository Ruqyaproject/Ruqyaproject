import React, { useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions
} from 'react-native';

const Dev_Height = Dimensions.get("window").height
const Dev_Width = Dimensions.get("window").width

import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress, usePlaybackState, State } from 'react-native-track-player';

const PlayAudio = () => {
    const progress = useProgress();
    const state = usePlaybackState();
    const isPlaying = state === State.Playing;

    useEffect(() => {
        // start();

    }, [])
    const start = async () => {
        // Set up the player
        await TrackPlayer.setupPlayer();
git
        // Add a track to the queue
        await TrackPlayer.add({
            id: 'trackId',
            url: require('../../Assets/ruqya.mp3'),
            title: 'Track Title',
            artist: 'Track Artist',
            // artwork: require('track.png')
        });

        // Start playing it
    };
    return (
        <SafeAreaView style={styles.container}>


            <View style={styles.name_of_song_View} >
                <Text style={styles.name_of_song_Text1}>Listen Carefully This Ruqya</Text>
                <Text style={styles.name_of_song_Text2}>May ALLAH SWT help you in your efforts</Text>
            </View>

            <View style={styles.slider_view}>
                <Slider
                    style={styles.container}
                    value={progress.position}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    thumbTintColor="#FFD479"
                    minimumTrackTintColor="#FFD479"
                    maximumTrackTintColor="#FFFFFF"
                    onSlidingComplete={value => {
                        TrackPlayer.seekTo(value);
                    }}
                />
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>
                        {new Date(progress.position * 1000).toISOString().slice(14, 19)}
                    </Text>
                    <Text style={styles.labelText}>
                        {new Date((progress.duration - progress.position) * 1000)
                            .toISOString()
                            .slice(14, 19)}
                    </Text>
                </View>
            </View>

            <AntDesign onPress={() => {
                if (isPlaying) {
                    TrackPlayer.pause();
                } else {
                    TrackPlayer.play();
                }
            }} name={isPlaying ? "pausecircle" : "caretright"} size={50} color="#e75480" style={{}} />


        </SafeAreaView>
    )
}
export default PlayAudio

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelContainer: {
        width: 370,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labelText: {
        color: 'white',
        fontVariant: ['tabular-nums'],
    },

    mainbar: {
        height: "10%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    now_playing_text: {
        fontSize: 19,
        marginLeft: "24%"
    },
    music_logo_view: {
        height: "30%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    image_view: {
        height: "100%",
        width: "50%",
        borderRadius: 10
    },
    name_of_song_View: {
        height: "15%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    name_of_song_Text1: {
        fontSize: 19,
        fontWeight: "500"
    },
    name_of_song_Text2: {
        color: "#808080",
        marginTop: "4%"
    },
    slider_view: {
        height: "10%",
        width: "100%",
        alignItems: "center",
        flexDirection: "row"
    },
    slider_style: {
        height: "70%",
        width: "60%"
    },
    slider_time: {
        fontSize: 15,
        marginLeft: "6%",
        color: "#808080"
    },
    functions_view: {
        height: "10%",
    },
    recently_played_view: {
        height: "25%",
        width: "100%",
    },
    recently_played_text: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#808080",
        marginLeft: "5%",
        marginTop: "6%"
    },
    recently_played_list: {
        backgroundColor: "#FFE3E3",
        height: "50%",
        width: "90%",
        borderRadius: 10,
        marginLeft: "5%",
        marginTop: "5%",
        alignItems: "center",
        flexDirection: "row"
    },
    recently_played_image: {
        height: "80%",
        width: "20%",
        borderRadius: 10
    },
    recently_played_list_text: {
        height: "100%",
        width: "60%",
        justifyContent: "center"
    },
    recently_played_list_text1: {
        fontSize: 15,
        marginLeft: "8%"
    },
    recently_played_list_text2: {
        fontSize: 16,
        color: "#808080",
        marginLeft: "8%"
    }
})