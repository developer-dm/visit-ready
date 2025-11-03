import { AppointmentData, CompletionData, SignupData } from "./Data";

// Temporary signup, appointment, completion storage
type TempStore = {
    id: string;
    signup: SignupData;
    appointment: AppointmentData;
    tempCompletion: CompletionData;

    updateSignup: (data: Partial<SignupData>) => void;
    updateAppointment: (data: Partial<AppointmentData>) => void;
    setCompletion: (value: CompletionData) => void;

    assignNewId: () => void;
    resetTempContext: () => void;
};

// Authentication, settings storage
type AuthStore = {
    isLoggedIn: boolean;
    hasCompletedOnboarding: boolean;
    isVip: boolean;
    _hasHydrated: boolean;

    notifications: boolean;
    calendar: boolean;

    logIn: () => void;
    logOut: () => void;
    completeOnboarding: () => void;
    resetOnboarding: () => void;
    logInAsVip: () => void;
    setHasHydrated: (value: boolean) => void;
    setNotifications: (value: boolean) => void;
    setCalendar: (value: boolean) => void;
};

// Permanent signup, appointment, completion storage
type UserDataStore = {
    signup: SignupData | null;
    appointments: { [id: string]: AppointmentData };
    completions: { [id: string]: CompletionData }

    _hasHydrated: boolean;
    _dataHasHydrated: boolean;

    addSignupData: (data: SignupData) => void;
    resetSignup: () => void;
    addAppointment: (appointment: AppointmentData, id: string) => void;
    resetAppointments: () => void;
    addCompletion: (completion: CompletionData, id: string) => void;
    resetCompletions: () => void;
    resetAll: () => void;
    setDataHasHydrated: (value: boolean) => void;
};

export { AuthStore, TempStore, UserDataStore };

