import React from "react";
import { View } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import * as Form from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { registerFormOpts } from "~/lib/forms/auth-form";
import { Button } from "~/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";
import { Link, router } from "expo-router";
import { ClientResponseError } from "pocketbase";
import { registerMutationOpts } from "~/lib/mutations/auth-mutation";
import { RegisterValidator } from "~/lib/validators/auth-validator";

export default function RegisterPage() {
  return (
    <View className="flex-1 p-5">
      <Card className="w-full my-auto">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <View className="flex-row gap-1">
            <Text>Already have an account?</Text>
            <Link href={"/login/login"}>
              <Text>Login</Text>
            </Link>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}

function RegisterForm() {
  const form = useForm<RegisterValidator>({ ...registerFormOpts });

  const registerMutation = useMutation({
    ...registerMutationOpts,
    onSuccess: () => {
      toast.success("Register success");
      router.replace("/(auth)/login/login");
    },
    onError: (error) => {
      console.error(error);
      let message = "Something went wrong";
      if (error instanceof ClientResponseError) {
        if (error.status === 400) {
          message = "Email is already used";
        } else {
          message = error.response.message;
        }
      }
      toast.error(message);
    },
  });

  return (
    <View className="gap-2.5">
      <Form.Field
        name="email"
        className="gap-1"
        control={form.control}
        render={(field, fieldState) => (
          <>
            <Form.FormLabel fieldState={fieldState}>Email</Form.FormLabel>
            <Input
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="Enter your email"
              {...fieldState}
            />
            <Form.Error fieldState={fieldState} />
          </>
        )}
      />

      <Form.Field
        name="name"
        className="gap-1"
        control={form.control}
        render={(field, fieldState) => (
          <>
            <Form.FormLabel fieldState={fieldState}>Name</Form.FormLabel>
            <Input
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="Enter your name"
              {...fieldState}
            />
            <Form.Error fieldState={fieldState} />
          </>
        )}
      />

      <Form.Field
        name="password"
        className="gap-1"
        control={form.control}
        render={(field, fieldState) => (
          <>
            <Form.FormLabel fieldState={fieldState}>Password</Form.FormLabel>
            <Input
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="Enter your password"
              secureTextEntry
              {...fieldState}
            />
            <Form.Error fieldState={fieldState} />
          </>
        )}
      />

      <Form.Field
        name="passwordConfirm"
        className="gap-1"
        control={form.control}
        render={(field, fieldState) => (
          <>
            <Form.FormLabel fieldState={fieldState}>
              Password Confirm
            </Form.FormLabel>
            <Input
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="Confirm your password"
              secureTextEntry
              {...fieldState}
            />
            <Form.Error fieldState={fieldState} />
          </>
        )}
      />
      <Button
        onPress={form.handleSubmit((data) => registerMutation.mutate(data))}
        disabled={registerMutation.isPending}
      >
        <Text>Register</Text>
      </Button>
    </View>
  );
}
