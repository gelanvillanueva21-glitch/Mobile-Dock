

import type { WindowProps } from "../AccountAction";
import { useAuth } from "../../../utilities/AuthProvider";


export function LogoutWindow({ onClose }: WindowProps) {
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
                            onClick={() => clickHandle(false)}
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


