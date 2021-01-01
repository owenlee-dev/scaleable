import React, { useEffect, useContext } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppContext } from "../AppContext";
import {
  accentColor,
  headerFont,
  primaryColor,
  secondaryColor,
  mainBorderRadius,
  textColor,
} from "../assets/Styles";

const Header = ({ history }) => {
  const { chosen, setChosen, tab } = useContext(AppContext);

  const slideValue = new Animated.Value(0);
  const slideUp = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -500],
  });

  const handleSearch = () => {
    Animated.timing(slideValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // To make use of native driver for performance
    }).start();
    setTimeout(() => history.push("/search"), 100);
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideUp }],
        },
      ]}
    >
      <View style={styles.title}></View>
      <Text style={styles.titleText}>
        Scale<Text style={{ color: textColor }}>Able</Text>
      </Text>

      <Icon
        color={textColor}
        name="ios-search"
        style={styles.searchIcon}
        onPress={handleSearch}
      />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: primaryColor,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: accentColor,
    justifyContent: "space-between",
    width: "100%",
    height: "10%",
    padding: 10,
    alignItems: "center",
  },
  titleText: {
    fontFamily: headerFont,
    fontSize: 30,
    paddingLeft: 5,
    fontWeight: "400",
    letterSpacing: 1,
    color: accentColor,
  },
  searchBar: {
    fontSize: 20,
    maxWidth: "70%",
    backgroundColor: "transparent",
  },
  searchIcon: {
    fontSize: 28,
    paddingRight: 5,
  },
});

export default Header;
