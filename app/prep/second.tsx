import { Dropdown } from "@/components/Dropdown";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTempStore } from "@/stores/tempStore";
import { DropdownValues } from "@/types/dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PrepSecondScreen() {
    const { appointment, setMainConcern, setConcernStart, setConcernSeverity, setRemedies } = useTempStore();

    return (
        <ThemedView type="container" style={styles.container}>
            <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="never"
                showsVerticalScrollIndicator={false}
                enableResetScrollToCoords={false}
                extraScrollHeight={10}
            >
                <View style={styles.cardContent}>
                    <View style={styles.welcomeSection}>
                        <ThemedView style={styles.welcomeIconContainer} type="dusked">
                            <MaterialIcons name="checklist" size={32} color="#3b82f6" />
                        </ThemedView>
                        <ThemedText style={styles.welcomeTitle} type="whitened">Appointment Focus</ThemedText>
                        <ThemedText style={styles.welcomeSubtitle} type="greyed">Tell us about your main health concern</ThemedText>
                    </View>

                    <View style={styles.formFields}>
                        <View style={styles.fieldGroup}>
                            <ThemedText type="overheader">What are the main health concerns of your appointment?</ThemedText>
                            <Textbox
                                placeholder="Required"
                                onChangeText={setMainConcern}
                                value={appointment.mainConcern}
                            />
                        </View>

                        <View style={styles.fieldGroup}>
                            <ThemedText type="overheader">When did your concerns begin?</ThemedText>
                            <Dropdown
                                items={DropdownValues.concernStart}
                                value={appointment.concernStart}
                                setValue={setConcernStart}
                            />
                        </View>

                        <View style={styles.fieldGroup}>
                            <ThemedText type="overheader">How would you rate the severity of your concerns 1-10?</ThemedText>
                            <Dropdown
                                items={DropdownValues.concernSeverity}
                                value={appointment.concernSeverity}
                                setValue={setConcernSeverity}
                            />
                        </View>

                        <View style={styles.fieldGroup}>
                            <ThemedText type="overheader">Have you tried any treatments or remedies?</ThemedText>
                            <Textbox
                                onChangeText={setRemedies}
                                value={appointment.remedies}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 150,
    },
    cardContent: {
        padding: 24,
        marginVertical: 24,
    },
    welcomeSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    welcomeIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom: 16,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 280,
    },
    formFields: {
        gap: 24,
    },
    fieldGroup: {
        width: '100%',
    },
});
