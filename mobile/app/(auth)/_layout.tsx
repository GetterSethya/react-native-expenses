import { Redirect, Slot } from "expo-router";
import { AuthModel } from "~/lib/models/auth";

export default function AuthLayout() {
  const localUser = AuthModel.getLocalUser();
  const isValid = AuthModel.isValid();
  if (localUser && isValid) {
    return <Redirect href={"/"} />;
  }

  return <Slot />;
}
