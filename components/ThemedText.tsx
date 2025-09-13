import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "custom" | "whitened" | "greyed" | "dusked" | "overheader" | "subheader" | "link" | "error";
};

const typeColors: Record<
  NonNullable<ThemedTextProps["type"]>,
  { light: string; dark: string } | undefined
> = {
  custom: undefined,
  whitened: { light: "#212e43ff", dark: "#ffffffff" },
  greyed: { light: "#64748b", dark: "#858585ff" },
  dusked: { light: '#94a3b8', dark: '#56565aff' },
  overheader: { light: "#212e43ff", dark: "#ffffffff" },
  subheader: { light: "#64748b", dark: "#858585ff" },
  link: undefined,
  error: undefined,
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
        type === "overheader" ? styles.overheader : undefined,
        type === "subheader" ? styles.subheader : undefined,
        type === "link" ? styles.link : undefined,
        type === "error" ? styles.error : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  overheader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 12,
    lineHeight: 18,
  },
  link: {
    fontSize: 16,
    color: "#0a7ea4",
  },
  error: {
    fontSize: 12,
    color: "#ff0000ff",
  },
});
