


import type { WindowProps } from "../AccountAction";
import { useAuth } from "../../../utilities/AuthProvider";
import { useState, type FormEvent } from "react";
import { changePassword } from "../../../services/auth";
import { ApiError } from "../../../services/client";



interface SetWindowProps{
    setWindow: (window: string) => void;
}


export function ChangePassword({ onClose, setWindow }: WindowProps & SetWindowProps) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const { logout } = useAuth();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null)

        if (newPassword.length < 8) {
            setError("Password must at least 8 characters.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError("Password not the same");
            return;
        }

        setIsSubmitting(true);
        try {
            await changePassword(newPassword);
            logout();
            setWindow("login")
        } catch (err) {
            if (err instanceof ApiError)
                setError(err.message);
            else
                setError("Something went error. Please try again.")
        } finally {
            setIsSubmitting(true);
        }

    }

    return (
        <div className="fixed inset-0 z-10000 flex h-screen w-screen items-center justify-center bg-black/30">
            <div className="relative w-[calc(100%-32px)] max-w-md rounded-xl border border-gray-200 bg-white p-7">

                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-xl text-gray-500 transition hover:bg-gray-100 hover:text-black"
                    aria-label="Close change password window"
                >
                    ×
                </button>

                <div className="mb-5 pr-8">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Change Password
                    </h1>

                    <p className="mt-2 text-sm leading-5 text-gray-500">
                        Your new password must be at least 8 characters and
                        different from your previous password.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2"
                >
                    <label className="text-sm font-medium text-gray-700">
                        New Password
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        placeholder="Gelan123mar"
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
                    />

                    <label className="mt-2 text-sm font-medium text-gray-700">
                        Confirm New Password
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        value={confirmNewPassword}
                        placeholder="Gelan123mar"
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
                    />

                    {error && (
                        <p className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <div className="mt-2 flex items-center gap-2">
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
                        className="mt-4 w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Changing password..." : "Change Password"}
                    </button>
                </form>
            </div>
        </div>
    )
}


