import { expo } from "@/app.json";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, TextProps } from "react-native";

export type FooterTextProps = TextProps & {
    text?: string;
    type?: "page" | "modal";
};

export function Footer({
    text,
    type = "page",
}: FooterTextProps) {
    return (
        <ThemedText
            type="greyed"
            style={[
                type === "page" ? styles.pageFooterText : undefined,
                type === "modal" ? styles.modalFooterText : undefined,
            ]}
        >
            {text ? text : `${expo.name} | ${expo.version}`}
        </ThemedText>
    );
}

const styles = StyleSheet.create({
    pageFooterText: {
        fontSize: 5,
        fontWeight: '400',
        textAlign: 'center',
        fontStyle: 'italic',
        width: '100%',
        position: "absolute",
        bottom: 3,
    },
    modalFooterText: {
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
        fontStyle: 'italic',
    },
})