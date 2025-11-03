// Onboarding
type SignupData = {
    DOB: Date | null;
    sex: string;
    language: string;
};

// Completion questions, expectations
type CompletionQuestions = {
    question: string;
    why: string;
    priority: "high" | "medium" | "low";
};
type CompletionExpectations = {
    brief: string;
    steps: string[];
};

// Completion
type CompletionData = {
    personalized_questions: CompletionQuestions[];
    what_to_expect: CompletionExpectations;
    what_to_bring: string[];
    summary_for_provider: string;
};

// Appointment preparation
type AppointmentData = {
    appointmentType: string;
    appointmentDate: Date | null;
    provider: string;
    notified: string;
    address: string;
    mainConcern: string;
    concernStart: string;
    concernSeverity: string;
    remedies: string;
    visitGoal: string;
    specificWorries: string;
    miscDiscussion: string;
};

export { AppointmentData, CompletionData, SignupData };

