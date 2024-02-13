import React, { useEffect } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import UserAvatar from "react-native-user-avatar";
import styles from "./style";
import Countries from '../../../Constants/Countries'
const RaqiDetailComponent = ({ openMail, openCall, children }) => {
  useEffect(() => {
    console.log(children);
  }, []);

  return (
    <>
      {
        children.map((children, i) => (

          <View
            key={i}
            style={{
              margin: 10,
              borderRadius: 5,
              borderWidth: 1,
              flexGrow: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
              padding: 10,
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <UserAvatar
                size={70}
                name="RQ"
                src={"https://countryflagsapi.com/png/" + Countries.find(x => x.name == children.countryName).code}
              />
            </View>

            <View style={{ flexDirection: "column", flex: 1, marginLeft: 8 }}>
              <Text style={styles.RaqiDetailsFirstHeadingText}>
                {children.fullName}
              </Text>
              <Text style={styles.RaqiDetailsSecondHeadingText}>
                {children.countryName}
              </Text>
              <TouchableOpacity onPress={() => openCall(children.phone)}>
                <Text
                  style={[
                    styles.RaqiDetailsSecondHeadingText,
                    { textDecorationLine: "underline", fontSize: 14 },
                  ]}
                >
                  {children.mobileNumber}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openMail(children.email)}>
                <Text style={styles.RaqiDetailsEmailText}>{children.email}</Text>
              </TouchableOpacity>

            </View>
          </View>
        ))}
    </>
  );
};

export default RaqiDetailComponent;
