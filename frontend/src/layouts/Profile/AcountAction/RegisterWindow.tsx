

import { useState, type FormEvent } from "react";
import { ApiError } from "../../../services/client";
import { useAuth } from "../../../utilities/AuthProvider";
import { register } from "../../../services/auth";
import type { WindowProps } from "../AccountAction";


export function RegisterWindow({ onClose }: WindowProps) {
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
                        placeholder="Gelan Villanueva"
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
                    />

                    <label className="mt-1 text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        placeholder="gelanmar123@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
                    />

                    <label className="mt-1 text-sm font-medium text-gray-700">
                        Password
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder="Gelan123mar"
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
                    />

                    <label className="mt-1 text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        placeholder="Gelan123mar"
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


