

import { useState } from "react"
import { useAuth } from "../../utilities/AuthProvider";


export function AccountAction() {
    const { user, logout } = useAuth();
    const [activeWindow, setActiveWindow] = useState<"login" | "logout" | "register" | "changePassword" | null>(null);

    return (
        <div className="">
            <button
                onClick={() => setActiveWindow("login")}
                className="px-3 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
                Log In.
            </button>
            {user? (
                <>
                    <button
                    onClick={logout}
                    className="px-3 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                        Change Password.
                    </button>
                    <button
                        onClick={() => setActiveWindow("logout")}
                        className=""
                    >
                        Log Out.
                    </button>
                </>
                ) : (
                    <button
                    onClick={() => setActiveWindow("register")}
                    className="px-3 py-2 text-sm font-medium text-white bg-black border border-black rounded-lg hover:bg-gray-800 transition"
                >
                    Register.
                </button>
            )}
        </div>
    )

}



