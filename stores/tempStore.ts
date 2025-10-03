import { AppointmentData, CompletionData, SignupData, TempStore } from "@/types/models";
import * as Crypto from "expo-crypto";
import { create } from "zustand";

const initialSignupState: SignupData = {
    DOB: null,
    sex: "",
    language: "",
    acceptedTerms: false,
};

const initialAppointmentState: AppointmentData = {
    id: "",
    appointmentType: "",
    appointmentDate: null,
    provider: "",
    mainConcern: "",
    concernStart: "",
    concernSeverity: "",
    remedies: "",
    visitGoal: "",
    specificWorries: "",
    miscDiscussion: "",
};

const initialCompletionState: CompletionData = {
    id: "",
    personalized_questions: [],
    what_to_expect: {
        brief: "",
        steps: [],
    },
    what_to_bring: [],
    summary_for_provider: "",
};

export const useTempStore = create<TempStore>((set) => ({
    // Initial state
    signup: initialSignupState,
    appointment: initialAppointmentState,
    tempCompletion: initialCompletionState,

    // Signup actions
    setDOB: (value: Date) =>
        set((state) => ({
            signup: { ...state.signup, DOB: value },
        })),

    setSex: (value: string) =>
        set((state) => ({
            signup: { ...state.signup, sex: value },
        })),

    setLanguage: (value: string) =>
        set((state) => ({
            signup: { ...state.signup, language: value },
        })),

    setAcceptedTerms: (value: boolean) =>
        set((state) => ({
            signup: { ...state.signup, acceptedTerms: value },
        })),

    // Appointment actions
    setId: (id: string) =>
        set((state) => ({
            appointment: { ...state.appointment, id },
        })),

    setAppointmentType: (value: string) =>
        set((state) => ({
            appointment: { ...state.appointment, appointmentType: value },
        })),

    setAppointmentDate: (value: Date) =>
        set((state) => ({
            appointment: { ...state.appointment, appointmentDate: value },
        })),

    setProvider: (value: string) =>
        set((state) => ({
            appointment: { ...state.appointment, provider: value },
        })),

    setMainConcern: (value: string) =>
        set((state) => ({
            appointment: { ...state.appointment, mainConcern: value },
        })),

    setConcernStart: (value: string) =>
        set((state) => ({
            appointment: { ...state.appointment, concernStart: value },
        })),

    setConcernSeverity: (value: string) =>
        set((state) => ({
            appointment: { ...state.appointment, concernSeverity: value },
        })),

    setRemedies: (value: string) =>
        set((state) => ({
            appointment: { ...state.appointment, remedies: value },
        })),

    setVisitGoal: (value: string) =>
        set((state) => ({
            appointment: { ...state.appointment, visitGoal: value },
        })),

    setSpecificWorries: (value: string) =>
        set((state) => ({
            appointment: { ...state.appointment, specificWorries: value },
        })),

    setMiscDiscussion: (value: string) =>
        set((state) => ({
            appointment: { ...state.appointment, miscDiscussion: value },
        })),

    // Completion Actions
    setCompletion: (value: CompletionData) =>
        set((state) => ({
            tempCompletion: { ...state.tempCompletion, ...value },
        })),

    // Utility actions
    clearUserContext: () =>
        set(() => ({
            signup: initialSignupState,
            appointment: initialAppointmentState,
            tempCompletion: initialCompletionState,
        })),

    generateNewId: () => {
        const newID = Crypto.randomUUID()

        set((state) => ({
            appointment: { ...state.appointment, id: newID },
            tempCompletion: { ...state.tempCompletion, id: newID },
        }))
    },
}));
