import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { AuthModel } from "~/lib/models/auth";

export default function AccountPage() {
  function handleLogout() {
    AuthModel.logout();
  }
  return (
    <View className="flex-1">
      <Text>Account Page</Text>
      <Button
        className="mt-auto"
        variant={"destructive"}
        onPress={handleLogout}
      >
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
