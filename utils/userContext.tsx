import * as Crypto from "expo-crypto";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

//-------------------- TYPES --------------------
type SignupContextType = {
    firstName: string;
    setFirstName: (name: string) => void;
    lastName: string;
    setLastName: (name: string) => void;
    DOB: Date | null;
    setDOB: (date: Date) => void;
    sex: string | null;
    setSex: Dispatch<SetStateAction<string | null>>;
    motivation: string | null;
    setMotivation: Dispatch<SetStateAction<string | null>>;
    confidence: string | null;
    setConfidence: Dispatch<SetStateAction<string | null>>;
    anxiety: string | null;
    setAnxienty: Dispatch<SetStateAction<string | null>>;
    acceptedTerms: boolean;
    setAcceptedTerms: (accepted: boolean) => void;
};

type PrepContextType = {
    id: string;
    setId: (id: string) => void;
    appointmentType: string | null;
    setAppointmentType: Dispatch<SetStateAction<string | null>>;
    appointmentDate: Date | null;
    setAppointmentDate: (date: Date) => void;
    provider: string;
    setProvider: (name: string) => void;
    mainConcern: string;
    setMainConcern: (concern: string) => void;
    concernStart: string | null;
    setConcernStart: Dispatch<SetStateAction<string | null>>;
    concernSeverity: string | null;
    setConcernSeverity: Dispatch<SetStateAction<string | null>>;
    visitGoal: string;
    setVisitGoal: (goal: string) => void;
    specificWorries: string;
    setSpecificWorries: (worries: string) => void;
    miscDiscussion: string;
    setMiscDiscussion: (misc: string) => void;
};

type UserContextType = {
    signup: SignupContextType;
    prep: PrepContextType;
    clearUserContext: () => void;
};

//-------------------- CONTEXT --------------------
const UserContext = createContext<UserContextType | undefined>(undefined);

//-------------------- PROVIDER --------------------
export const UserProvider = ({ children }: { children: ReactNode }) => {
    //signup state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [DOB, setDOB] = useState<Date | null>(null);
    const [sex, setSex] = useState<string | null>(null);
    const [motivation, setMotivation] = useState<string | null>(null);
    const [confidence, setConfidence] = useState<string | null>(null);
    const [anxiety, setAnxienty] = useState<string | null>(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    //prep state
    const [id, setId] = useState(Crypto.randomUUID());
    const [appointmentType, setAppointmentType] = useState<string | null>(null);
    const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
    const [provider, setProvider] = useState("");
    const [mainConcern, setMainConcern] = useState("");
    const [concernStart, setConcernStart] = useState<string | null>(null);
    const [concernSeverity, setConcernSeverity] = useState<string | null>(null);
    const [visitGoal, setVisitGoal] = useState("");
    const [specificWorries, setSpecificWorries] = useState("");
    const [miscDiscussion, setMiscDiscussion] = useState("");

    const clearUserContext = () => {
        //signup reset
        setFirstName("");
        setLastName("");
        setDOB(null);
        setSex(null);
        setMotivation(null);
        setConfidence(null);
        setAnxienty(null);
        setAcceptedTerms(false);

        //prep reset
        setId("");
        setAppointmentType(null);
        setAppointmentDate(null);
        setProvider("");
        setMainConcern("");
        setConcernStart(null);
        setConcernSeverity(null);
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
                    motivation,
                    setMotivation,
                    confidence,
                    setConfidence,
                    anxiety,
                    setAnxienty,
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

//-------------------- HOOK --------------------
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
