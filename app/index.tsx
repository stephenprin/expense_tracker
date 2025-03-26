import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";

const index = () => {
    const router = useRouter()
    
    useEffect(() => { 
        setTimeout(() => {
            router.navigate("/(auth)/welcome")
        }, 2000)
    }, [])
  return (
    <View style={styles.container}>
     <Image style={styles.logo} source={require('../assets/images/splashImage.png')}  resizeMode="contain"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.neutral900,
    },
    logo: {
        height: "20%",
        aspectRatio: 1,
    }
});

export default index;
