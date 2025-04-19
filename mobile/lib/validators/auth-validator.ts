import { z } from "zod";

export const emailValidator = z
  .string({ message: "Invalid email address" })
  .email({ message: "Invalid email address" });

export const nameValidator = z.string({ message: "Name must be a string" });

export const loginValidator = z.object({
  email: emailValidator,
  password: z
    .string({ message: "Password cant be blank" })
    .min(8, { message: "Password is too short" }),
});

export type LoginValidator = z.infer<typeof loginValidator>;

export const registerValidator = z
  .object({
    email: emailValidator,
    name: nameValidator,
    password: z
      .string({ message: "Password cant be blank" })
      .min(8, { message: "Password is too short" }),
    passwordConfirm: z.string(),
  })
  .refine(
    (ctx) => {
      if (ctx.password !== ctx.passwordConfirm) {
        return false;
      }

      return true;
    },
    { path: ["passwordConfirm"],message:"Confirm password missmatch" },
  );

export type RegisterValidator = z.infer<typeof registerValidator>
