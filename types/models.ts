
// Onboarding Data
export type SignupData = {
    DOB: Date;
    sex: string;
    language: string;
    acceptedTerms: boolean;
};

// Completion Data
export type CompletionData = {
    personalized_questions: {
        question: string;
        why: string;
        priority: "high" | "medium" | "low";
    }[];
    what_to_expect: {
        brief: string;
        steps: string[];
    };
    what_to_bring: string[];
    summary_for_provider: string;
}

// Appointment Preparation Data
export type AppointmentData = {
    appointmentType: string;
    appointmentDate: Date;
    provider: string;
    mainConcern: string;
    concernStart: string;
    concernSeverity: string;
    remedies: string;
    visitGoal: string;
    specificWorries: string;
    miscDiscussion: string;
};

// Temporary Form Data
export type TempStore = {
    id: string;
    signup: SignupData;
    appointment: AppointmentData;
    tempCompletion: CompletionData;

    setDOB: (value: Date) => void;
    setSex: (value: string) => void;
    setLanguage: (value: string) => void;
    setAcceptedTerms: (value: boolean) => void;

    setId: (id: string) => void;
    setAppointmentType: (value: string) => void;
    setAppointmentDate: (value: Date) => void;
    setProvider: (value: string) => void;
    setMainConcern: (value: string) => void;
    setConcernStart: (value: string) => void;
    setConcernSeverity: (value: string) => void;
    setRemedies: (value: string) => void;
    setVisitGoal: (value: string) => void;
    setSpecificWorries: (value: string) => void;
    setMiscDiscussion: (value: string) => void;

    setCompletion: (value: CompletionData) => void;

    assignNewId: () => void;
    resetTempContext: () => void;
};

// Logged in State
export type AuthStore = {
    isLoggedIn: boolean;
    hasCompletedOnboarding: boolean;
    isVip: boolean;
    _hasHydrated: boolean;

    logIn: () => void;
    logOut: () => void;
    completeOnboarding: () => void;
    resetOnboarding: () => void;
    logInAsVip: () => void;
    setHasHydrated: (value: boolean) => void;
};

// User Data State
export type UserDataStore = {
    signup: SignupData;
    appointments: { [id: string]: AppointmentData };
    completions: { [id: string]: CompletionData }

    _hasHydrated: boolean;
    _dataHasHydrated: boolean;

    addSignupData: (data: SignupData) => void;
    resetSignup: () => void;
    addAppointment: (appointment: AppointmentData, id: string) => void;
    resetAppointments: () => void;
    addCompletion: (completion: CompletionData, id: string) => void; //COULD BE THE TYPE
    resetCompletions: () => void;
    resetAll: () => void;
    setDataHasHydrated: (value: boolean) => void;
};
