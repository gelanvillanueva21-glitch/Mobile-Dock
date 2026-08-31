

import { useState, type FormEvent } from "react"
import { useAuth } from "../../utilities/AuthProvider";
import { ApiError } from "../../services/client";


interface WindowProps{
    onClose: () => void;
}


const { login } = useAuth();


export function AccountAction() {
    const { user, logout } = useAuth();
    const [activeWindow, setActiveWindow] = useState<"login" | "logout" | "register" | "changePassword" | null>(null);

    function onCloseHandle() {
        setActiveWindow(null);
    }

    return (
        <>
            <div className="account-actions">
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

            {activeWindow === "login" && (
                <LogInWindow onClose={onCloseHandle}/>
            )}

        </>
    )

}



function LogInWindow({ onClose }: WindowProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await login({ email, password });

        } catch (error) {
            if (error instanceof ApiError)
                setError(error.message);
            else
                setError('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <div className="fixed inset-0 z-10000 flex h-screen w-screen items-center justify-center bg-black/30">
            <form
                onSubmit={handleSubmit}
                className="relative flex w-[calc(100%-32px)] max-w-md flex-col gap-2 rounded-xl border border-gray-200 bg-white p-7"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-xl text-gray-500 transition hover:bg-gray-100 hover:text-black"
                    aria-label="Close login window"
                >
                    ×
                </button>

                <h1 className="mb-4 text-xl font-semibold text-gray-900">
                    Log in to Mobile-Dock
                </h1>

                <label className="text-sm font-medium text-gray-700">
                    Email
                </label>

                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
                />

                <label className="text-sm font-medium text-gray-700">
                    Password
                </label>

                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
                />

                {error && (
                    <p className="mt-1 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <div className="mt-1 flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                        className="h-4 w-4"
                    />

                    <label className="text-sm text-gray-600">
                        {showPassword ? "Hide Password" : "Show Password"}
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-3 w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                    {isSubmitting ? "Logging in..." : "Log in"}
                </button>
            </form>
        </div>
    )
}


function RegisterWindow({ onClose }: WindowProps) {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);

        if (password.length < 8) {
            setError("Password must at least 8 characters");
            return;
        }


    }


    return (
        <div className="">
            <form
                onSubmit={handleSubmit}
                className=""
            >
                <h1>
                    Create your account.
                </h1>

                <label className="">
                    Full name "Optional"
                </label>
                <input 
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className=""
                />

                <label className="">
                    Email.
                </label>
                <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setEmail(e.target.value)}
                    className=""
                />

                <label className="">
                    Password.
                </label>
                <input 
                    type={showPassword? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=""
                />

                <label className="">
                    Confirm Password.
                </label>
                <input 
                    type={showPassword? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className=""
                />

                {error && (
                    <p className="">
                        {error}
                    </p>
                )}

                <div>
                    <input 
                        type="checkbox" 
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                        className=""
                    />
                    <label className="">
                        {showPassword? "Show Password" : "Hide Password" }
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className=""
                >
                    {isSubmitting? 'Creating account...' : 'Sign up'}
                </button>
            </form>
        </div>
    )
}


