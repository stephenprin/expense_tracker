import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ImageUploadProps } from "@/type";
import * as Icons from "phosphor-react-native";
import { colors, radius } from "@/constants/theme";
import Typo from "./Typo";
import { verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import { getFilePath } from "@/services/imageServices";
import * as ImagePicker from "expo-image-picker";

const ImageUpload = ({
  file,
  onSelect,
  onClear,
  containerStyle,
  imageStyle,
  placeholder = "",
}: ImageUploadProps) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onSelect(result.assets[0]);
    }
  };
  return (
    <View>
      {!file && (
        <TouchableOpacity
          onPress={pickImage}
          style={[styles.inputContainer, containerStyle && containerStyle]}
        >
          <Icons.UploadSimple color={colors.neutral200} />
          {placeholder && <Typo size={15}>{placeholder}</Typo>}
        </TouchableOpacity>
      )}

      {file && (
        <View style={[styles.image, imageStyle && imageStyle]}>
          <Image
            source={getFilePath(file)}
            style={{
              flex: 1,
            }}
            contentFit="cover"
            transition={100}
          />
          <TouchableOpacity style={styles.deleteBtn} onPress={onClear}>
            <Icons.XCircle
              size={verticalScale(24)}
              weight="fill"
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  inputContainer: {
    height: verticalScale(54),
    backgroundColor: colors.neutral700,
    borderRadius: radius._15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.neutral500,
    borderStyle: "dashed",
  },
  image: {
    height: verticalScale(200),
    width: verticalScale(200),
    borderRadius: radius._15,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  deleteBtn: {
    position: "absolute",
    top: verticalScale(6),
    right: verticalScale(6),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});
