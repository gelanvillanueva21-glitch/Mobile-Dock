


interface ErrorProps{
    onClose: () => void;
    onTryAgain: () => void;
}


export function ErrorWindow({ onClose, onTryAgain }: ErrorProps) {
    return (
        <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/30">
            <div className="relative w-[calc(100%-32px)] max-w-sm rounded-xl border border-gray-200 bg-white p-6">

                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-xl text-gray-500 transition hover:bg-gray-100 hover:text-black"
                    aria-label="Close error window"
                >
                ×                    </button>

                <h2 className="pr-8 text-lg font-semibold text-gray-900">
                    Something went wrong
                </h2>

                <p className="mt-2 text-sm leading-5 text-gray-500">
                    We couldn't complete your request. Please try again.
                </p>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Close
                    </button>

                    <button
                        type="button"
                        onClick={onTryAgain}
                        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    )
}


