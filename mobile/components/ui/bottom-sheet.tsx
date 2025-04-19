import React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import { BottomSheetModal, BottomSheetProps } from "@gorhom/bottom-sheet";
import { NAV_THEME } from "~/lib/constants";
import { View } from "react-native";

export const BottomSheet = React.forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ children, ...rest }, ref) => {
    const { colorScheme } = useColorScheme();
    return (
      <BottomSheetModal
        ref={ref}
        backgroundComponent={(props) => (
          <View className="bg-card border-t border-border" {...props} />
        )}
        // TODO
        // backdropComponent={(props) => {
        // 	const { fadeAnim } = useFadeSlide()
        // 	return <Animated.View style={[props.style, { opacity: fadeAnim }]} className="bg-background/50" />
        // }}
        handleIndicatorStyle={{
          backgroundColor: NAV_THEME[colorScheme].border,
        }}
        {...rest}
      >
        {children}
      </BottomSheetModal>
    );
  },
);
