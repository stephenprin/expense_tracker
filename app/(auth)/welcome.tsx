import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { verticalScale } from "@/utils/styling";
import { colors, spacingX, spacingY } from "@/constants/theme";
import Button from "@/components/Button";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/(auth)/login")}
          >
            <Typo size={18} fontWeight={"600"}>
              Sign in
            </Typo>
          </TouchableOpacity>

          <Animated.Image
            entering={FadeIn.duration(1000)}
            style={styles.welcomeImage}
            source={require("../../assets/images/welcome.png")}
          />
        </View>

        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(3000).springify().damping(12)}
            style={{ alignItems: "center" }}
          >
            <Typo size={28} fontWeight={"800"}>
              {" "}
              Always take control
            </Typo>
            <Typo size={28} fontWeight={"800"}>
              {" "}
              of your finance
            </Typo>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(3000)
              .delay(400)
              .springify()
              .damping(12)}
            style={{ alignItems: "center" }}
          >
            <Typo size={16} color={colors.textLight}>
              {" "}
              Finances must be arranged to set a better
            </Typo>
            <Typo size={16}>lifestyle in future</Typo>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(3000)
              .delay(200)
              .springify()
              .damping(12)}
            style={styles.buttonContainer}
          >
            <Button onPress={() => router.push("/(auth)/register")}>
              <Typo size={16} color={colors.neutral900} fontWeight={"600"}>
                Get Started
              </Typo>
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacingY._7,
    justifyContent: "space-between",
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
    resizeMode: "contain",
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._25,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(40),
    gap: spacingY._20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: -0 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});

export default Welcome;
