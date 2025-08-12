import { expo } from "@/app.json";
import { ThemedText } from "@/components/ThemedText";

export function Footer() {
    return (
        <ThemedText type="footer">{expo.name} | {expo.version}</ThemedText>
    );
}
