import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export type ButtonProps = TouchableOpacityProps & {
  type?: "dark" | "light" | "return";
};

export function Button({
  style,
  children,
  type = "dark",
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        type === "dark" ? styles.dark : undefined,
        type === "light" ? styles.light : undefined,
        type === "return" ? styles.return : undefined,
        style,
      ]}
      {...rest}
    >
      {type === "return" ? <MaterialIcons size={50} name="navigate-before" color={useThemeColor({}, "icon")} /> : undefined}
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
    borderRadius: 3,
    margin: 10,
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
    borderRadius: 3,
    margin: 10,
  },
  return: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
});