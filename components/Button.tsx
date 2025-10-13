import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

export type ButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorder?: string;
  darkBorder?: string;
  type?: "custom" | "bordered";
};

const typeColors: Record<
  NonNullable<ButtonProps["type"]>,
  { lightBorder?: string; darkBorder?: string } | undefined
> = {
  custom: undefined,
  bordered: { lightBorder: "#d1d1d1ff", darkBorder: "#393939ff" },
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
  const typeColor = typeColors[type];
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "card");
  const borderColor = useThemeColor({ light: lightBorder ?? typeColor?.lightBorder, dark: darkBorder ?? typeColor?.darkBorder }, "border");

  return (
    <TouchableOpacity
      style={[
        type === "custom" ? { backgroundColor, borderColor } : undefined,
        type === "bordered" ? { borderWidth: 1, backgroundColor, borderColor } : undefined,
        style,
      ]}
      {...rest}
      activeOpacity={0.3}
    >
      {children}
    </TouchableOpacity >
  );
}
