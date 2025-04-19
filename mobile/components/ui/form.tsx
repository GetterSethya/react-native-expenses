import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  useController,
  useFormState,
  UseFormStateReturn,
} from "react-hook-form";
import { View, ViewProps, Text } from "react-native";
import { cn } from "~/lib/utils";
import { Label } from "./label";
import React from "react";
import { TextProps } from "@rn-primitives/label";

export type FormFieldProps<T extends FieldValues> = Omit<
  ViewProps,
  "children"
> & {
  control: Control<T>;
  render: (
    field: ControllerRenderProps<T>,
    fieldState: ControllerFieldState,
    formState: UseFormStateReturn<T>,
  ) => React.ReactNode;
  name: Path<T>;
};

export function FormField<T extends FieldValues>({
  control,
  name,
  className,
  render,
  ...rest
}: FormFieldProps<T>) {
  const formState = useFormState<T>({ control });
  const { field, fieldState } = useController({ name, control });

  return (
    <View className={cn(["flex flex-col gap-1", className])} {...rest}>
      {render(field, fieldState, formState)}
    </View>
  );
}

export type FormLabelProps = TextProps & {
  fieldState: ControllerFieldState;
};

export const FormLabel = React.forwardRef<Text, FormLabelProps>(
  ({ fieldState, children, className, ...rest }, ref) => {
    return (
      <Label
        className={cn([
          fieldState.error?.message && "text-destructive",
          className,
        ])}
        ref={ref}
        {...rest}
      >
        {children}
      </Label>
    );
  },
);

export type FormErrorProps = TextProps & {
  fieldState: ControllerFieldState;
  children?: React.ReactNode;
};

export const FormError = React.forwardRef<Text, FormErrorProps>(
  ({ fieldState, children, className, ...rest }, ref) => {
    if (!fieldState.error) return null;

    return (
      <Text ref={ref} className={cn(["text-destructive"])} {...rest}>
        {children || fieldState.error.message}
      </Text>
    );
  },
);

export {
  //
  FormField as Field,
  FormLabel as Label,
  FormError as Error,
};
