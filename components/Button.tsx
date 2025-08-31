import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from "react-native";

export type ButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorder?: string;
  darkBorder?: string;
  type?: "custom" | "dark" | "light" | "selection" | "return" | "close" | "refresh";
};

export function Button({
  style,
  lightColor,
  darkColor,
  lightBorder,
  darkBorder,
  children,
  type = "custom",
  ...rest
}: ButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "card");
  const borderColor = useThemeColor({ light: lightBorder, dark: darkBorder }, "icon");

  return (
    <TouchableOpacity
      style={[
        type === "custom" ? { backgroundColor, borderWidth: 1, borderColor } : undefined,
        type === "dark" ? styles.dark : undefined,
        type === "light" ? styles.light : undefined,
        type === "selection" ? styles.selection : undefined,
        type === "return" ? styles.return : undefined,
        type === "close" ? styles.close : undefined,
        style,
      ]}
      {...rest}
    >
      {type === "return" ? <MaterialIcons name="arrow-back-ios" size={30} color={useThemeColor({}, "icon")} /> : undefined}
      {type === "close" ? <MaterialIcons name="close" size={30} color={useThemeColor({}, "icon")} /> : undefined}
      {type === "refresh" ? <MaterialIcons name="refresh" size={25} color={useThemeColor({}, "icon")} /> : undefined}
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dark: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004678",
    borderRadius: 6,
  },
  light: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
  },
  selection: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000ff",
    borderRadius: 6,
  },
  return: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  close: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
