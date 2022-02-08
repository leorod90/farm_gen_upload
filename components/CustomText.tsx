import React from "react";
import { Text } from "react-native";

interface Props {
  bold?: boolean;
  color?: string;
  black?: boolean;
  size?: number;
  fancy?: boolean;
  style?: any;
  numberOfLines?: number;
  children: React.ReactNode;
}

export default function CustomText({
  bold,
  color,
  black,
  size,
  fancy,
  style,
  children,
  numberOfLines,
}: Props) {
  const fancyFont = fancy ? "averia" : "montserrat";
  const defaultColor = black ? "black" : "white";

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: bold ? `${fancyFont}-bold` : fancyFont,
          color: color ? color : defaultColor,
          fontSize: size ? size : 14,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
