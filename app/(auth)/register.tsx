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
import { useAuth } from "@/context/authContext";

const Register = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    if (
      emailRef.current === "" ||
      passwordRef.current === "" ||
      nameRef.current === ""
    ) {
      Alert.alert("Login", "Please fill in all fields");
    }
    setIsLoading(true);
    const res = await registerUser(
      emailRef.current,
      passwordRef.current,
      nameRef.current
    );
    setIsLoading(false);
    if (!res.success) {
      Alert.alert("Sign Up", res.msg);
    }
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
                  Let's{" "}
                </Typo>
                <Typo size={30} color={colors.neutral300} fontWeight={"800"}>
                  Get Started{" "}
                </Typo>
              </View>
              <View style={styles.form}>
                <Typo size={16} color={colors.textLighter}>
                  Create an account to track all your expenses
                </Typo>
                <Input
                  placeholder="Enter your Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(value) => (nameRef.current = value)}
                  icon={
                    <Icon.User size={20} weight="fill" color={colors.text} />
                  }
                />
                <Input
                  placeholder="Enter your Email"
                  keyboardType="email-address"
                  autoCorrect={true}
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

                <Button onPress={handleSubmit} loading={isLoading}>
                  <Typo size={16} color={colors.black} fontWeight={"600"}>
                    Sign Up
                  </Typo>
                </Button>
              </View>
              <View style={[styles.footer, { marginBottom: 20 }]}>
                <Typo size={14} color={colors.text}>
                  Already have an account?{" "}
                </Typo>
                <Pressable onPress={() => router.push("/(auth)/login")}>
                  <Typo size={14} color={colors.primary} fontWeight={"600"}>
                    Login
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

export default Register;

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
