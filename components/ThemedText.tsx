import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "custom" | "whitened" | "greyed" | "dusked" | "overhead" | "link" | "error" | "footer";
};

const typeColors: Record<
  NonNullable<ThemedTextProps["type"]>,
  { light: string; dark: string } | undefined
> = {
  custom: undefined,
  whitened: { light: "#212e43ff", dark: "#ffffffff" },
  greyed: { light: "#64748b", dark: "#858585ff" },
  dusked: { light: '#94a3b8', dark: '#56565aff' },
  overhead: undefined,
  link: undefined,
  error: undefined,
  footer: undefined,
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "custom",
  ...rest
}: ThemedTextProps) {
  const typeColor = typeColors[type];
  const color = useThemeColor({ light: lightColor ?? typeColor?.light, dark: darkColor ?? typeColor?.dark }, "text");

  return (
    <Text
      style={[
        { color },
        type === "overhead" ? styles.overhead : undefined,
        type === "link" ? styles.link : undefined,
        type === "footer" ? styles.footer : undefined,
        type === "error" ? styles.error : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  overhead: {

  },
  link: {
    fontSize: 16,
    color: "#0a7ea4",
  },
  error: {
    fontSize: 12,
    color: "#ff0000ff",
  },
  footer: {
    width: "100%",
    fontSize: 5,
    fontFamily: "Sans-serif",
    fontWeight: "medium",
    textAlign: "center",
    position: "absolute",
    bottom: 3,
  },
});
