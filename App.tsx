import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import React from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

export default function App() {
  const isLoadingComplete = useCachedResources();
  // const functions = getFunctions();

  // React.useEffect(() => {
  //   const test = async () => {
  //     const addMessage = await httpsCallable(functions, "sayHello");
  //     console.log(addMessage());
  //   };
  //   test();
  // }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
