import { expo } from "@/app.json";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, TextProps } from "react-native";

type FooterProps = TextProps & {
    text?: string;
    type?: "absolute" | "relative" | "bottom";
    top?: number;
    bottom?: number;
    hasSpacer?: boolean;
};

const Footer = ({
    text,
    type = "relative",
    top,
    bottom,
    hasSpacer = false,
}: FooterProps) => {
    return (
        <ThemedText
            type="dusked"
            style={[
                type === "absolute" ? styles.absoluteFooterText : undefined,
                type === "relative" ? styles.relativeFooterText : undefined,
                type === "bottom" ? styles.bottomFooterText : undefined,
                hasSpacer ? styles.bottomSpacer : undefined,
                { marginTop: top, marginBottom: bottom }
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
    bottomFooterText: {
        fontSize: 7,
        fontWeight: '400',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    bottomSpacer: {
        marginBottom: 40,
    },
})

export { Footer, FooterProps };

