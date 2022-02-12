import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../components/CustomText";
import Styles from "../../constants/Styles";
import { auth } from "../../firebase/utils";
import AddForm from "./AddForm";
import VerticalList from "./VerticalList";

export default function ListScreen() {
  const [user, setUser] = React.useState<any>("load");

  React.useEffect(() => {
    const checkUser = async () => {
      await onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    };
    checkUser();
  }, [auth]);

  console.log(user);

  if (user === "load") return <View style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {user?.email ? (
          <>
            <VerticalList />
            <AddForm />
          </>
        ) : (
          <CustomText bold black size={32}>
            Login to see this page
          </CustomText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Styles.container.paddingVertical,
    paddingHorizontal: Styles.container.paddingHorizontal,
  },
  wrapper: {
    height: "100%",
    width: "100%",
    maxWidth: Styles.container.maxWidth,
    flexDirection: "row",
  },
});
