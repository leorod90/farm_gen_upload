import { LinkingOptions } from "@react-navigation/native";
import { RootStackParamList } from "./index";
import * as Linking from "expo-linking";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Main: {
        path: "/Main",
      },
      List: {
        path: "/List",
      },
    },
  },
};

export default linking;
