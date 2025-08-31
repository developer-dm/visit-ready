import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "custom" | "default" | "title" | "subtitle" | "overhead" | "link" | "error" | "footer";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "custom",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
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
  title: {
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: "Sans-serif",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Sans-serif",
    fontWeight: "medium",
  },
  default: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Sans-serif",
    fontWeight: "medium",
  },
  overhead: {
    fontSize: 12,
    textAlign: "left",
    fontFamily: "Sans-serif",
    fontWeight: "bold",
    width: "100%",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  error: {
    fontSize: 12,
    color: "#ff0000ff",
  },
  footer: {
    fontSize: 5,
    textAlign: "center",
    fontFamily: "Sans-serif",
    fontWeight: "medium",
    position: "absolute",
    bottom: 3,
    width: "100%",
  },
});
