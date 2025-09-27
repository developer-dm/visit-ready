
// Onboarding Data
export type SignupData = {
    firstName: string;
    lastName: string;
    DOB: Date | null;
    sex: string;
    language: string;
    acceptedTerms: boolean;
};

// Appointment Preparation Data
export type AppointmentData = {
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
    questions: string;
};

// Temporary Form Data
export type TempStore = {
    signup: SignupData;
    appointment: AppointmentData;

    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
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
    setQuestions: (value: string) => void;

    clearUserContext: () => void;
    generateNewId: () => void;
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
    signup: SignupData | null;
    appointments: AppointmentData[];

    _hasHydrated: boolean;
    _dataHasHydrated: boolean;

    addSignupData: (data: SignupData) => void;
    resetSignup: () => void;
    addAppointment: (appointment: AppointmentData) => void;
    resetAppointments: () => void;
    setDataHasHydrated: (value: boolean) => void;
};
