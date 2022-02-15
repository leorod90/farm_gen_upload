import { onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import { StyleSheet, Animated, View, Button } from "react-native";
import { farmsRef } from "../../firebase/utils";
import MainCard from "./MainCard";

const CARD_WIDTH = 400;
const RIGHT_MARGIN = 20;
const CONTAINER_WIDTH = CARD_WIDTH + RIGHT_MARGIN;

export default function HorizontalFlat() {
  const [data, setData] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const ref = React.useRef<any>();

  React.useEffect(() => {
    const realTimeGetFarm = async () => {
      const q = query(farmsRef, orderBy("createdAt", "asc"));

      onSnapshot(q, (snapshot) => {
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
    <View style={styles.container}>
      {/* <Button
        disabled={index === data.length - 1}
        title="next"
        onPress={() => {
          ref?.current?.scrollToOffset({
            offset: (index + 1) * CONTAINER_WIDTH,
            animated: true,
          });
        }}
      /> */}
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={(item, index) => "key" + index}
        bounces={false}
        pagingEnabled={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }]
          // { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(ev) => {
          setIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / CONTAINER_WIDTH)
          );
        }}
        // style={styles.container}
        contentContainerStyle={styles.contentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }: any) => {
          const inputRange = [
            (index - 1) * CONTAINER_WIDTH,
            index * CONTAINER_WIDTH,
            (index + 1) * CONTAINER_WIDTH,
          ];

          return <MainCard item={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    margin: 5,
    flexGrow: 1,
  },
});
