import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import * as Icon from "phosphor-react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (emailRef.current === "" || passwordRef.current === "") {
      Alert.alert("Login", "Please fill in all fields");
    }
    console.log(emailRef.current, passwordRef.current);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -40 : 0}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1, backgroundColor: colors.neutral900 }}
        >
          <ScreenWrapper>
            <View style={styles.container}>
              <BackButton iconSize={36} />
              <View style={{ gap: 5, marginTop: spacingY._20 }}>
                <Typo size={30} fontWeight={"800"}>
                  Hey,{" "}
                </Typo>
                <Typo size={30} color={colors.neutral300} fontWeight={"800"}>
                  Welcome Back{" "}
                </Typo>
              </View>
              <View style={styles.form}>
                <Typo size={16} color={colors.textLighter}>
                  Login now to track all your expenses
                </Typo>
                <Input
                  placeholder="Enter your Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(value) => (emailRef.current = value)}
                  icon={
                    <Icon.Envelope
                      size={20}
                      weight="fill"
                      color={colors.text}
                    />
                  }
                />
                <Input
                  placeholder="Enter your Password"
                  secureTextEntry
                  onChangeText={(value) => (passwordRef.current = value)}
                  icon={
                    <Icon.Lock size={20} weight="fill" color={colors.text} />
                  }
                />
                <Typo
                  size={14}
                  color={colors.text}
                  style={{ alignSelf: "flex-end" }}
                >
                  Forgot Password?
                </Typo>
                <Button onPress={handleSubmit} loading={isLoading}>
                  <Typo size={16} color={colors.black} fontWeight={"600"}>
                    Login
                  </Typo>
                </Button>
              </View>
              <View style={[styles.footer, { marginBottom: 20 }]}>
                <Typo size={14} color={colors.text}>
                  Don't have an account?{" "}
                </Typo>
                <Pressable onPress={() => router.push("/(auth)/register")}>
                  <Typo size={14} color={colors.primary} fontWeight={"600"}>
                    Sign Up
                  </Typo>
                </Pressable>
              </View>
            </View>
          </ScreenWrapper>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingY._20,
  },
  welcomeTitle: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(14),
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(14),
  },
});
