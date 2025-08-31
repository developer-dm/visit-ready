import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorder?: string;
  darkBorder?: string;
  type?: "default";
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  lightBorder = "#d1d1d1ff",
  darkBorder = "#393939ff",
  type = "default",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "card");
  const borderColor = useThemeColor({ light: lightBorder, dark: darkBorder }, "icon");

  return (
    <View
      style={[
        { backgroundColor, borderColor },
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({

});