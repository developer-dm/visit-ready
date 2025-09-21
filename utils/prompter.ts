import DataFormatterService from "./dataFormatterService";
import { useDataStore } from "./dataStore";

export type Appointment = {
    id: string;
    appointmentType: string;
    appointmentDate: Date | null;
    provider: string;
    mainConcern: string;
    concernStart: string;
    concernSeverity: string;
    remedies: string;
    visitGoal: string;
    specificWorries: string;
    miscDiscussion: string;
};

export const generateMedicalQuestionsPrompt = (appointment: Appointment): string => {
    const { signup } = useDataStore.getState();

    const basePrompt = `
Generate 5 patient questions for medical provider based on:
- Language: ${DataFormatterService.toReadableString(signup?.language)}
- Main concern: ${DataFormatterService.toReadableString(appointment.mainConcern)}
- Specific worry: ${DataFormatterService.toReadableString(appointment.specificWorries)}
- Visit goal: ${DataFormatterService.toReadableString(appointment.visitGoal)}
- Type: ${DataFormatterService.toReadableString(appointment.appointmentType)}
- Started: ${DataFormatterService.toReadableString(appointment.concernStart)}
- Severity: ${DataFormatterService.toReadableString(appointment.concernSeverity)}
- Tried: ${DataFormatterService.toReadableString(appointment.remedies)}
- Other: ${DataFormatterService.toReadableString(appointment.miscDiscussion)}
Please ensure that the questions are relevant to the specified topics and cover a range of concerns, including but not limited to symptoms, treatment options, and preventive care.
Ensure that the questions encourage dialogue and further discussion between the patient and their provider.
`;

    return basePrompt;
};
