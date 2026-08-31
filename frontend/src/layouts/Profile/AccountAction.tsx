

import { act, useState, type FormEvent } from "react"
import { useAuth } from "../../utilities/AuthProvider";
import { ApiError } from "../../services/client";
import { register } from "../../services/auth";



interface WindowProps{
    onClose: () => void;
}




export function AccountAction() {
    const { user, login } = useAuth();
    const [activeWindow, setActiveWindow] = useState<"login" | "logout" | "register" | "changePassword" | null>(null);

    function onCloseHandle() {
        setActiveWindow(null);
    }

    return (
        <>
            <div className="account-actions">
                
                {user? (
                    <>
                        <button
                        onClick={() => setActiveWindow("logout")}
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

        </>
    )

}



function LogInWindow({ onClose }: WindowProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await login({ email, password });
            onClose();
        } catch (err) {
            if (err instanceof ApiError)
                setError(err.message);
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
    const { login } = useAuth();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);

        if (password.length < 8) {
            setError("Password must at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError('Password do not match');
            return;
        }

        setIsSubmitting(true);
        try {
            await register({ email, fullName: fullName || undefined, password });
            await login({ email, password });
        } catch (err) {
            if (err instanceof ApiError)
                setError(err.message);
            else
                setError('Something went wrong. Please try again.');
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
                        aria-label="Close register window"
                    >
                        ×
                    </button>

                    <h1 className="mb-4 text-xl font-semibold text-gray-900">
                        Create your account.
                    </h1>

                    <label className="text-sm font-medium text-gray-700">
                        Full Name <span className="font-normal text-gray-400">(Optional)</span>
                    </label>

                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
                    />

                    <label className="mt-1 text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
                    />

                    <label className="mt-1 text-sm font-medium text-gray-700">
                        Password
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
                    />

                    <label className="mt-1 text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        {isSubmitting ? "Creating account..." : "Sign up"}
                    </button>
                </form>
            </div>
)
}


function LogoutWindow({ onClose }: WindowProps) {
    const { logout } = useAuth();

    function clickHandle(accept: boolean) {

        if (accept) {
            logout();
            onClose();
        } else {
            onClose();
        }

    }

    return (
            <div className="fixed inset-0 z-10000 flex h-screen w-screen items-center justify-center bg-black/30">
                <div className="relative w-[calc(100%-32px)] max-w-sm rounded-xl border border-gray-200 bg-white p-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-xl text-gray-500 transition hover:bg-gray-100 hover:text-black"
                        aria-label="Close logout window"
                    >
                        ×
                    </button>

                    <h1 className="pr-8 text-lg font-semibold text-gray-900">
                        Are you sure you want to Log out?
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        You will need to sign in again to access your account.
                    </p>

                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => clickHandle(true)}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            No
                        </button>

                        <button
                            type="button"
                            onClick={() => clickHandle(true)}
                            className="rounded-lg border border-red-200 bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                            Yes, Log Out
                        </button>
                    </div>
                </div>
            </div>
)

}


