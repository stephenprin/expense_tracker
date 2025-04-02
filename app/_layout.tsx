import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { colors } from "@/constants/theme";
import { AuthProvider } from "@/context/authContext";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(modals)/profileModal"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
