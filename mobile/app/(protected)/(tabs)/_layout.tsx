import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { router, Tabs } from "expo-router";
import { Button } from "~/components/ui/button";
import { ICON_SIZE } from "~/lib/constants";
import { HomeIcon } from "~/lib/icons/Home";
import { PlusIcon } from "~/lib/icons/Plus";
import { UserIcon } from "~/lib/icons/User";

export default function TabLayout() {
  function handleAddTransaction() {
    router.push("/(protected)/(tabs)/add-transaction");
  }
  return (
    <BottomSheetModalProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color }) => (
              <HomeIcon size={ICON_SIZE} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="add-transaction"
          options={{
            tabBarButton: () => (
              <Button
                className="mx-auto rounded-full h-14 w-14"
                size={"icon"}
                onPress={handleAddTransaction}
              >
                <PlusIcon
                  size={ICON_SIZE}
                  className="text-primary-foreground"
                />
              </Button>
            ),
            headerShown: false,
            title: "Add Fund",
            tabBarIcon: ({ color }) => (
              <UserIcon size={ICON_SIZE} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="account"
          options={{
            headerShown: false,
            title: "Account",
            tabBarIcon: ({ color }) => (
              <UserIcon size={ICON_SIZE} color={color} />
            ),
          }}
        />
      </Tabs>
    </BottomSheetModalProvider>
  );
}
