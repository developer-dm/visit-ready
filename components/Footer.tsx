import { expo } from "@/app.json";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, TextProps } from "react-native";

export type FooterTextProps = TextProps & {
    text?: string;
    type?: "absolute" | "relative";
    hasSpacer?: boolean;
};

export function Footer({
    text,
    type = "relative",
    hasSpacer = false,
}: FooterTextProps) {
    return (
        <ThemedText
            type="greyed"
            style={[
                type === "absolute" ? styles.absoluteFooterText : undefined,
                type === "relative" ? styles.relativeFooterText : undefined,
                hasSpacer ? styles.bottomSpacer : undefined,
            ]}
        >
            {text ? text : null}
            {text === "slug" ? `${expo.slug} ${expo.version}` : null}
        </ThemedText>
    );
}

const styles = StyleSheet.create({
    absoluteFooterText: {
        fontSize: 6,
        fontWeight: '400',
        textAlign: 'center',
        fontStyle: 'italic',
        width: '100%',
        position: "absolute",
        bottom: 3,
    },
    relativeFooterText: {
        fontSize: 10,
        fontWeight: '400',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    bottomSpacer: {
        marginBottom: 40,
    },
})