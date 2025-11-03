import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View, type ViewProps } from "react-native";

const typeColors: Record<NonNullable<ThemedViewProps["type"]>, { light: string; dark: string; lightBorder: string; darkBorder: string; } | undefined> = {
  custom: undefined,
  bordered: { light: "", dark: "", lightBorder: "#d1d1d1ff", darkBorder: "#393939ff" },
  dusked: { light: "#f1f5f9", dark: "#242424ff", lightBorder: "", darkBorder: "" },
  container: { light: "#e6e6e6ff", dark: "#101010ff", lightBorder: "", darkBorder: "" },
  list: { light: "", dark: "", lightBorder: "#64748b", darkBorder: "#393939ff" },
};

type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorder?: string;
  darkBorder?: string;
  type?: "custom" | "bordered" | "dusked" | "container" | "list";
};

const ThemedView = ({
  style,
  lightColor,
  darkColor,
  lightBorder,
  darkBorder,
  type = "custom",
  ...otherProps
}: ThemedViewProps) => {
  const typeColor = typeColors[type];
  const backgroundColor = useThemeColor({ light: lightColor ?? typeColor?.light, dark: darkColor ?? typeColor?.dark }, "card");
  const borderColor = useThemeColor({ light: lightBorder ?? typeColor?.lightBorder, dark: darkBorder ?? typeColor?.darkBorder }, "border");

  return (
    <View
      style={[
        type === "custom" ? { backgroundColor, borderColor } : undefined,
        type === "dusked" ? { backgroundColor } : undefined,
        type === "bordered" ? { borderWidth: 1, backgroundColor, borderColor } : undefined,
        type === "container" ? [styles.container, { backgroundColor }] : undefined,
        type === "list" ? { borderColor } : undefined,
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { ThemedView, ThemedViewProps };

