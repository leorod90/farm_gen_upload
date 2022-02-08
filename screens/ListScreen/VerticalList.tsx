import { onSnapshot } from "firebase/firestore";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Styles from "../../constants/Styles";
import { farmsRef } from "../../firebase/utils";
import ListCard from "./ListCard";

export default function FarmList() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const realTimeGetFarm = async () => {
      onSnapshot(farmsRef, (snapshot) => {
        let farms: any = [];
        snapshot.docs.forEach((doc) => {
          farms.push({ id: doc.id, ...doc.data() });
        });
        setData(farms);
      });
    };

    realTimeGetFarm();
  }, []);
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => "key" + index}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }: any) => <ListCard item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Styles.container.paddingVertical / 2,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
