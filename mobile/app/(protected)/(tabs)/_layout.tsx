import { Tabs } from "expo-router";
import { View } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import { ICON_SIZE } from "~/lib/constants";
import { HomeIcon } from "~/lib/icons/Home";
import { PlusIcon } from "~/lib/icons/Plus";
import { UserIcon } from "~/lib/icons/User";

export default function TabLayout() {
  return (
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
        name="add-fund"
        options={{
          tabBarButton: () => (
            <Button className="mx-auto rounded-full h-14 w-14" size={"icon"}>
              <PlusIcon size={ICON_SIZE} className="text-primary-foreground" />
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
  );
}
