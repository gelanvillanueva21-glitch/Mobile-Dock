

import { useEffect, createContext, useContext, useState, type ReactNode } from 'react';
import type { LoginPayload, UserInfo } from '../types/User';
import { getCurrentUser, login as apiLogin, logout as apiLogout, } from '../services/auth';



interface AuthContextValue {
    user: UserInfo | null;
    isLoading: boolean;
    login: (data: LoginPayload) => Promise<void>;
    logout: () => Promise<void>;
}


const AuthContext = createContext<AuthContextValue | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false))
    }, []);

    async function login(data: LoginPayload) {
        await apiLogin(data);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
    }

    async function logout() {
        await apiLogout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}


export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (context === undefined)
        throw new Error('useAuth must be used within an AuthProvide');
    return context;
}


