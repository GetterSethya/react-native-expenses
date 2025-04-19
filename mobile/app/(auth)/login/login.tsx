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
import { LoginValidator } from "~/lib/validators/auth-validator";
import { Input } from "~/components/ui/input";
import { loginFormOpts } from "~/lib/forms/auth-form";
import { Button } from "~/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";
import { Link, router } from "expo-router";
import { ClientResponseError } from "pocketbase";
import { loginMutationOpts } from "~/lib/mutations/auth-mutation";

export default function LoginPage() {
  return (
    <View className="flex-1 p-5">
      <Card className="w-full my-auto">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>We are excited to see you again!</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <View className="flex-row gap-1">
            <Text>Doesnt have an account yet?</Text>
            <Link href={"/register/register"}>
              <Text>Register</Text>
            </Link>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}

function LoginForm() {
  const form = useForm<LoginValidator>({ ...loginFormOpts });

  const loginMutation = useMutation({
    ...loginMutationOpts,
    onSuccess: () => {
      toast.success("Login success");
      router.replace("/(protected)/(tabs)");
    },
    onError: (error) => {
      console.error(error);
      let message = "Something went wrong";
      if (error instanceof ClientResponseError) {
        message = error.response.message;
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
      <Button
        onPress={form.handleSubmit((data) => loginMutation.mutate(data))}
        disabled={loginMutation.isPending}
      >
        <Text>Login</Text>
      </Button>
    </View>
  );
}
