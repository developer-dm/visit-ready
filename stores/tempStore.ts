import { AppointmentData, SignupData, TempStore } from "@/types/models";
import * as Crypto from "expo-crypto";
import { create } from "zustand";

const initialSignupState: SignupData = {
    firstName: "",
    lastName: "",
    DOB: null,
    sex: "",
    language: "",
    acceptedTerms: false,
};

const initialPrepState: AppointmentData = {
    id: Crypto.randomUUID(),
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
    questions: "",
};

export const useTempStore = create<TempStore>((set) => ({
    // Initial state
    signup: initialSignupState,
    appointment: initialPrepState,

    // Signup actions
    setFirstName: (value: string) =>
        set((state) => ({
            signup: { ...state.signup, firstName: value },
        })),

    setLastName: (value: string) =>
        set((state) => ({
            signup: { ...state.signup, lastName: value },
        })),

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

    setQuestions: (value: string) =>
        set((state) => ({
            appointment: { ...state.appointment, questions: value },
        })),

    // Utility actions
    clearUserContext: () =>
        set(() => ({
            signup: initialSignupState,
            appointment: { ...initialPrepState, id: Crypto.randomUUID() },
        })),

    generateNewId: () =>
        set((state) => ({
            appointment: { ...state.appointment, id: Crypto.randomUUID() },
        })),
}));
