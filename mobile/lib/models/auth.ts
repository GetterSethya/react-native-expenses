import { router } from "expo-router";
import { pb } from "../pocketbase";
import { LoginValidator } from "../validators/auth-validator";
import { CreateArgs } from "./base";
import { UserEntity } from "./user";

export interface AuthEntity extends UserEntity {}

export type CreateAuthArgs = CreateArgs<
  Omit<UserEntity, "emailVisibility" | "verified" | "avatar">
>;

export class AuthModel {
  static async create(args: CreateAuthArgs) {
    const user = await pb
      .collection<UserEntity>("users")
      .create({ ...args.item, emailVisibility: true });

    return user;
  }

  static async login(args: LoginValidator) {
    return await pb
      .collection<UserEntity>("users")
      .authWithPassword(args.email, args.password);
  }

  static getLocalUser() {
    return pb.authStore.record as UserEntity;
  }

  static isValid() {
    return pb.authStore.isValid;
  }

  static async logout() {
    router.replace("/(auth)/login/login");
    return pb.authStore.clear();
  }
}
