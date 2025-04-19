import { Redirect, Slot } from "expo-router";
import { AuthModel } from "~/lib/models/auth";

export default function ProtectedLayout() {
  const localUser = AuthModel.getLocalUser();
  const isValid = AuthModel.isValid();
  if (!localUser || !isValid) {
    return <Redirect href={"/(auth)/login/login"} />;
  }

  return <Slot />;
}
