import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BackButtonProps } from "@/type";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { CaretCircleLeft } from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import { colors } from "@/constants/theme";

const BackButton = ({ style, iconSize = 26 }: BackButtonProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={[style]}>
      <CaretCircleLeft
        size={verticalScale(iconSize)}
        color={colors.textLight}
        weight="fill"
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
