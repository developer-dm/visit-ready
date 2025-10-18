import { AppointmentData, CompletionData, SignupData, TempStore } from "@/types/models";
import * as Crypto from "expo-crypto";
import { create } from "zustand";

const initialSignupState: SignupData = {
    DOB: null,
    sex: "",
    language: "",
    notifications: false,
    calendar: false,
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

        setNotifications: (value: boolean) =>
            set((state) => ({
                signup: { ...state.signup, notifications: value },
            })),

        setCalendar: (value: boolean) =>
            set((state) => ({
                signup: { ...state.signup, calendar: value },
            })),

        // Appointment Actions
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

        setNotified: (value: string) =>
            set((state) => ({
                appointment: { ...state.appointment, notified: value },
            })),

        setAddress: (value: string) =>
            set((state) => ({
                appointment: { ...state.appointment, address: value },
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
