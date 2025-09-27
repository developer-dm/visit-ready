import { AppointmentData } from "@/types/models";
import { useDataStore } from "../stores/dataStore";
import DataFormatterService from "./dataFormatter";

export const generateMedicalQuestionsPrompt = (appointment: AppointmentData): string => {
    const { signup } = useDataStore.getState();

    const basePrompt = `
Generate exactly 5 personalized questions for a patient to ask their healthcare provider during an upcoming appointment. Base these questions on the following information:

Patient Information:
- Language: ${DataFormatterService.toReadableString(signup?.language)}
- Main health concern: ${DataFormatterService.toReadableString(appointment.mainConcern)}
- Specific worries: ${DataFormatterService.toReadableString(appointment.specificWorries)}
- Goal for this visit: ${DataFormatterService.toReadableString(appointment.visitGoal)}
- Appointment type: ${DataFormatterService.toReadableString(appointment.appointmentType)}
- When the concern started: ${DataFormatterService.toReadableString(appointment.concernStart)}
- Severity level: ${DataFormatterService.toReadableString(appointment.concernSeverity)}
- Treatments or remedies already tried: ${DataFormatterService.toReadableString(appointment.remedies)}
- Additional information: ${DataFormatterService.toReadableString(appointment.miscDiscussion)}

Please create questions that:
1. Address the patient's main concerns and specific worries
2. Cover different aspects: understanding the condition, diagnostic approaches, treatment options, and preventive care
3. Help the patient understand their situation better
4. Encourage open communication with their healthcare provider
5. Are appropriate for the appointment type and visit goals

Format your response as a numbered list of exactly 5 questions using simple, clear language that the patient can easily understand and repeat to their provider. Each question must be complete and ready to use without any placeholders or missing information.
`;

    return basePrompt;
};
