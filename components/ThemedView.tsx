import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "card" | "appointmentCard";
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
        type === "appointmentCard" ? styles.appointmentCard : undefined,
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "auto",
    borderRadius: 6,
    boxShadow: "0px 0px 10px #0000005c",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  appointmentCard: {
    width: "100%",
    height: "auto",
    borderRadius: 6,
    boxShadow: "0px 0px 10px #0000005c",
    borderWidth: 1,
    borderColor: "#9b9b9bff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});