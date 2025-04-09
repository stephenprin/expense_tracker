import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Typo from "@/components/Typo";
import * as Icons from "phosphor-react-native";
import { useRouter } from "expo-router";
import useFetchData from "@/hooks/useFetchData";
import { WalletType } from "@/type";
import { useAuth } from "@/context/authContext";
import { orderBy, where } from "@firebase/firestore";
import Loading from "@/components/Loading";
import WalletItem from "@/components/WalletItem";

const Wallet = () => {
  const { user } = useAuth();

  const {
    data: wallets,
    loading,
    error,
  } = useFetchData<WalletType>("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  const router = useRouter();
  const getTotalBalance = () => {
    return 0;
  };

  return (
    <ScreenWrapper style={{ backgroundColor: colors.black }}>
      <View style={styles.container}>
        {/* 
        BALANCE */}
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <Typo size={45} fontWeight={"500"}>
              ₦ {getTotalBalance().toFixed(2)}
            </Typo>
            <Typo size={16} color={colors.neutral300}>
              Total Balance
            </Typo>
          </View>
        </View>
        {/* 
        Wallet */}
        <View style={styles.wallets}>
          <View style={styles.flexRow}>
            <Typo size={20} fontWeight={"500"}>
              My Wallets
            </Typo>
            <TouchableOpacity
              onPress={() => router.push("/(modals)/walletModal")}
            >
              <Icons.PlusCircle
                weight="fill"
                size={verticalScale(33)}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          {loading && <Loading />}
          <FlatList
            data={wallets}
            renderItem={({ item, index }) => {
              return <WalletItem item={item} index={index} router={router} />;
            }}
            contentContainerStyle={styles.listStyle}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  wallets: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25,
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
