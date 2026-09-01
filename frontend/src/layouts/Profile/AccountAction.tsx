

import { useState } from "react";
import { useAuth } from "../../utilities/AuthProvider";

import { LogInWindow } from "./AcountAction/LoginWindow";
import { LogoutWindow } from "./AcountAction/LogoutWindow";
import { RegisterWindow } from "./AcountAction/RegisterWindow";
import { ChangePassword } from "./AcountAction/ChangePassWindow";


export interface WindowProps{
    onClose: () => void;
}




export function AccountAction() {
    const { user } = useAuth();
    const [activeWindow, setActiveWindow] = useState<"login" | "logout" | "register" | "changePassword" | null>(null);

    function onCloseHandle() {
        setActiveWindow(null);
    }

    function setWindow(window: string) {
        if (window === "login") {
            setActiveWindow("login");
            return;
        }
    }

    return (
        <>
            <div className="account-actions">
                
                {user? (
                    <>
                        <button
                        onClick={() => setActiveWindow("changePassword")}
                        className="px-3 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            Change Password.
                        </button>
                        <button
                            onClick={() => setActiveWindow("logout")}
                            className="px-3 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
                        >
                            Log Out.
                        </button>
                    </>
                    ) : (
                    <>
                        <button
                            onClick={() => setActiveWindow("login")}
                            className="px-3 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            Log In.
                        </button>
                        <button
                            onClick={() => setActiveWindow("register")}
                            className="px-3 py-2 text-sm font-medium text-white bg-black border border-black rounded-lg hover:bg-gray-800 transition"
                        >
                            Register.
                        </button>
                </>
                )}
            </div>

            {activeWindow === "login" && (
                <LogInWindow onClose={onCloseHandle}/>
            )}

            {activeWindow === "register" && (
                <RegisterWindow onClose={onCloseHandle}/>
            )}

            {activeWindow === "logout" && (
                <LogoutWindow onClose={onCloseHandle}/>
            )}

            {activeWindow === "changePassword" && (
                <ChangePassword onClose={onCloseHandle} setWindow={setWindow} />
            )}

        </>
    )

}


