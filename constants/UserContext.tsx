import React, { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = {
    firstName: string;
    setFirstName: (name: string) => void;
    lastName: string;
    setLastName: (name: string) => void;
    DOB: string;
    setDOB: (date: string) => void;
    sex: string;
    setSex: (sex: string) => void;
    authMethod: string;
    setAuthMethod: (method: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [DOB, setDOB] = useState("");
    const [sex, setSex] = useState("");
    const [authMethod, setAuthMethod] = useState("");

    return (
        <UserContext.Provider value={{ firstName, setFirstName, lastName, setLastName, DOB, setDOB, sex, setSex, authMethod, setAuthMethod }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};