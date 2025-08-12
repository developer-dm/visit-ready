import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from "react-native";

export type ButtonProps = TouchableOpacityProps & {
  type?: "dark" | "light" | "selection" | "return";
};

export function Button({
  style,
  children,
  type,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        type === "dark" ? styles.dark : undefined,
        type === "light" ? styles.light : undefined,
        type === "selection" ? styles.selection : undefined,
        type === "return" ? styles.return : undefined,
        style,
      ]}
      {...rest}
    >
      {type === "return" ? <MaterialIcons name="arrow-back-ios" size={30} color={useThemeColor({}, "icon")} /> : children}
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
    borderRadius: 15,
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
    borderRadius: 15,
  },
  selection: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000ff",
    borderRadius: 15,
  },
  return: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
});
