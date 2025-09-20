import * as Crypto from "expo-crypto";
import React, { createContext, ReactNode, useContext, useState } from "react";

//-------------------- TYPES --------------------
type SignupContextType = {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    DOB: Date | null;
    setDOB: (value: Date) => void;
    sex: string;
    setSex: (value: string) => void;
    language: string;
    setLanguage: (value: string) => void;
    notifications: boolean;
    setNotifications: (value: boolean) => void;
    acceptedTerms: boolean;
    setAcceptedTerms: (value: boolean) => void;
};

type PrepContextType = {
    id: string;
    setId: (id: string) => void;
    appointmentType: string;
    setAppointmentType: (value: string) => void;
    appointmentDate: Date | null;
    setAppointmentDate: (value: Date) => void;
    provider: string;
    setProvider: (value: string) => void;
    mainConcern: string;
    setMainConcern: (value: string) => void;
    concernStart: string;
    setConcernStart: (value: string) => void;
    concernSeverity: string;
    setConcernSeverity: (value: string) => void;
    remedies: string;
    setRemedies: (value: string) => void;
    visitGoal: string;
    setVisitGoal: (value: string) => void;
    specificWorries: string;
    setSpecificWorries: (value: string) => void;
    miscDiscussion: string;
    setMiscDiscussion: (value: string) => void;
};

type UserContextType = {
    signup: SignupContextType;
    prep: PrepContextType;
    clearUserContext: () => void;
};

// Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
    //signup state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [DOB, setDOB] = useState<Date | null>(null);
    const [sex, setSex] = useState("");
    const [language, setLanguage] = useState("");
    const [notifications, setNotifications] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    //prep state
    const [id, setId] = useState(Crypto.randomUUID());
    const [appointmentType, setAppointmentType] = useState("");
    const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
    const [provider, setProvider] = useState("");
    const [mainConcern, setMainConcern] = useState("");
    const [concernStart, setConcernStart] = useState("");
    const [concernSeverity, setConcernSeverity] = useState("");
    const [remedies, setRemedies] = useState("");
    const [visitGoal, setVisitGoal] = useState("");
    const [specificWorries, setSpecificWorries] = useState("");
    const [miscDiscussion, setMiscDiscussion] = useState("");

    const clearUserContext = () => {
        //signup reset
        setFirstName("");
        setLastName("");
        setDOB(null);
        setSex("");
        setLanguage("");
        setNotifications(false);
        setAcceptedTerms(false);

        //prep reset
        setId("");
        setAppointmentType("");
        setAppointmentDate(null);
        setProvider("");
        setMainConcern("");
        setConcernStart("");
        setConcernSeverity("");
        setRemedies("")
        setVisitGoal("");
        setSpecificWorries("");
        setMiscDiscussion("");
    };

    return (
        <UserContext.Provider
            value={{
                signup: {
                    firstName,
                    setFirstName,
                    lastName,
                    setLastName,
                    DOB,
                    setDOB,
                    sex,
                    setSex,
                    language,
                    setLanguage,
                    notifications,
                    setNotifications,
                    acceptedTerms,
                    setAcceptedTerms,
                },
                prep: {
                    id,
                    setId,
                    appointmentType,
                    setAppointmentType,
                    appointmentDate,
                    setAppointmentDate,
                    provider,
                    setProvider,
                    mainConcern,
                    setMainConcern,
                    concernStart,
                    setConcernStart,
                    concernSeverity,
                    setConcernSeverity,
                    remedies,
                    setRemedies,
                    visitGoal,
                    setVisitGoal,
                    specificWorries,
                    setSpecificWorries,
                    miscDiscussion,
                    setMiscDiscussion,
                },
                clearUserContext,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Hook
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
