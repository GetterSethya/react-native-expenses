import * as React from "react";
import { SafeAreaView, View } from "react-native";
import * as Wallet from "~/components/ui/wallet";

export default function HomePage() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 gap-5 p-6 bg-secondary/30">
        <Wallet.Card />
      </View>
    </SafeAreaView>
  );
}
