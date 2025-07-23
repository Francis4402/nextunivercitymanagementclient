"use client"

import { getCurrentUser } from "@/services/AuthServices";
import { IUser } from "@/types/user";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"


interface IUserProvderValues {
    user: IUser | null;
    isLoading: boolean;
    setUser: (user: IUser | null) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<IUserProvderValues | undefined>(undefined);

const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleUser = async () => {
        const user = await getCurrentUser();
        setUser(user);
        setIsLoading(false);
    };

    const refreshUser = async () => {
        setIsLoading(true);
        await handleUser();
    };

    useEffect(() => {
        handleUser();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, isLoading, setIsLoading, refreshUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);

    if (context == undefined) {
        throw new Error("useUser must be used within the UserProvider context");
    }

    return context;
};

export default UserProvider;