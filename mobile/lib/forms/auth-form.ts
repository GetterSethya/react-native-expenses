import { UseFormProps } from "react-hook-form";
import {
  loginValidator,
  LoginValidator,
  registerValidator,
  RegisterValidator,
} from "../validators/auth-validator";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginFormOpts: UseFormProps<LoginValidator> = {
  mode: "all",
  reValidateMode: "onChange",
  resolver: zodResolver(loginValidator),
  defaultValues: {
    email: "",
    password: "",
  },
};

export const registerFormOpts: UseFormProps<RegisterValidator> = {
  mode: "all",
  reValidateMode: "onChange",
  resolver: zodResolver(registerValidator),
  defaultValues: {
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
  },
};
