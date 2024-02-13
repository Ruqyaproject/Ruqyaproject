import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import React, { useState } from 'react';
import ImageView from 'react-native-image-viewing';

const AyahImageScreen = ({ route, navigation }) => {
    console.log("imageURL", route.params.imageURL);
    const [isVisible, setIsVisible] = useState(false);

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <Image source={{ uri: route.params.imageURL }} style={{ width: 400, height: 400 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 14, fontWeight: "bold", textAlign: "center", color: "black" }} > Press on the Image to Zoom</Text>

                <ImageView
                    images={[{ uri: route.params.imageURL }]}
                    imageIndex={0}
                    visible={isVisible}
                    onRequestClose={() => setIsVisible(false)}
                />
            </View>
        </ScrollView>
    );
};

export default AyahImageScreen;
