import { UseMutationOptions } from "@tanstack/react-query";
import { AuthModel } from "../models/auth";
import { RecordAuthResponse } from "pocketbase";
import { UserEntity } from "../models/user";
import {
  LoginValidator,
  RegisterValidator,
} from "../validators/auth-validator";

export const loginMutationOpts: UseMutationOptions<
  RecordAuthResponse<UserEntity>,
  Error,
  LoginValidator
> = {
  mutationFn: async (data: LoginValidator) => {
    return AuthModel.login(data);
  },
};

export const registerMutationOpts: UseMutationOptions<
  UserEntity,
  Error,
  RegisterValidator
> = {
  mutationFn: async (data: RegisterValidator) => {
    return AuthModel.create({ item: data });
  },
};
