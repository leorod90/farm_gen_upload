import {
  DefaultTheme,
  NavigationContainer,
  RouteProp,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import * as React from "react";
import CustomText from "../components/CustomText";
import CustomHeader from "../components/CustomHeader";
import MainScreen from "../screens/MainScreen/MainScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import AnimatedModal from "../screens/AnimatedModal/AnimatedModal";
import ListScreen from "../screens/ListScreen/ListScreen";
import Bubble from "../components/Bubble";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function Navigation() {
  const [modalShow, setModalShow] = React.useState(false);
  const [bubbleShow, setBubbleShow] = React.useState(false);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      fallback={<CustomText>Loading...</CustomText>}
      theme={MyTheme}
    >
      <CustomHeader bubbleShow={bubbleShow} setBubbleShow={setBubbleShow} />
      <RootNavigator />
      {bubbleShow && (
        <Bubble setBubbleShow={setBubbleShow} setModalShow={setModalShow} />
      )}
      {modalShow && <AnimatedModal setModalShow={setModalShow} />}
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  Main: undefined;
  List: undefined;
};

export type RootStackProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackScreenProps<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="List" component={ListScreen} />
    </Stack.Navigator>
  );
}
