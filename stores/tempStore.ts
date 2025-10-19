import { AppointmentData, CompletionData, SignupData, TempStore } from "@/types/models";
import * as Crypto from "expo-crypto";
import { create } from "zustand";

const initialSignupState: SignupData = {
    DOB: null,
    sex: "",
    language: "",
};

const initialAppointmentState: AppointmentData = {
    appointmentType: "",
    address: "",
    provider: "",
    appointmentDate: null,
    notified: "",
    mainConcern: "",
    concernStart: "",
    concernSeverity: "",
    remedies: "",
    visitGoal: "",
    specificWorries: "",
    miscDiscussion: "",
};

const initialCompletionState: CompletionData = {
    personalized_questions: [],
    what_to_expect: {
        brief: "",
        steps: [],
    },
    what_to_bring: [],
    summary_for_provider: "",
};

const initialIdState: string = ""

export const useTempStore = create<TempStore>(
    (set) => ({
        // Initial states
        id: initialIdState,
        signup: initialSignupState,
        appointment: initialAppointmentState,
        tempCompletion: initialCompletionState,

        // Signup Actions
        updateSignup: (data: Partial<SignupData>) =>
            set((state) => ({
                signup: { ...state.signup, ...data },
            })),

        // Appointment Actions
        updateAppointment: (data: Partial<AppointmentData>) =>
            set((state) => ({
                appointment: { ...state.appointment, ...data },
            })),

        // Completion Actions
        setCompletion: (value: CompletionData) =>
            set((state) => ({
                tempCompletion: { ...state.tempCompletion, ...value },
            })),

        // Utility Actions
        assignNewId: () => {
            const newId = Crypto.randomUUID();
            set({ id: newId });
        },
        resetTempContext: () =>
            set({
                id: initialIdState,
                signup: initialSignupState,
                appointment: initialAppointmentState,
                tempCompletion: initialCompletionState,
            }),
    })
);
