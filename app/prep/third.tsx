import { Dropdown } from "@/components/Dropdown";
import { Textbox } from "@/components/Textbox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Dropdowns from "@/constants/Dropdowns";
import useTempStore from "@/stores/tempStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PrepThirdScreen() {
    const { appointment, updateAppointment } = useTempStore();

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
                <View style={styles.welcomeSection}>
                    <ThemedView style={styles.welcomeIconContainer} type="dusked">
                        <MaterialIcons name="timeline" size={32} color="#3b82f6" />
                    </ThemedView>
                    <ThemedText style={styles.welcomeTitle} type="whitened">Your Expectations</ThemedText>
                    <ThemedText style={styles.welcomeSubtitle} type="greyed">What do you hope to achieve from this visit?</ThemedText>
                </View>

                <View style={styles.formFields}>
                    <View>
                        <ThemedText type="overheader">What do you hope to get out of this visit?</ThemedText>
                        <Dropdown
                            placeholder="Required"
                            items={Dropdowns.visitGoal}
                            value={appointment.visitGoal}
                            setValue={(value) => updateAppointment({ visitGoal: value })}
                        />
                    </View>

                    <View>
                        <ThemedText type="overheader">Do you have any specific worries?</ThemedText>
                        <Dropdown
                            items={Dropdowns.specificWorries}
                            value={appointment.specificWorries}
                            setValue={(value) => updateAppointment({ specificWorries: value })}
                        />
                    </View>

                    <View>
                        <ThemedText type="overheader">Any other issues you would like to discuss?</ThemedText>
                        <Textbox
                            onChangeText={(value) => updateAppointment({ miscDiscussion: value })}
                            value={appointment.miscDiscussion}
                        />
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
        paddingBottom: 300,
        paddingTop: 48,
        paddingHorizontal: 24,
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
});
