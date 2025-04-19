import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button, ButtonProps } from "./button";
import { PlusIcon } from "~/lib/icons/Plus";
import { ICON_SIZE } from "~/lib/constants";
import { WalletIcon } from "~/lib/icons/Wallet";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { cn } from "~/lib/utils";
import React from "react";
import { SlottableTextProps, TextRef } from "@rn-primitives/types";
import { BottomSheet } from "./bottom-sheet";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useForm } from "react-hook-form";
import { WalletValidator } from "~/lib/validators/wallet-validator";
import { walletFormOpts } from "~/lib/forms/wallet-form";
import { useMutation } from "@tanstack/react-query";
import * as Form from "~/components/ui/form";
import { Input } from "./input";

export function Card() {
  const sheetRef = React.useRef<BottomSheetModal>(null);

  const handleWalletPress = React.useCallback(() => {
    sheetRef.current?.present();
  }, []);

  return (
    <Root>
      <Header>
        <Title>My Wallet</Title>
        <AddWallet onPress={handleWalletPress} />
      </Header>
      <Body>
        <Deposit>Rp.120.000.000</Deposit>
      </Body>
      <BottomSheet ref={sheetRef}>
        <BottomSheetView className="flex-1 p-5 pb-10">
          <WalletForm />
        </BottomSheetView>
      </BottomSheet>
    </Root>
  );
}

function WalletForm() {
  const form = useForm<WalletValidator>({ ...walletFormOpts });

  // const createWalletMutation = useMutation({
  //   ...loginMutationOpts,
  //   onSuccess: () => {
  //     toast.success("Login success");
  //     router.replace("/(protected)/(tabs)");
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     let message = "Something went wrong";
  //     if (error instanceof ClientResponseError) {
  //       message = error.response.message;
  //     }
  //     toast.error(message);
  //   },
  // });

  return (
    <View className="gap-2.5">
      <Form.Field
        name="name"
        className="gap-1"
        control={form.control}
        render={(field, fieldState) => (
          <>
            <Form.FormLabel fieldState={fieldState}>Name</Form.FormLabel>
            <Input
              value={field.value as string}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="Enter wallet name"
              {...fieldState}
            />
            <Form.Error fieldState={fieldState} />
          </>
        )}
      />

      <Button
      // onPress={form.handleSubmit((data) => createWalletMutation.mutate(data))}
      // disabled={createWalletMutation.isPending}
      >
        <Text>Confirm</Text>
      </Button>
    </View>
  );
}

export type RootProps = ViewProps;
export const Root = React.forwardRef<View, RootProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <View ref={ref} className={cn("gap-2.5 mt-10", className)} {...rest}>
        {children}
      </View>
    );
  },
);

export type TitleProps = SlottableTextProps;
export const Title = React.forwardRef<TextRef, TitleProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <Text
        className={cn("text-lg font-medium", className)}
        {...rest}
        ref={ref}
      >
        {children}
      </Text>
    );
  },
);

export type DepositProps = SlottableTextProps;
export const Deposit = React.forwardRef<TextRef, TitleProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <Text className="text-lg" {...rest} ref={ref}>
        {children}
      </Text>
    );
  },
);

export type HeaderProps = ViewProps;
export const Header = React.forwardRef<View, RootProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <View
        className={cn("flex-row justify-between items-center", className)}
        {...rest}
        ref={ref}
      >
        {children}
      </View>
    );
  },
);

export type AddWalletProps = Omit<ButtonProps, "variant" | "children">;
export const AddWallet = React.forwardRef<View, AddWalletProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Button variant={"ghost"} ref={ref} {...rest}>
        <PlusIcon size={ICON_SIZE} className="text-foreground" />
      </Button>
    );
  },
);

export type BodyProps = ViewProps & { showIcon?: boolean };
export const Body = React.forwardRef<View, BodyProps>(
  ({ className, children, showIcon = true, ...rest }, ref) => {
    return (
      <View
        className={cn(
          "bg-card p-5 rounded-lg flex-row justify-between border border-border",
          className,
        )}
        {...rest}
        ref={ref}
      >
        {showIcon && (
          <WalletIcon size={ICON_SIZE} className="text-foreground" />
        )}
        {children}
      </View>
    );
  },
);
