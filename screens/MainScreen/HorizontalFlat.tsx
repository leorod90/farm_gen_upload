import { onSnapshot } from "firebase/firestore";
import React from "react";
import { StyleSheet, FlatList } from "react-native";
import Styles from "../../constants/Styles";
import { farmsRef, realTimeGetFarm } from "../../firebase/utils";
import MainCard from "./MainCard";

export default function HorizontalFlat() {
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
  }, [farmsRef]);
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => "key" + index}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }: any) => <MainCard item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  contentContainer: {
    margin: 5,
    flex: 1,
  },
});
