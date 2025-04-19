import { SafeAreaView, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { AuthModel } from "~/lib/models/auth";
import * as Wallet from "~/components/ui/wallet";

export default function AccountPage() {
  function handleLogout() {
    AuthModel.logout();
  }
  return (
    <SafeAreaView className="flex-1 p-6">
      <View className="flex-1">
        <Text>Account Page</Text>
        <Wallet.Root>
          <Wallet.Body className="bg-emerald-500">
            <Wallet.Deposit> Rp.123.456 </Wallet.Deposit>
          </Wallet.Body>
        </Wallet.Root>
        <Button
          className="mt-auto"
          variant={"destructive"}
          onPress={handleLogout}
        >
          <Text>Logout</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
