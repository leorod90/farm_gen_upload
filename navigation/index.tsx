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
import EditScreen from "../screens/EditScreen/EditScreen";
import Bubble from "../components/Bubble";
import { View } from "react-native";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function Navigation() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalAnim, setModalAnim] = React.useState(false);
  const [bubbleShow, setBubbleShow] = React.useState(false);
  const [bubbleAnim, setBubbleAnim] = React.useState(false);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      fallback={<CustomText>Loading...</CustomText>}
      theme={MyTheme}
    >
      <View style={{ flex: 1, overflow: modalShow ? "hidden" : "scroll" }}>
        <CustomHeader
          bubbleShow={bubbleShow}
          bubbleAnim={bubbleAnim}
          setBubbleShow={setBubbleShow}
          setBubbleAnim={setBubbleAnim}
        />
        <RootNavigator />
        {bubbleShow && (
          <Bubble
            setModalShow={setModalShow}
            setModalAnim={setModalAnim}
            setBubbleShow={setBubbleShow}
            setBubbleAnim={setBubbleAnim}
            bubbleAnim={bubbleAnim}
          />
        )}
        {modalShow && (
          <AnimatedModal
            setModalShow={setModalShow}
            modalAnim={modalAnim}
            setModalAnim={setModalAnim}
          />
        )}
      </View>
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  Main: undefined;
  Edit: undefined;
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
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
}
