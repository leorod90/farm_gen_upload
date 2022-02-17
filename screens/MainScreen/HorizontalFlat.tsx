import { MaterialIcons } from "@expo/vector-icons";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import {
  StyleSheet,
  Animated,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import CustomText from "../../components/CustomText";
import Colors from "../../constants/Colors";
import Styles from "../../constants/Styles";
import { farmsRef, getHorizontalFarm } from "../../firebase/utils";
import MainCard from "./MainCard";

const CARD_WIDTH = 400;
const CARD_MARGIN = 10;
const CONTAINER_WIDTH = CARD_WIDTH + CARD_MARGIN * 2;
const arrowSize = 24;

export default function HorizontalFlat() {
  const [data, setData] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const flatRef = React.useRef<any>();
  const { width } = useWindowDimensions();

  let endAnimationNumber = width < 890 ? 1 : 2;

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

  const renderItem = React.useCallback(
    ({ item }) => (
      <MainCard CARD_WIDTH={CARD_WIDTH} CARD_MARGIN={CARD_MARGIN} item={item} />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.paginationContainer}>
        <CustomText fancy bold black size={20}>
          Featured Farms
        </CustomText>
        <View style={styles.rightSide}>
          <TouchableOpacity>
            <CustomText
              size={20}
              color={Colors.green}
              style={{ fontWeight: "700", marginRight: 10 }}
            >
              See All
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (index > 0) {
                flatRef?.current?.scrollToOffset({
                  offset: (index - 1) * CONTAINER_WIDTH,
                  animated: true,
                });
                setIndex((prev) => prev - 1);
              }
            }}
            disabled={index === 0}
            style={[
              styles.button,
              {
                opacity: index === 0 ? 0.2 : 1,
              },
            ]}
          >
            <MaterialIcons
              name={"keyboard-arrow-left"}
              size={arrowSize}
              color={Colors.gray}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (index < data.length - 1) {
                flatRef?.current?.scrollToOffset({
                  offset: (index + 1) * CONTAINER_WIDTH,
                  animated: true,
                });
                setIndex((prev) => prev + 1);
              }
            }}
            disabled={index === data.length - endAnimationNumber}
            style={[
              styles.button,
              {
                opacity: index === data.length - endAnimationNumber ? 0.2 : 1,
              },
            ]}
          >
            <MaterialIcons
              name={"keyboard-arrow-right"}
              size={arrowSize}
              color={Colors.gray}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <Button
        disabled={index === data.length - 1}
        title="next"
        onPress={() => {
          flatRef?.current?.scrollToOffset({
            offset: (index + 1) * CONTAINER_WIDTH,
            animated: true,
          });
          setIndex((prev) => prev + 1);
        }}
      /> */}
      <Animated.FlatList
        ref={flatRef}
        data={data}
        keyExtractor={(item, index) => "key" + index}
        bounces={false}
        pagingEnabled={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
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
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    // height: 20,
    width: "100%",
    marginVertical: Styles.container.paddingVertical,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 2.5,
    marginLeft: 5,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.babyGray,
  },
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
});
