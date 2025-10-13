import { Dropdown } from "@/components/Dropdown";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTempStore } from "@/stores/tempStore";
import { DropdownValues } from "@/types/dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PrepThirdScreen() {
    const { appointment, setVisitGoal, setSpecificWorries, setMiscDiscussion } = useTempStore();

    return (
        <ThemedView type="container">
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
                            <MaterialIcons name="timeline" size={32} color="#3b82f6" />
                        </ThemedView>
                        <ThemedText style={styles.welcomeTitle} type="whitened">Your Expectations</ThemedText>
                        <ThemedText style={styles.welcomeSubtitle} type="greyed">What do you hope to achieve from this visit?</ThemedText>
                    </View>

                    <View style={styles.formFields}>
                        <View style={styles.fieldGroup}>
                            <ThemedText type="overheader">What do you hope to get out of this visit?</ThemedText>
                            <Dropdown
                                placeholder="Required"
                                items={DropdownValues.visitGoal}
                                value={appointment.visitGoal}
                                setValue={setVisitGoal}
                            />
                        </View>

                        <View style={styles.fieldGroup}>
                            <ThemedText type="overheader">Do you have any specific worries?</ThemedText>
                            <Dropdown
                                items={DropdownValues.specificWorries}
                                value={appointment.specificWorries}
                                setValue={setSpecificWorries}
                            />
                        </View>

                        <View style={styles.fieldGroup}>
                            <ThemedText type="overheader">Any other issues you would like to discuss?</ThemedText>
                            <Textbox
                                onChangeText={setMiscDiscussion}
                                value={appointment.miscDiscussion}
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
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
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
