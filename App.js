import "react-native-gesture-handler";
import React, { useState, useMemo } from "react";
import Play from "./screens/Play";
import Search from "./screens/Search";
import Learn from "./screens/Learn";
import { StyleSheet, View } from "react-native";
import { AppContext } from "./AppContext";
import { Icon } from "react-native-elements";
import { NativeRouter, Switch, Route } from "react-router-native";

export default function App() {
  //selected song
  const [chosen, setChosen] = useState(null);
  //list of songs displayed from search
  const [data, setData] = useState("");
  return (
    <NativeRouter>
      <AppContext.Provider value={{ chosen, setChosen, data, setData }}>
        <View style={styles.container}>
          <Switch>
            <Route exact path="/" component={Play} />
            <Route exact path="/learn" component={Learn} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </View>
      </AppContext.Provider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
