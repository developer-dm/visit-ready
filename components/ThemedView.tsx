import { StyleSheet, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "container" | "card";
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  type = "card",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "card");

  return (
    <View
      style={[
        { backgroundColor },
        type === "card" ? styles.card : undefined,
        type === "container" ? styles.container : undefined,
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 30,
  },
  card: {
    width: "100%",
    height: "auto",
    borderRadius: 15,
    boxShadow: "0px 0px 10px #0000005c",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});