import { UseFormProps } from "react-hook-form";
import {
  walletValidator,
  WalletValidator,
} from "../validators/wallet-validator";
import { zodResolver } from "@hookform/resolvers/zod";

export const walletFormOpts: UseFormProps<WalletValidator> = {
  mode: "all",
  reValidateMode: "onChange",
  resolver: zodResolver(walletValidator),
  defaultValues: {
    name: "",
  },
};
