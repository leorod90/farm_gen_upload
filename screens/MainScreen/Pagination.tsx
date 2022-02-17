import React from "react";
import { StyleSheet, View, TouchableOpacity, Button } from "react-native";
import CustomText from "../../components/CustomText";
import Colors from "../../constants/Colors";
import Styles from "../../constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";

const arrowSize = 24;
const CARD_WIDTH = 400;
const CARD_MARGIN = 10;
const CONTAINER_WIDTH = CARD_WIDTH + CARD_MARGIN * 2;
interface Props {
  next?: boolean;
  prev?: boolean;
  flatRef: React.MutableRefObject<any>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}
interface BtnProps extends Props {
  direction: string;
  disabled: boolean | undefined;
}

{
  /* <Button
  disabled={index === data.length - 1}
  title="next"
  onPress={() => {
    ref?.current?.scrollToOffset({
      offset: (index + 1) * CONTAINER_WIDTH,
      animated: true,
    });
    setIndex((prev) => prev + 1);
  }}
/>; */
}

const PressBtn = ({
  direction,
  disabled,
  flatRef,
  setIndex,
  index,
}: BtnProps) => {
  const name = "keyboard-arrow-" + direction;

  return (
    <TouchableOpacity
      onPress={() => {
        flatRef?.current?.scrollToOffset({
          offset: (index + 1) * CONTAINER_WIDTH,
          animated: true,
        });
        setIndex((prev) => prev + 1);
      }}
      disabled={disabled}
      style={[
        styles.button,
        {
          opacity: disabled ? 0.2 : 1,
        },
      ]}
    >
      <MaterialIcons name={name} size={arrowSize} color={Colors.gray} />
    </TouchableOpacity>
  );
};

export default function Pagination({
  next,
  prev,
  ref,
  index,
  setIndex,
}: Props) {
  return (
    <View style={styles.paginationContainer}>
      <CustomText fancy bold black size={20}>
        Featured Farms
      </CustomText>
      <Button
        title="next"
        onPress={() => {
          ref?.current?.scrollToOffset({
            offset: (index + 1) * CONTAINER_WIDTH,
            animated: true,
          });
          setIndex((prev) => prev + 1);
        }}
      />
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
        <PressBtn
          direction="left"
          disabled={prev}
          ref={ref}
          index={index}
          setIndex={setIndex}
        />
        <PressBtn
          direction="right"
          disabled={next}
          ref={ref}
          index={index}
          setIndex={setIndex}
        />
      </View>
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
});
