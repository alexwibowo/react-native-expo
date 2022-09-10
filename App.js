import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "./Home";
import { Platform } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Header from "./Header";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      // this is a hack due to bug in android, which hide custom header behind status bar.
      <NavigationContainer
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        {/* we set headermode to be part of screen, so that we dont need to animate separately  */}
        <Stack.Navigator initialRouteName="Globomantics" headerMode="screen">
          <Stack.Screen
            name="Globomantics"
            component={Homepage}
            options={{
              header: () => <Header headerDisplay="Globomantics" />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
