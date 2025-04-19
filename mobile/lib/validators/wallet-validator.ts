import { z } from "zod";

export const walletValidator = z.object({
  deposit: z.number({ message: "Invalid deposit" }),
  is_primary: z.coerce.boolean(),
  name: z.string({ message: "Name cant be blank" }),
});
export type WalletValidator = z.infer<typeof walletValidator>;
