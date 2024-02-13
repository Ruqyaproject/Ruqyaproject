import { View, useWindowDimensions, Image } from 'react-native';
import React from 'react'
import { TabView, SceneMap } from 'react-native-tab-view';
import PlayAudio from './PlayAudio';

const ListenToRoqya = () => {
    const FirstRoute = () => (
        <PlayAudio/>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: "http://66.70.142.76:85/AyatImages/manzil.jpeg" }} style={{ width: 300, height: 300 }}
            />
        </View>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Listen' },
        { key: 'second', title: 'Read' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}

export default ListenToRoqya