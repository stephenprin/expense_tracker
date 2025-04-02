import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { colors } from "@/constants/theme";
import Typo from "@/components/Typo";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuth } from "@/context/authContext";
import ScreenWrapper from "@/components/ScreenWrapper";

const Home = () => {
  const { user } = useAuth();

  // const handleLogout = async () => {
  //   await signOut(auth);
  // };
  return (
    <ScreenWrapper>
      <Text>Home</Text>
      {/* <Button onPress={handleLogout}>
        <Typo color={colors.black}>Logout</Typo>
      </Button> */}
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
